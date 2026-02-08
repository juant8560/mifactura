"use client";

import {
  ArrowRight,
  Briefcase,
  Check,
  Palette,
  ShoppingCart,
  Tv,
  Utensils,
} from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "./scroll-reveal";

const invoiceTypes = [
  {
    id: "restaurant",
    icon: Utensils,
    title: "Restaurantes",
    description: "Facturación para mesas, propinas y desglose de platillos",
    features: ["Propinas automáticas", "División de cuentas", "Menú integrado"],
    color: "bg-orange-500",
    colorLight: "bg-orange-50 dark:bg-orange-950/30",
    colorText: "text-orange-600 dark:text-orange-400",
    example: {
      business: "Restaurante El Buen Sabor",
      items: ["Plato del día", "Bebidas", "Postre"],
      total: "L.485.00",
    },
  },
  {
    id: "supermarket",
    icon: ShoppingCart,
    title: "Supermercados",
    description: "Listas extensas, códigos de barras y descuentos",
    features: ["Escaneo rápido", "Descuentos", "Inventario"],
    color: "bg-green-500",
    colorLight: "bg-green-50 dark:bg-green-950/30",
    colorText: "text-green-600 dark:text-green-400",
    example: {
      business: "Super La Colonia",
      items: ["Productos varios (15)", "Ofertas aplicadas"],
      total: "L.1,250.00",
    },
  },
  {
    id: "electronics",
    icon: Tv,
    title: "Electrodomésticos",
    description: "Garantías, números de serie y financiamiento",
    features: ["Garantía incluida", "Números de serie", "Pagos"],
    color: "bg-blue-500",
    colorLight: "bg-blue-50 dark:bg-blue-950/30",
    colorText: "text-blue-600 dark:text-blue-400",
    example: {
      business: "Tiendas MAX",
      items: ['TV Samsung 55"', "Garantía 2 años"],
      total: "L.15,999.00",
    },
  },
  {
    id: "services",
    icon: Briefcase,
    title: "Servicios",
    description: "Facturación por horas, proyectos y consultoría",
    features: ["Horas trabajadas", "Tarifas flexibles", "Proyectos"],
    color: "bg-purple-500",
    colorLight: "bg-purple-50 dark:bg-purple-950/30",
    colorText: "text-purple-600 dark:text-purple-400",
    example: {
      business: "Consultora ABC",
      items: ["Consultoría (8 hrs)", "Implementación"],
      total: "L.8,500.00",
    },
  },
  {
    id: "custom",
    icon: Palette,
    title: "Personalizado",
    description: "Diseña tu propia plantilla con tu marca",
    features: ["Logo propio", "Colores", "Campos personalizados"],
    color: "bg-pink-500",
    colorLight: "bg-pink-50 dark:bg-pink-950/30",
    colorText: "text-pink-600 dark:text-pink-400",
    example: {
      business: "Tu Empresa",
      items: ["Tus productos", "Tu formato"],
      total: "Tu precio",
    },
  },
];

export function InvoiceTypesSection() {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">
              Plantillas para cada industria
            </h2>
            <p className="text-muted-foreground">
              Elige la plantilla perfecta para tu negocio. Todas incluyen los
              campos requeridos por la SAR.
            </p>
          </div>
        </ScrollReveal>

        {/* Cards Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {invoiceTypes.map((type, index) => (
            <ScrollReveal delay={index * 100} key={type.id}>
              <div className="group h-full overflow-hidden rounded-2xl border border-border bg-card transition-all duration-200 hover:border-primary/30 hover:shadow-xl">
                {/* Mini invoice preview */}
                <div
                  className={`${type.colorLight} border-border border-b p-4`}
                >
                  <div className="rounded-lg bg-card p-3 shadow-sm">
                    <div className="mb-2 flex items-center gap-2">
                      <div className={`h-6 w-6 rounded ${type.color}`} />
                      <span className="font-medium text-foreground text-xs">
                        {type.example.business}
                      </span>
                    </div>
                    <div className="mb-2 space-y-1">
                      {type.example.items.map((item) => (
                        <div
                          className="flex justify-between text-[10px] text-muted-foreground"
                          key={item}
                        >
                          <span>{item}</span>
                          <span className="h-1 w-8 rounded bg-muted" />
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between border-border border-t pt-2">
                      <span className="font-medium text-[10px] text-foreground">
                        Total:
                      </span>
                      <span className={`font-bold text-xs ${type.colorText}`}>
                        {type.example.total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={`h-10 w-10 rounded-lg ${type.color} flex items-center justify-center`}
                    >
                      <type.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-bold text-foreground text-lg">
                      {type.title}
                    </h3>
                  </div>

                  <p className="mb-4 text-muted-foreground text-sm">
                    {type.description}
                  </p>

                  {/* Features */}
                  <ul className="mb-5 space-y-2">
                    {type.features.map((feature) => (
                      <li
                        className="flex items-center gap-2 text-foreground/80 text-sm"
                        key={feature}
                      >
                        <Check className={`h-4 w-4 ${type.colorText}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    className={`inline-flex items-center gap-2 font-semibold text-sm ${type.colorText} transition-all hover:gap-3`}
                    href={`/registro?tipo=${type.id}`}
                  >
                    Usar esta plantilla
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom CTA */}
        <ScrollReveal delay={500}>
          <div className="text-center">
            <Link
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 font-medium text-foreground transition-colors hover:border-primary/50"
              href="/plantillas"
            >
              Ver todas las plantillas
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
