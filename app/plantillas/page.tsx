"use client";

import {
  Briefcase,
  Check,
  Download,
  Eye,
  GraduationCap,
  Palette,
  Pipette,
  ShoppingCart,
  Stethoscope,
  Tv,
  Utensils,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ColorPicker } from "@/components/color-picker";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

// Templates with unique visual styles
const templates = [
  {
    id: "restaurante-clasico",
    name: "Restaurante Clásico",
    category: "Restaurantes",
    icon: Utensils,
    description:
      "Diseño elegante con espacio para propinas y división de cuentas",
    defaultColor: "#f97316",
    features: ["Propinas", "División de cuentas", "Menú"],
    style: "classic",
    preview: { layout: "standard" },
  },
  {
    id: "restaurante-moderno",
    name: "Restaurante Moderno",
    category: "Restaurantes",
    icon: Utensils,
    description: "Estilo minimalista con tipografía moderna",
    defaultColor: "#3b82f6",
    features: ["Código QR", "Logo grande", "Minimalista"],
    style: "modern",
    preview: { layout: "minimal" },
  },
  {
    id: "supermercado-pro",
    name: "Supermercado Pro",
    category: "Retail",
    icon: ShoppingCart,
    description: "Optimizado para listas largas y códigos de barras",
    defaultColor: "#22c55e",
    features: ["Códigos de barras", "Descuentos", "Lista compacta"],
    style: "compact",
    preview: { layout: "compact" },
  },
  {
    id: "supermercado-express",
    name: "Ticket Express",
    category: "Retail",
    icon: ShoppingCart,
    description: "Formato de ticket rápido y eficiente",
    defaultColor: "#0ea5e9",
    features: ["Formato ticket", "Escaneo rápido", "ISV incluido"],
    style: "ticket",
    preview: { layout: "ticket" },
  },
  {
    id: "electronica-premium",
    name: "Electrónica Premium",
    category: "Electrónica",
    icon: Tv,
    description: "Incluye garantías, números de serie y especificaciones",
    defaultColor: "#6366f1",
    features: ["Garantía", "No. de serie", "Especificaciones"],
    style: "detailed",
    preview: { layout: "detailed" },
  },
  {
    id: "servicios-consultoria",
    name: "Consultoría",
    category: "Servicios",
    icon: Briefcase,
    description: "Facturación por horas y proyectos profesionales",
    defaultColor: "#8b5cf6",
    features: ["Horas trabajadas", "Tarifa/hora", "Descripción"],
    style: "professional",
    preview: { layout: "professional" },
  },
  {
    id: "servicios-freelance",
    name: "Freelance",
    category: "Servicios",
    icon: Briefcase,
    description: "Simple y directo para trabajadores independientes",
    defaultColor: "#f43f5e",
    features: ["Proyecto único", "Anticipo/Saldo", "Notas"],
    style: "simple",
    preview: { layout: "simple" },
  },
  {
    id: "clinica-medica",
    name: "Clínica Médica",
    category: "Salud",
    icon: Stethoscope,
    description: "Para consultas médicas, laboratorios y farmacias",
    defaultColor: "#14b8a6",
    features: ["Diagnóstico", "Receta", "Seguimiento"],
    style: "clinical",
    preview: { layout: "clinical" },
  },
  {
    id: "educacion",
    name: "Academia",
    category: "Educación",
    icon: GraduationCap,
    description: "Ideal para colegios, academias y cursos",
    defaultColor: "#f59e0b",
    features: ["Mensualidad", "Matrícula", "Alumno"],
    style: "academic",
    preview: { layout: "academic" },
  },
];

const categories = [
  "Todos",
  "Restaurantes",
  "Retail",
  "Electrónica",
  "Servicios",
  "Salud",
  "Educación",
];

