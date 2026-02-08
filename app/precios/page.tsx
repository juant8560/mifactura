import {
  Banknote,
  Building2,
  Check,
  CreditCard,
  Rocket,
  Shield,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Precios y Planes - MiFactura",
  description:
    "Planes flexibles de facturación electrónica. Comienza gratis y escala según tu negocio crezca.",
};

const plans = [
  {
    id: "free",
    name: "Gratis",
    description: "Para emprendedores",
    price: "L.0",
    period: "siempre",
    icon: Zap,
    color: "bg-gray-500",
    features: [
      { text: "50 facturas/mes", included: true },
      { text: "1 usuario", included: true },
      { text: "Plantillas básicas", included: true },
      { text: "Logo de empresa", included: true },
      { text: "Soporte por email", included: true },
      { text: "Reportes avanzados", included: false },
      { text: "API", included: false },
    ],
    cta: "Comenzar gratis",
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    description: "Para negocios en crecimiento",
    price: "L.499",
    period: "/mes",
    icon: Building2,
    color: "bg-primary",
    features: [
      { text: "Facturas ilimitadas", included: true },
      { text: "5 usuarios", included: true },
      { text: "Todas las plantillas", included: true },
      { text: "Branding completo", included: true },
      { text: "Soporte prioritario", included: true },
      { text: "Reportes avanzados", included: true },
      { text: "API", included: true },
    ],
    cta: "Iniciar prueba",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Empresarial",
    description: "Para grandes empresas",
    price: "L.1,499",
    period: "/mes",
    icon: Rocket,
    color: "bg-secondary",
    features: [
      { text: "Todo ilimitado", included: true },
      { text: "Usuarios ilimitados", included: true },
      { text: "Plantillas a medida", included: true },
      { text: "Branding premium", included: true },
      { text: "Gerente dedicado", included: true },
      { text: "Analytics avanzado", included: true },
      { text: "API + Webhooks", included: true },
    ],
    cta: "Contactar ventas",
    popular: false,
  },
];

const paymentMethods = [
  { icon: CreditCard, name: "Tarjeta de crédito/débito" },
  { icon: Banknote, name: "Transferencia bancaria" },
];

export default function PreciosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">
              Precios simples y transparentes
            </h1>
            <p className="text-muted-foreground">
              Comienza gratis. Escala cuando lo necesites.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="mx-auto mb-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                className={`relative overflow-hidden rounded-xl border bg-card transition-all ${
                  plan.popular
                    ? "scale-[1.02] border-primary shadow-lg"
                    : "border-border hover:border-primary/30"
                }`}
                key={plan.id}
              >
                {plan.popular && (
                  <div className="bg-primary py-1.5 text-center font-medium text-white text-xs">
                    Más popular
                  </div>
                )}

                <div className="p-6">
                  {/* Icon */}
                  <div
                    className={`h-11 w-11 rounded-lg ${plan.color} mb-4 flex items-center justify-center`}
                  >
                    <plan.icon className="h-5 w-5 text-white" />
                  </div>

                  {/* Name */}
                  <h3 className="mb-1 font-bold text-foreground text-xl">
                    {plan.name}
                  </h3>
                  <p className="mb-4 text-muted-foreground text-sm">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-5">
                    <span className="font-bold text-3xl text-foreground">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-muted-foreground text-sm">
                      {plan.period}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="mb-6 space-y-2.5">
                    {plan.features.map((feature) => (
                      <li
                        className="flex items-center gap-2.5 text-sm"
                        key={feature.text}
                      >
                        {feature.included ? (
                          <Check className="h-4 w-4 flex-shrink-0 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 flex-shrink-0 text-muted-foreground/50" />
                        )}
                        <span
                          className={
                            feature.included
                              ? "text-foreground"
                              : "text-muted-foreground"
                          }
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    className={`block w-full rounded-lg py-3 text-center font-medium text-sm transition-all ${
                      plan.popular
                        ? "bg-primary text-white hover:opacity-90"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                    href={`/registro?plan=${plan.id}`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 font-semibold text-foreground text-lg">
              Métodos de pago
            </h2>
            <div className="mb-4 flex items-center justify-center gap-4">
              {paymentMethods.map((method) => (
                <div
                  className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2"
                  key={method.name}
                >
                  <method.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground text-sm">{method.name}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-4 text-muted-foreground text-xs">
              <div className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                <span>Pago seguro SSL</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5" />
                <span>Garantía 30 días</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
