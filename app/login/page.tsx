"use client";

import {
  ArrowRight,
  Eye,
  EyeOff,
  FileText,
  Loader2,
  Lock,
  Mail,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Credenciales inválidas");
      }

      // Save user info for demo persistence
      localStorage.setItem("factura_pro_user", JSON.stringify(data.user));

      // Redirect to home/dashboard
      window.location.href = "/";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] bg-background from-indigo-100/50 via-background to-background p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link
          className="group mb-10 flex items-center justify-center gap-4"
          href="/"
        >
          <div className="gradient-bg flex h-14 w-14 items-center justify-center rounded-2xl shadow-xl transition-all group-hover:scale-105">
            <FileText className="h-7 w-7 text-white" />
          </div>
          <span className="font-black text-3xl text-foreground tracking-tighter">
            FacturaPro
          </span>
        </Link>

        {/* Card */}
        <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
          <h1 className="mb-2 text-center font-bold text-2xl text-foreground">
            Bienvenido de vuelta
          </h1>
          <p className="mb-8 text-center text-muted-foreground">
            Ingresa a tu cuenta para continuar
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="flex animate-shake items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 font-bold text-red-600 text-sm">
                <X className="h-4 w-4" />
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label
                className="ml-1 block font-black text-[10px] text-muted-foreground uppercase tracking-widest"
                htmlFor="email"
              >
                Correo electrónico
              </label>
              <div className="group relative">
                <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  className="w-full rounded-2xl border border-border bg-muted/30 py-3.5 pr-4 pl-11 font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                  id="email"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="correo@empresa.hn"
                  required
                  type="email"
                  value={formData.email}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="mb-1 flex items-center justify-between">
                <label
                  className="ml-1 block font-black text-[10px] text-muted-foreground uppercase tracking-widest"
                  htmlFor="password"
                >
                  Contraseña
                </label>
                <Link
                  className="font-bold text-[10px] text-primary uppercase tracking-wider hover:underline"
                  href="/recuperar"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="group relative">
                <Lock className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
                <input
                  className="w-full rounded-2xl border border-border bg-muted/30 py-3.5 pr-12 pl-11 font-medium text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                  id="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                />
                <button
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground transition-colors hover:text-primary"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              className="gradient-bg flex w-full items-center justify-center gap-2 rounded-2xl py-3 font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              disabled={isLoading}
              type="submit"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  INGRESAR AHORA
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-border border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 font-bold text-muted-foreground tracking-widest">
                  O continúa con
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                className="group flex items-center justify-center gap-2 rounded-2xl border border-border bg-muted/50 py-3 transition-all hover:bg-muted"
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="currentColor"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-bold text-sm">Google</span>
              </button>
              <button
                className="group flex items-center justify-center gap-2 rounded-2xl border border-border bg-muted/50 py-3 transition-all hover:bg-muted"
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"
                    fill="currentColor"
                  />
                </svg>
                <span className="font-bold text-sm">Microsoft</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-muted-foreground text-xs">o</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Register link */}
          <p className="text-center text-muted-foreground text-sm">
            ¿No tienes cuenta?{" "}
            <Link
              className="font-medium text-primary hover:underline"
              href="/registro"
            >
              Regístrate gratis
            </Link>
          </p>
        </div>

        {/* Back to home */}
        <p className="mt-6 text-center">
          <Link
            className="text-muted-foreground text-sm transition-colors hover:text-foreground"
            href="/"
          >
            ← Volver al inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
