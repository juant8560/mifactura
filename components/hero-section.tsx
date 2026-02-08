"use client";

import { ArrowRight, QrCode, Shield, Sparkles, Star, Zap } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

// Different invoice styles with unique designs
const invoiceStyles = [
  {
    id: "classic",
    name: "Clásico",
    description: "Elegante y profesional",
    // Unique old style: typewriter look
    oldStyle: "typewriter",
    // Unique modern style: clean with QR
    modernStyle: "qr-focus",
  },
  {
    id: "bold",
    name: "Moderno",
    description: "Audaz con gradientes",
    // Unique old style: faded receipt
    oldStyle: "receipt",
    // Unique modern style: gradient header
    modernStyle: "gradient-header",
  },
  {
    id: "minimal",
    name: "Minimalista",
    description: "Simple y limpio",
    // Unique old style: handwritten
    oldStyle: "handwritten",
    // Unique modern style: ultra minimal
    modernStyle: "ultra-minimal",
  },
];

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeStyle, setActiveStyle] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) {
      return;
    }
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const currentStyle = invoiceStyles[activeStyle];

  // Render old invoice based on style
  const renderOldInvoice = () => {
    switch (currentStyle.oldStyle) {
      case "typewriter":
        return (
          <div className="w-72 rounded-lg border border-amber-200 bg-amber-50 p-5 font-mono shadow-xl">
            <div className="mb-3 border-amber-400/50 border-b-2 border-dashed pb-3 text-center">
              <div className="text-amber-800 text-xs tracking-[0.3em]">
                ═══ FACTURA ═══
              </div>
              <div className="mt-1 text-[10px] text-amber-600">
                No. 000847 | ORIGINAL
              </div>
            </div>
            <div className="mb-3 space-y-1 text-[10px] text-amber-700">
              <div>TIENDA EL ECONÓMICO</div>
              <div className="pl-4">Col. Centro, Tegucigalpa</div>
              <div>RTN: 0501-1990-00123</div>
              <div className="text-[8px] opacity-60">
                ----------------------------
              </div>
            </div>
            <div className="mb-3 space-y-0.5 text-[10px] text-amber-800">
              <div className="flex justify-between">
                <span>1x Producto A........</span>
                <span>L.150</span>
              </div>
              <div className="flex justify-between">
                <span>2x Producto B........</span>
                <span>L.200</span>
              </div>
              <div className="flex justify-between">
                <span>1x Producto C........</span>
                <span>L.75</span>
              </div>
            </div>
            <div className="flex justify-between border-amber-400/50 border-t-2 border-dashed pt-2 font-bold text-xs">
              <span>TOTAL:</span>
              <span>L.425.00</span>
            </div>
            <div className="mt-3 text-center text-[8px] text-amber-600">
              * GRACIAS POR SU COMPRA *
            </div>
          </div>
        );
      case "receipt":
        return (
          <div className="w-64 rounded border border-gray-300 bg-gray-100 p-4 shadow-xl">
            <div className="-mx-4 -mt-4 mb-3 bg-gray-200 px-4 py-2 text-center">
              <div className="font-bold text-gray-700 text-sm">
                PULPERÍA DOÑA MARIA
              </div>
              <div className="text-[9px] text-gray-500">
                Barrio Abajo, Local #23
              </div>
            </div>
            <div className="mb-2 text-[9px] text-gray-600">
              <div>Fecha: 15/01/2020 10:34 AM</div>
              <div>Ticket: #4521</div>
            </div>
            <div className="space-y-1 border-gray-300 border-y border-dashed py-2 text-[9px] text-gray-700">
              <div className="flex justify-between">
                <span>Coca-Cola 12oz</span>
                <span>25.00</span>
              </div>
              <div className="flex justify-between">
                <span>Pan Bimbo</span>
                <span>42.00</span>
              </div>
              <div className="flex justify-between">
                <span>Leche 1L</span>
                <span>38.00</span>
              </div>
              <div className="flex justify-between">
                <span>Huevos (12)</span>
                <span>65.00</span>
              </div>
            </div>
            <div className="mt-2 text-right">
              <div className="text-[9px] text-gray-600">Subtotal: L.170.00</div>
              <div className="font-bold text-gray-800">Total: L.170.00</div>
            </div>
            <div className="mt-2 text-center text-[8px] text-gray-400">
              ════════════════════
            </div>
          </div>
        );
      case "handwritten":
        return (
          <div className="w-72 rotate-1 rounded-lg border border-gray-200 bg-white p-5 shadow-xl">
            <div className="mb-3 border-gray-300 border-b pb-2">
              <div
                className="text-gray-600 text-lg italic"
                style={{ fontFamily: "cursive" }}
              >
                Recibo
              </div>
              <div className="text-[10px] text-gray-400">15 de enero, 2020</div>
            </div>
            <div
              className="space-y-2 text-gray-600 text-sm italic"
              style={{ fontFamily: "cursive" }}
            >
              <div className="flex justify-between border-gray-200 border-b border-dotted pb-1">
                <span>Servicio de diseño</span>
                <span>L.2,500</span>
              </div>
              <div className="flex justify-between border-gray-200 border-b border-dotted pb-1">
                <span>Materiales</span>
                <span>L.800</span>
              </div>
              <div className="flex justify-between border-gray-200 border-b border-dotted pb-1">
                <span>Extras</span>
                <span>L.200</span>
              </div>
            </div>
            <div className="mt-4 border-gray-300 border-t pt-2">
              <div
                className="text-right font-bold text-gray-700 text-lg"
                style={{ fontFamily: "cursive" }}
              >
                Total: L.3,500
              </div>
            </div>
            <div className="mt-3 text-center text-[10px] text-gray-400 italic">
              Firma: ____________
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Render modern invoice based on style
  const renderModernInvoice = () => {
    switch (currentStyle.modernStyle) {
      case "qr-focus":
        return (
          <div className="w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="h-2 bg-gradient-to-r from-indigo-500 to-purple-600" />
            <div className="p-5">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                    <span className="font-bold text-sm text-white">TS</span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      Tech Store HN
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      Factura Electrónica
                    </div>
                  </div>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-primary/30 border-dashed bg-muted">
                  <QrCode className="h-10 w-10 text-primary" />
                </div>
              </div>
              <div className="mb-3 rounded-lg bg-muted p-3">
                <div className="space-y-1.5">
                  {[
                    "Laptop HP ProBook",
                    "Mouse Inalámbrico",
                    "Garantía 2 años",
                  ].map((item, i) => (
                    <div
                      className="flex items-center justify-between rounded bg-card px-2 py-1.5 text-xs"
                      key={item}
                    >
                      <span className="text-foreground">{item}</span>
                      <span className="font-medium text-foreground">
                        L.{(18_500 - i * 9000).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between border-border border-t pt-2">
                <span className="font-bold text-foreground text-sm">Total</span>
                <span className="font-bold text-lg text-primary">
                  L.23,172.50
                </span>
              </div>
            </div>
          </div>
        );
      case "gradient-header":
        return (
          <div className="w-80 overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
            <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold">Agencia Creativa</div>
                  <div className="text-xs opacity-80">Factura #2024-0892</div>
                </div>
              </div>
            </div>
            <div className="p-5">
              <div className="mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-medium text-muted-foreground text-xs">
                  Cliente Premium
                </span>
              </div>
              <div className="mb-4 space-y-2">
                {[
                  "Diseño de marca",
                  "Desarrollo web",
                  "Campañas digitales",
                ].map((item, i) => (
                  <div className="flex justify-between text-sm" key={item}>
                    <span className="text-foreground">{item}</span>
                    <span className="font-semibold text-foreground">
                      L.{(15_000 - i * 3000).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 p-3">
                <span className="font-bold text-foreground">Total</span>
                <span className="bg-gradient-to-r from-orange-500 to-purple-500 bg-clip-text font-bold text-transparent text-xl">
                  L.27,000
                </span>
              </div>
            </div>
          </div>
        );
      case "ultra-minimal":
        return (
          <div className="w-80 rounded-2xl border border-border bg-card p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
                <span className="font-bold text-background text-xs">M</span>
              </div>
              <div className="text-muted-foreground text-xs">#INV-2024</div>
            </div>
            <div className="mb-6 space-y-4">
              <div className="flex items-center justify-between border-border border-b py-2">
                <span className="text-foreground text-sm">Consultoría</span>
                <span className="font-medium text-foreground text-sm">
                  L.5,000
                </span>
              </div>
              <div className="flex items-center justify-between border-border border-b py-2">
                <span className="text-foreground text-sm">Implementación</span>
                <span className="font-medium text-foreground text-sm">
                  L.8,000
                </span>
              </div>
              <div className="flex items-center justify-between border-border border-b py-2">
                <span className="text-foreground text-sm">Soporte</span>
                <span className="font-medium text-foreground text-sm">
                  L.2,000
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-light text-foreground text-lg">Total</span>
              <span className="font-bold text-2xl text-foreground">
                L.15,000
              </span>
            </div>
            <div className="mt-4 flex items-center justify-center gap-2">
              <Shield className="h-3 w-3 text-green-500" />
              <span className="text-[10px] text-green-600">Verificado SAR</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-24">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-float rounded-full bg-primary/5 blur-3xl" />
      <div
        className="absolute right-1/4 bottom-1/4 h-80 w-80 animate-float rounded-full bg-secondary/5 blur-3xl"
        style={{ animationDelay: "-2.5s" }}
      />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary text-sm">
                Facturación moderna para Honduras
              </span>
            </div>

            <h1 className="stagger-1 mb-6 animate-fade-in-up font-bold text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
              Revela el <span className="gradient-text">futuro</span> de tu
              facturación
            </h1>

            <p className="stagger-2 mx-auto mb-8 max-w-lg animate-fade-in-up text-lg text-muted-foreground lg:mx-0">
              Pasa el mouse sobre la factura antigua para descubrir cómo se verá
              con MiFactura.
            </p>

            <div className="stagger-3 flex animate-fade-in-up flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Link
                className="group gradient-bg flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-opacity hover:opacity-90 sm:w-auto"
                href="/registro"
              >
                Comenzar Gratis
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                className="flex w-full items-center justify-center rounded-xl border border-border bg-card px-8 py-4 font-semibold text-foreground transition-colors hover:border-primary/50 sm:w-auto"
                href="/plantillas"
              >
                Ver Plantillas
              </Link>
            </div>

            <div className="stagger-4 mt-12 flex animate-fade-in-up items-center justify-center gap-8 lg:justify-start">
              <div>
                <div className="font-bold text-2xl text-foreground">10K+</div>
                <div className="text-muted-foreground text-sm">Empresas</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-bold text-2xl text-foreground">1M+</div>
                <div className="text-muted-foreground text-sm">Facturas</div>
              </div>
              <div className="h-10 w-px bg-border" />
              <div>
                <div className="font-bold text-2xl text-foreground">99.9%</div>
                <div className="text-muted-foreground text-sm">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Content - Interactive Reveal */}
          <div className="relative">
            {/* Style selector */}
            <div className="mb-6 flex items-center justify-center gap-2">
              {invoiceStyles.map((style, index) => (
                <button
                  className={`rounded-lg px-4 py-2 font-medium text-sm transition-all ${
                    activeStyle === index
                      ? "bg-primary text-white shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                  key={style.id}
                  onClick={() => setActiveStyle(index)}
                  type="button"
                >
                  {style.name}
                </button>
              ))}
            </div>

            {/* Interactive reveal area */}
            {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Mouse move is for visual reveal effect only */}
            <div
              aria-label="Demostración interactiva de factura"
              className="relative flex h-[450px] cursor-crosshair items-center justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              onMouseMove={handleMouseMove}
              ref={containerRef}
              role="img"
            >
              {/* Hint */}
              <div
                className={`absolute top-0 left-1/2 flex -translate-x-1/2 items-center gap-2 text-muted-foreground text-xs transition-opacity ${isHovering ? "opacity-0" : "opacity-60"}`}
              >
                <span className="inline-block h-4 w-4 animate-pulse rounded-full border-2 border-current" />
                Pasa el mouse para revelar
              </div>

              {/* Old Invoice Layer (bottom) */}
              <div className="absolute inset-0 flex items-center justify-center">
                {renderOldInvoice()}
              </div>

              {/* Modern Invoice Layer (top, with clip mask) */}
              <div
                className="absolute inset-0 flex items-center justify-center transition-none"
                style={{
                  clipPath: isHovering
                    ? `circle(120px at ${mousePos.x}px ${mousePos.y}px)`
                    : "circle(0px at 50% 50%)",
                }}
              >
                {/* Glow effect around reveal */}
                <div
                  className="pointer-events-none absolute h-[260px] w-[260px] rounded-full"
                  style={{
                    left: mousePos.x - 130,
                    top: mousePos.y - 130,
                    background:
                      "radial-gradient(circle, rgba(79,70,229,0.15) 0%, transparent 70%)",
                    opacity: isHovering ? 1 : 0,
                    transition: "opacity 0.2s",
                  }}
                />
                {renderModernInvoice()}
              </div>

              {/* Mouse follower indicator */}
              {isHovering && (
                <div
                  className="pointer-events-none absolute h-6 w-6 rounded-full border-2 border-primary"
                  style={{
                    left: mousePos.x - 12,
                    top: mousePos.y - 12,
                    transition: "left 0.05s, top 0.05s",
                  }}
                />
              )}
            </div>

            {/* Style description */}
            <div className="mt-4 text-center">
              <p className="text-muted-foreground text-sm">
                {currentStyle.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
