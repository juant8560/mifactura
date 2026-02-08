import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!(email && password)) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (!user) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.passwordHash);

    if (!isValid) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // In a real app, you would set a cookie or return a JWT here
    // For now, just returning the user info
    return NextResponse.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        email: user.email,
        companyName: user.companyName,
      },
    });
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Error en el servidor al iniciar sesión" },
      { status: 500 }
    );
  }
}
