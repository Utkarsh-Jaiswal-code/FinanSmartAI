import { NextResponse } from "next/server";
import { db } from "../../../../utils/dbConfig";
import { Incomes, Expenses } from "../../../../utils/schema";
import { eq, desc, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    // return incomes along with aggregated expense stats so the client
    // doesn't need to talk to the database directly.
    const result = await db
      .select({
        id: Incomes.id,
        name: Incomes.name,
        amount: Incomes.amount,
        icon: Incomes.icon,
        createdBy: Incomes.createdBy,
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Incomes)
      .leftJoin(Expenses, eq(Incomes.id, Expenses.budgetId))
      .where(eq(Incomes.createdBy, email))
      .groupBy(Incomes.id)
      .orderBy(desc(Incomes.id));

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, amount, icon, email } = await req.json();
    if (!name || !amount || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const result = await db
      .insert(Incomes)
      .values({ name, amount, icon, createdBy: email } as any)
      .returning({ id: Incomes.id });
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const idParam = url.searchParams.get("id");
    const body = await req.json().catch(() => ({}));
    const id = idParam || body.id;
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const result = await db.delete(Incomes).where(eq(Incomes.id, Number(id))).returning();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
