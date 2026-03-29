import { NextResponse } from "next/server";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    let email = url.searchParams.get("email");
    if (!email) {
      console.log('[budgets GET] no email query param');
      // fallback to returning all budgets if email not provided
    } else {
      console.log('[budgets GET] email=', email);
    }

    const baseQuery = db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId));

    const filteredQuery = email
      ? baseQuery.where(eq(Budgets.createdBy, email))
      : baseQuery;

    const result = await filteredQuery.groupBy(Budgets.id).orderBy(desc(Budgets.id));

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[budgets POST] body=", body);
    const { name, amount, icon, email } = body;
    if (!name || !amount) {
      console.log("[budgets POST] missing fields", { name, amount, email });
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }
    const createdBy = email || 'unknown';
    const result = await db
      .insert(Budgets)
      .values({ name, amount, icon, createdBy } as any)
      .returning({ id: Budgets.id });
    console.log("[budgets POST] insert result=", result);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[budgets POST] error", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { id, name, amount, icon } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing id" }, { status: 400 });
    }
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (amount !== undefined) updateData.amount = amount;
    if (icon !== undefined) updateData.icon = icon;
    const result = await db
      .update(Budgets)
      .set(updateData)
      .where(eq(Budgets.id, id))
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
    // delete related expenses first
    await db.delete(Expenses).where(eq(Expenses.budgetId, Number(id)));
    const result = await db
      .delete(Budgets)
      .where(eq(Budgets.id, Number(id)))
      .returning();
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
