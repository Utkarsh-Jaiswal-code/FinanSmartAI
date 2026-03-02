import { NextResponse } from "next/server";
import { db } from "../../../../utils/dbConfig";
import { Expenses, Budgets } from "../../../../utils/schema";
import { desc, eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("email");
    const budgetId = url.searchParams.get("budgetId");

    let result;
    if (budgetId) {
      result = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, Number(budgetId)))
        .orderBy(desc(Expenses.id));
    } else if (email) {
      result = await db
        .select({
          id: Expenses.id,
          name: Expenses.name,
          amount: Expenses.amount,
          createdAt: Expenses.createdAt,
        })
        .from(Budgets)
        .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, email))
        .orderBy(desc(Expenses.id));
    } else {
      return NextResponse.json({ error: "Missing email or budgetId" }, { status: 400 });
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, amount, budgetId } = await req.json();
    if (!name || !amount || !budgetId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const result = await db
      .insert(Expenses)
      .values({
        name,
        amount,
        budgetId: Number(budgetId),
        createdAt: new Date().toISOString(),
      })
      .returning({ id: Expenses.id });

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, name, amount } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (amount !== undefined) updateData.amount = amount;
    const result = await db
      .update(Expenses)
      .set(updateData)
      .where(eq(Expenses.id, Number(id)))
      .returning();
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
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, Number(id)))
      .returning();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
