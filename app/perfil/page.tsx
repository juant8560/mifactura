"use client";

import {
  Building2,
  Check,
  Loader2,
  Mail,
  Phone,
  Save,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

interface UserProfile {
  id: string;
  email: string;
  companyName?: string;
  phone?: string;
}

export default function PerfilPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("factura_pro_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      window.location.href = "/login";
    }
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulating save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.setItem("factura_pro_user", JSON.stringify(user));
    setIsSaved(true);
    setIsLoading(false);
    setTimeout(() => setIsSaved(false), 3000);
  };

  if (!user) {
    return null;
  }

  const SaveIcon = isSaved ? Check : Save;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto max-w-2xl px-6">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-xl">
            <div className="mb-8 flex items-center gap-6 border-border border-b pb-8">
              <div className="gradient-bg flex h-20 w-20 items-center justify-center rounded-2xl text-white shadow-lg">
                <User className="h-10 w-10" />
              </div>
              <div>
                <h1 className="font-bold text-2xl text-foreground">
                  {user.companyName || "Mi Perfil"}
                </h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <form className="space-y-6" onSubmit={handleSave}>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    className="mb-2 block font-black text-muted-foreground text-xs uppercase tracking-widest"
                    htmlFor="company-name"
                  >
                    Nombre de Empresa
                  </label>
                  <div className="relative">
                    <Building2 className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      className="w-full rounded-xl border border-border bg-muted/50 py-3 pr-4 pl-12 font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                      id="company-name"
                      onChange={(e) =>
                        setUser((prev) =>
                          prev ? { ...prev, companyName: e.target.value } : null
                        )
                      }
                      type="text"
                      value={user.companyName || ""}
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="mb-2 block font-black text-muted-foreground text-xs uppercase tracking-widest"
                    htmlFor="phone-input"
                  >
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      className="w-full rounded-xl border border-border bg-muted/50 py-3 pr-4 pl-12 font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                      id="phone-input"
                      onChange={(e) =>
                        setUser((prev) =>
                          prev ? { ...prev, phone: e.target.value } : null
                        )
                      }
                      type="text"
                      value={user.phone || ""}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  className="mb-2 block font-black text-muted-foreground text-xs uppercase tracking-widest"
                  htmlFor="user-email"
                >
                  Correo Electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="w-full cursor-not-allowed rounded-xl border border-border bg-muted/20 py-3 pr-4 pl-12 font-medium opacity-60"
                    disabled
                    id="user-email"
                    type="email"
                    value={user.email}
                  />
                </div>
              </div>

              <div className="flex justify-end border-border border-t pt-6">
                <button
                  className={`flex items-center gap-2 rounded-xl px-8 py-3 font-bold shadow-lg transition-all active:scale-95 ${
                    isSaved
                      ? "bg-emerald-500 text-white"
                      : "gradient-bg text-white hover:opacity-90"
                  }`}
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <SaveIcon className="h-5 w-5" />
                  )}
                  {isSaved ? "GUARDADO" : "GUARDAR CAMBIOS"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
