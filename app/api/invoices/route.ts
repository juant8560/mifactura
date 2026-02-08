import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { invoices } from "@/lib/db/schema";

// GET /api/invoices - List all invoices for the current user
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "UserId is required" },
        { status: 400 }
      );
    }

    const userInvoices = await db.query.invoices.findMany({
      where: eq(invoices.userId, userId),
      orderBy: [desc(invoices.createdAt)],
    });

    return NextResponse.json(userInvoices);
  } catch (error: unknown) {
    console.error("Error fetching invoices:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/invoices - Create a new invoice
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      templateId,
      color,
      currency,
      companyName,
      clientInfo,
      items,
      totals,
      notes,
    } = body;

    if (!(userId && companyName)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [newInvoice] = await db
      .insert(invoices)
      .values({
        userId,
        templateId,
        color,
        currency,
        companyName,
        clientInfo,
        items,
        totals,
        notes,
      })
      .returning();

    return NextResponse.json(newInvoice);
  } catch (error: unknown) {
    console.error("Error saving invoice:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
