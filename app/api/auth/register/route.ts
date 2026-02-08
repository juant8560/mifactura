import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function POST(req: Request) {
  try {
    const { email, password, companyName, rtn, phone } = await req.json();

    if (!(email && password)) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "El usuario ya existe" },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);

    const [newUser] = await db
      .insert(users)
      .values({
        email,
        passwordHash,
        companyName,
        rtn,
        phone,
      })
      .returning();

    return NextResponse.json(
      { message: "Usuario registrado con éxito", userId: newUser.id },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error en el servidor al registrar usuario" },
      { status: 500 }
    );
  }
}
