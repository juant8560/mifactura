"use client";

import {
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    // Check session
    const savedUser = localStorage.getItem("factura_pro_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("factura_pro_user");
    setUser(null);
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/plantillas", label: "Plantillas" },
    { href: "/precios", label: "Precios" },
    { href: "/nosotros", label: "Nosotros" },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-200 ${
        isScrolled ? "glass py-3 shadow-lg" : "bg-transparent py-5"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6">
        {/* Logo */}
        <Link className="group flex items-center gap-3" href="/">
          <div className="gradient-bg flex h-10 w-10 items-center justify-center rounded-xl shadow-md transition-shadow group-hover:shadow-lg">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-foreground text-xl">FacturaPro</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              className="group relative font-medium text-foreground/70 transition-colors hover:text-foreground"
              href={link.href}
              key={link.href}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="hidden items-center gap-4 md:flex">
          <ThemeToggle />
          {user ? (
            <div className="relative">
              <button
                className="group flex items-center gap-2 border-border border-l pl-4"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                type="button"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white">
                  <User className="h-4 w-4" />
                </div>
                <div className="hidden text-left lg:block">
                  <p className="font-black text-[10px] text-muted-foreground/60 uppercase leading-tight tracking-widest">
                    Mi Cuenta
                  </p>
                  <p className="max-w-[120px] truncate font-bold text-foreground text-xs leading-tight">
                    {user.email}
                  </p>
                </div>
                <ChevronDown
                  className={`h-3 w-3 text-muted-foreground transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 z-50 mt-3 w-56 animate-scale-in rounded-2xl border border-border bg-card p-2 shadow-2xl">
                  <div className="mb-1 border-border/50 border-b p-3">
                    <p className="mb-1 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                      Usuario
                    </p>
                    <p className="truncate font-bold text-foreground text-sm">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-foreground text-sm transition-colors hover:bg-muted"
                    href="/dashboard"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4 text-indigo-500" />
                    Mis Facturas
                  </Link>
                  <Link
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 font-medium text-foreground text-sm transition-colors hover:bg-muted"
                    href="/perfil"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <Settings className="h-4 w-4 text-slate-500" />
                    Configuración
                  </Link>
                  <button
                    className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 font-bold text-red-500 text-sm transition-colors hover:bg-red-50 dark:hover:bg-red-950/30"
                    onClick={handleLogout}
                    type="button"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                className="px-5 py-2.5 font-medium text-foreground/70 transition-colors hover:text-foreground"
                href="/login"
              >
                Iniciar Sesión
              </Link>
              <Link
                className="gradient-bg rounded-xl px-6 py-2.5 font-semibold text-white shadow-md transition-opacity hover:opacity-90 hover:shadow-lg"
                href="/registro"
              >
                Comenzar Gratis
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="glass mx-4 mt-2 animate-fade-in-up rounded-2xl p-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                className="py-2 font-medium text-foreground/70 transition-colors hover:text-foreground"
                href={link.href}
                key={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2 border-border" />
            <Link
              className="py-2 font-medium text-foreground/70 transition-colors hover:text-foreground"
              href="/login"
            >
              Iniciar Sesión
            </Link>
            <Link
              className="gradient-bg rounded-xl px-6 py-3 text-center font-semibold text-white transition-opacity hover:opacity-90"
              href="/registro"
            >
              Comenzar Gratis
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