// Helper to darken color
function darkenColor(hex: string, amount: number): string {
  const num = Number.parseInt(hex.replace("#", ""), 16);
  // biome-ignore lint/suspicious/noBitwiseOperators: Color manipulation requires bitwise operators
  const r = Math.max(0, (num >> 16) - amount);
  // biome-ignore lint/suspicious/noBitwiseOperators: Color manipulation requires bitwise operators
  const g = Math.max(0, ((num >> 8) & 0x00_ff) - amount);
  // biome-ignore lint/suspicious/noBitwiseOperators: Color manipulation requires bitwise operators
  const b = Math.max(0, (num & 0x00_00_ff) - amount);
  // biome-ignore lint/suspicious/noBitwiseOperators: Color manipulation requires bitwise operators
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

// Invoice preview component
function InvoicePreview({
  template,
  color,
}: {
  template: (typeof templates)[0];
  color: string;
}) {
  const darkerColor = darkenColor(color, 40);

  const getLayoutPreview = () => {
    switch (template.preview.layout) {
      case "minimal":
        return (
          <>
            <div className="h-1 w-full" style={{ backgroundColor: color }} />
            <div className="p-4">
              <div className="mb-6 flex items-start justify-between">
                <div
                  className="h-12 w-12 rounded-lg"
                  style={{ backgroundColor: color }}
                />
                <div className="text-right">
                  <div className="font-bold text-foreground text-xs">
                    FACTURA
                  </div>
                  <div className="text-[10px] text-muted-foreground">
                    #2024-001
                  </div>
                </div>
              </div>
              <div className="mb-6 space-y-3">
                {[1, 2].map((i) => (
                  <div className="flex justify-between text-[10px]" key={i}>
                    <span className="text-muted-foreground">Producto {i}</span>
                    <span className="font-medium text-foreground">
                      L.{(i * 150).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-border border-t pt-3">
                <span className="font-bold text-foreground text-xs">Total</span>
                <span className="font-bold text-sm" style={{ color }}>
                  L.450.00
                </span>
              </div>
            </div>
          </>
        );
      case "compact":
        return (
          <>
            <div
              className="p-3 text-center text-white"
              style={{ backgroundColor: color }}
            >
              <div className="font-bold text-sm">SUPER MARKET</div>
              <div className="text-[9px] opacity-80">Su factura legal</div>
            </div>
            <div className="p-3 font-mono text-[9px]">
              <div className="mb-2 space-y-1 border-border border-b border-dashed pb-2">
                {[1, 2, 3, 4].map((i) => (
                  <div className="flex justify-between text-foreground" key={i}>
                    <span>Producto {i}</span>
                    <span>{(i * 25).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between font-bold text-foreground">
                <span>TOTAL:</span>
                <span>L.250.00</span>
              </div>
            </div>
          </>
        );
      case "ticket":
        return (
          <div className="p-4 text-center font-mono">
            <div className="mb-2 font-bold text-foreground text-xs">
              ═══ TICKET ═══
            </div>
            <div className="mb-3 text-[8px] text-muted-foreground">
              27/01/2024 10:35 AM
            </div>
            <div className="mb-3 space-y-1 text-[9px]">
              {[1, 2, 3].map((i) => (
                <div className="flex justify-between text-foreground" key={i}>
                  <span>Artículo {i}</span>
                  <span>{(i * 35).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-border border-t border-dashed pt-2">
              <div className="font-bold text-sm" style={{ color }}>
                L.210.00
              </div>
            </div>
          </div>
        );
      case "detailed":
        return (
          <>
            <div
              className="p-3 text-white"
              style={{
                background: `linear-gradient(135deg, ${color} 0%, ${darkerColor} 100%)`,
              }}
            >
              <div className="font-bold text-sm">TECH ELECTRONICS</div>
              <div className="text-[9px] opacity-80">Factura Electrónica</div>
            </div>
            <div className="p-3 text-[9px]">
              <div className="mb-2 rounded bg-muted p-2">
                <div className="font-bold text-foreground">
                  Laptop Gaming XZ
                </div>
                <div className="text-muted-foreground">S/N: LPT-2024-8892</div>
                <div className="text-muted-foreground">Garantía: 24 meses</div>
              </div>
              <div className="flex justify-between border-border border-t pt-2 font-bold text-[10px] text-foreground">
                <span>Total</span>
                <span>L.25,999.00</span>
              </div>
            </div>
          </>
        );
      case "professional":
        return (
          <>
            <div
              className="h-2"
              style={{
                background: `linear-gradient(90deg, ${color} 0%, ${darkerColor} 100%)`,
              }}
            />
            <div className="p-4">
              <div className="mb-4 flex items-center gap-2">
                <div
                  className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-white text-xs"
                  style={{ backgroundColor: color }}
                >
                  C
                </div>
                <div>
                  <div className="font-bold text-foreground text-xs">
                    Consultoría Pro
                  </div>
                  <div className="text-[9px] text-muted-foreground">
                    Factura de servicios
                  </div>
                </div>
              </div>
              <div className="mb-4 space-y-2 text-[9px]">
                <div className="flex justify-between text-foreground">
                  <span>Consultoría (8 hrs)</span>
                  <span>L.4,000</span>
                </div>
                <div className="flex justify-between text-foreground">
                  <span>Implementación</span>
                  <span>L.2,500</span>
                </div>
              </div>
              <div
                className="rounded p-2"
                style={{ backgroundColor: `${color}20` }}
              >
                <div
                  className="flex justify-between font-bold text-xs"
                  style={{ color }}
                >
                  <span>Total</span>
                  <span>L.6,500.00</span>
                </div>
              </div>
            </div>
          </>
        );
      case "clinical":
        return (
          <>
            <div
              className="flex items-center gap-2 p-3"
              style={{ backgroundColor: `${color}15` }}
            >
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: color }}
              >
                <Stethoscope className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-foreground text-xs">
                  Clínica San José
                </div>
                <div className="text-[9px] text-muted-foreground">
                  Consulta Médica
                </div>
              </div>
            </div>
            <div className="p-3 text-[9px]">
              <div className="mb-2 text-muted-foreground">
                Paciente: Juan Pérez
              </div>
              <div className="mb-3 space-y-1 text-foreground">
                <div className="flex justify-between">
                  <span>Consulta general</span>
                  <span>L.500</span>
                </div>
                <div className="flex justify-between">
                  <span>Medicamentos</span>
                  <span>L.350</span>
                </div>
              </div>
              <div className="flex justify-between border-border border-t pt-2 font-bold text-[10px] text-foreground">
                <span>Total</span>
                <span>L.850.00</span>
              </div>
            </div>
          </>
        );
      case "academic":
        return (
          <>
            <div
              className="p-3 text-white"
              style={{
                background: `linear-gradient(135deg, ${color} 0%, ${darkerColor} 100%)`,
              }}
            >
              <div className="font-bold text-sm">ACADEMIA ABC</div>
              <div className="text-[9px] opacity-80">Recibo de pago</div>
            </div>
            <div className="p-3 text-[9px]">
              <div className="mb-2 text-muted-foreground">
                Alumno: María López
              </div>
              <div className="mb-3 space-y-1 text-foreground">
                <div className="flex justify-between">
                  <span>Mensualidad Febrero</span>
                  <span>L.2,500</span>
                </div>
                <div className="flex justify-between">
                  <span>Material</span>
                  <span>L.200</span>
                </div>
              </div>
              <div className="flex justify-between border-border border-t pt-2 font-bold text-[10px] text-foreground">
                <span>Total</span>
                <span>L.2,700.00</span>
              </div>
            </div>
          </>
        );
      case "simple":
        return (
          <>
            <div className="p-3" style={{ backgroundColor: color }}>
              <div className="font-bold text-sm text-white">FREELANCE</div>
            </div>
            <div className="p-4 text-[10px]">
              <div className="mb-3 text-muted-foreground">
                Proyecto: Diseño Web
              </div>
              <div className="space-y-2 text-foreground">
                <div className="flex justify-between">
                  <span>Anticipo (50%)</span>
                  <span>L.5,000</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Saldo</span>
                  <span>L.5,000</span>
                </div>
              </div>
            </div>
          </>
        );
      default: // standard
        return (
          <>
            <div
              className="p-3 text-white"
              style={{
                background: `linear-gradient(135deg, ${color} 0%, ${darkerColor} 100%)`,
              }}
            >
              <div className="font-bold text-sm">MI EMPRESA</div>
              <div className="text-[9px] opacity-80">Factura #001</div>
            </div>
            <div className="p-3">
              <div className="mb-3 space-y-2 text-[9px]">
                {[1, 2, 3].map((i) => (
                  <div className="flex justify-between text-foreground" key={i}>
                    <span>Producto {i}</span>
                    <span>L.{(i * 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between border-border border-t pt-2 font-bold text-[10px] text-foreground">
                <span>Total</span>
                <span>L.600.00</span>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-md">
      {getLayoutPreview()}
    </div>
  );
}

export default function PlantillasPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedColors, setSelectedColors] = useState<{
    [key: string]: string;
  }>({});
  const [openColorPicker, setOpenColorPicker] = useState<string | null>(null);
  const [previewModal, setPreviewModal] = useState<
    (typeof templates)[0] | null
  >(null);

  const filteredTemplates =
    selectedCategory === "Todos"
      ? templates
      : templates.filter((t) => t.category === selectedCategory);

  const getColor = (templateId: string, defaultColor: string) => {
    return selectedColors[templateId] ?? defaultColor;
  };

  const setColorForTemplate = (templateId: string, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [templateId]: color }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h1 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">
              Plantillas Profesionales
            </h1>
            <p className="text-muted-foreground">
              Elige el diseño perfecto para tu negocio. Personaliza los colores
              a tu gusto.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                className={`rounded-lg px-4 py-2 font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Templates Grid */}
          <div className="mb-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTemplates.map((template) => {
              const currentColor = getColor(template.id, template.defaultColor);

              return (
                <div
                  className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-xl"
                  key={template.id}
                >
                  {/* Preview */}
                  <div className="bg-muted/30 p-4">
                    <InvoicePreview color={currentColor} template={template} />
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <template.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground text-xs">
                        {template.category}
                      </span>
                    </div>

                    <h3 className="mb-2 font-bold text-foreground">
                      {template.name}
                    </h3>
                    <p className="mb-4 text-muted-foreground text-sm">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="mb-4 flex flex-wrap gap-2">
                      {template.features.map((feature) => (
                        <span
                          className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-foreground text-xs"
                          key={feature}
                        >
                          <Check className="h-3 w-3 text-primary" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Color Picker */}
                    <div className="relative mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-muted-foreground text-xs">
                          Color:
                        </span>
                        <button
                          className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-1.5 transition-colors hover:border-primary/50"
                          onClick={() =>
                            setOpenColorPicker(
                              openColorPicker === template.id
                                ? null
                                : template.id
                            )
                          }
                          type="button"
                        >
                          <div
                            className="h-5 w-5 rounded border border-border"
                            style={{ backgroundColor: currentColor }}
                          />
                          <span className="font-mono text-foreground text-xs">
                            {currentColor}
                          </span>
                          <Pipette className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </div>

                      {/* Color Picker Dropdown */}
                      {openColorPicker === template.id && (
                        <ColorPicker
                          color={currentColor}
                          onChange={(c) => setColorForTemplate(template.id, c)}
                          onClose={() => setOpenColorPicker(null)}
                        />
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-muted px-4 py-2.5 font-medium text-foreground text-sm transition-colors hover:bg-muted/80"
                        onClick={() => {
                          setOpenColorPicker(null);
                          setPreviewModal(template);
                        }}
                        type="button"
                      >
                        <Eye className="h-4 w-4" />
                        Ver más
                      </button>
                      <Link
                        className="gradient-bg flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 font-medium text-sm text-white transition-opacity hover:opacity-90"
                        href={`/registro?plantilla=${template.id}&color=${encodeURIComponent(currentColor)}`}
                      >
                        Usar
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 p-10 text-center">
            <Palette className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-3 font-bold text-2xl text-foreground">
              ¿Necesitas algo personalizado?
            </h2>
            <p className="mx-auto mb-6 max-w-md text-muted-foreground">
              Crea tu propia plantilla con tu logo, colores y campos
              personalizados.
            </p>
            <Link
              className="gradient-bg inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
              href="/crear-plantilla"
            >
              Crear plantilla personalizada
            </Link>
          </div>
        </div>
      </main>

      {/* Preview Modal */}
      {previewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Cerrar vista previa"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setPreviewModal(null)}
            type="button"
          />
          <div className="relative max-h-[90vh] w-full max-w-md overflow-auto rounded-2xl border border-border bg-card shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-border border-b bg-card p-4">
              <h3 className="font-bold text-foreground">{previewModal.name}</h3>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted transition-colors hover:bg-muted/80"
                onClick={() => setPreviewModal(null)}
                type="button"
              >
                <X className="h-4 w-4 text-foreground" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* Large Preview */}
              <div className="mb-6 origin-top scale-110 transform">
                <InvoicePreview
                  color={getColor(previewModal.id, previewModal.defaultColor)}
                  template={previewModal}
                />
              </div>

              {/* Color Picker in Modal */}
              <div className="relative mb-6">
                <div className="mb-3 font-medium text-foreground text-sm">
                  Elige tu color:
                </div>
                <button
                  className="flex w-full items-center gap-3 rounded-lg border border-border bg-muted px-4 py-2.5 transition-colors hover:border-primary/50"
                  onClick={() =>
                    setOpenColorPicker(
                      openColorPicker === `modal-${previewModal.id}`
                        ? null
                        : `modal-${previewModal.id}`
                    )
                  }
                  type="button"
                >
                  <div
                    className="h-8 w-8 rounded-lg border border-border"
                    style={{
                      backgroundColor: getColor(
                        previewModal.id,
                        previewModal.defaultColor
                      ),
                    }}
                  />
                  <span className="font-mono text-foreground">
                    {getColor(previewModal.id, previewModal.defaultColor)}
                  </span>
                  <Pipette className="ml-auto h-4 w-4 text-muted-foreground" />
                </button>

                {openColorPicker === `modal-${previewModal.id}` && (
                  <ColorPicker
                    color={getColor(previewModal.id, previewModal.defaultColor)}
                    onChange={(c) => setColorForTemplate(previewModal.id, c)}
                    onClose={() => setOpenColorPicker(null)}
                  />
                )}
              </div>

              {/* Features */}
              <div className="mb-6">
                <div className="mb-3 font-medium text-foreground text-sm">
                  Características incluidas:
                </div>
                <div className="space-y-2">
                  {previewModal.features.map((feature) => (
                    <div
                      className="flex items-center gap-2 text-foreground text-sm"
                      key={feature}
                    >
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-muted px-4 py-3 font-medium text-foreground transition-colors hover:bg-muted/80"
                  onClick={() => setPreviewModal(null)}
                  type="button"
                >
                  <Download className="h-4 w-4" />
                  Descargar preview
                </button>
                <Link
                  className="gradient-bg flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 font-semibold text-white transition-opacity hover:opacity-90"
                  href={`/registro?plantilla=${previewModal.id}&color=${encodeURIComponent(getColor(previewModal.id, previewModal.defaultColor))}`}
                >
                  Usar plantilla
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
