import {
  BarChart3,
  Bell,
  Calculator,
  Check,
  Clock,
  Cloud,
  Download,
  FileText,
  Globe,
  Lock,
  Mail,
  Palette,
  QrCode,
  Shield,
  Smartphone,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Características - MiFactura",
  description:
    "Descubre todas las características de MiFactura: facturación electrónica, plantillas personalizables, reportes y más.",
};

const mainFeatures = [
  {
    icon: FileText,
    title: "Facturación Electrónica",
    description:
      "Genera facturas válidas ante la SAR en segundos. Cumple con todos los requisitos fiscales de Honduras.",
    color: "bg-indigo-500",
    highlights: [
      "Formato CAI válido",
      "Numeración automática",
      "Envío inmediato",
    ],
  },
  {
    icon: Palette,
    title: "Plantillas Personalizables",
    description:
      "Elige entre docenas de plantillas o crea la tuya. Tu marca en cada factura.",
    color: "bg-pink-500",
    highlights: [
      "Logo de empresa",
      "Colores personalizados",
      "Múltiples diseños",
    ],
  },
  {
    icon: BarChart3,
    title: "Reportes Inteligentes",
    description:
      "Visualiza tus ventas, clientes frecuentes y tendencias. Toma decisiones informadas.",
    color: "bg-teal-500",
    highlights: [
      "Gráficos interactivos",
      "Exportar a Excel",
      "Filtros avanzados",
    ],
  },
  {
    icon: Cloud,
    title: "100% en la Nube",
    description:
      "Accede desde cualquier dispositivo. Tus datos siempre seguros y disponibles.",
    color: "bg-blue-500",
    highlights: ["Sin instalación", "Backups automáticos", "Sincronización"],
  },
];

const additionalFeatures = [
  {
    icon: Smartphone,
    title: "App Móvil",
    description: "Factura desde tu teléfono",
  },
  {
    icon: Users,
    title: "Multi-usuario",
    description: "Equipo con roles y permisos",
  },
  {
    icon: Clock,
    title: "Facturas Recurrentes",
    description: "Automatiza cobros mensuales",
  },
  {
    icon: Download,
    title: "Exportar PDF",
    description: "Descarga profesional",
  },
  { icon: Mail, title: "Envío por Email", description: "Directo al cliente" },
  { icon: Lock, title: "Seguridad SSL", description: "Datos encriptados" },
  {
    icon: QrCode,
    title: "Códigos QR",
    description: "Verificación instantánea",
  },
  { icon: Calculator, title: "Cálculos Auto", description: "ISV y totales" },
  {
    icon: Bell,
    title: "Notificaciones",
    description: "Alertas de vencimiento",
  },
  { icon: Globe, title: "Multi-moneda", description: "Lempiras y dólares" },
  { icon: Shield, title: "Cumplimiento SAR", description: "100% legal" },
  { icon: Zap, title: "Ultra Rápido", description: "Genera en segundos" },
];

const comparisons = [
  { feature: "Facturación electrónica", mifactura: true, tradicional: false },
  {
    feature: "Plantillas personalizables",
    mifactura: true,
    tradicional: false,
  },
  {
    feature: "Acceso desde cualquier lugar",
    mifactura: true,
    tradicional: false,
  },
  { feature: "Reportes automáticos", mifactura: true, tradicional: false },
  { feature: "Envío por email", mifactura: true, tradicional: false },
  { feature: "Respaldo automático", mifactura: true, tradicional: false },
  { feature: "Actualizaciones gratis", mifactura: true, tradicional: false },
  { feature: "Soporte 24/7", mifactura: true, tradicional: false },
];

export default function CaracteristicasPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="font-medium text-primary text-sm">
                Todo lo que necesitas
              </span>
            </div>
            <h1 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">
              Características que impulsan tu negocio
            </h1>
            <p className="text-lg text-muted-foreground">
              Herramientas poderosas, diseño intuitivo. Todo para que facturar
              sea un placer.
            </p>
          </div>

          {/* Main Features */}
          <div className="mb-20 grid gap-6 md:grid-cols-2">
            {mainFeatures.map((feature) => (
              <div
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/20 hover:shadow-lg"
                key={feature.title}
              >
                <div
                  className={`h-14 w-14 rounded-xl ${feature.color} mb-5 flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}
                >
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="mb-2 font-bold text-foreground text-xl">
                  {feature.title}
                </h3>
                <p className="mb-4 text-muted-foreground">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feature.highlights.map((highlight) => (
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-medium text-foreground text-xs"
                      key={highlight}
                    >
                      <Check className="h-3 w-3 text-primary" />
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Additional Features Grid */}
          <div className="mb-20">
            <h2 className="mb-10 text-center font-bold text-2xl text-foreground">
              Y mucho más...
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {additionalFeatures.map((feature) => (
                <div
                  className="rounded-xl border border-border bg-card p-4 text-center transition-colors hover:border-primary/30"
                  key={feature.title}
                >
                  <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="mb-1 font-semibold text-foreground text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground text-xs">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mx-auto mb-20 max-w-2xl">
            <h2 className="mb-10 text-center font-bold text-2xl text-foreground">
              MiFactura vs. Método Tradicional
            </h2>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="grid grid-cols-3 bg-muted p-4 font-semibold text-sm">
                <div className="text-foreground">Característica</div>
                <div className="text-center text-primary">MiFactura</div>
                <div className="text-center text-muted-foreground">
                  Tradicional
                </div>
              </div>
              {comparisons.map((item, index) => (
                <div
                  className={`grid grid-cols-3 p-4 text-sm ${index % 2 === 0 ? "" : "bg-muted/30"}`}
                  key={item.feature}
                >
                  <div className="text-foreground">{item.feature}</div>
                  <div className="text-center">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                      <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </span>
                  </div>
                  <div className="text-center">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                      <span className="text-red-600 text-xs dark:text-red-400">
                        ✕
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/10 p-12 text-center">
            <h2 className="mb-4 font-bold text-2xl text-foreground">
              ¿Listo para modernizar tu facturación?
            </h2>
            <p className="mx-auto mb-6 max-w-md text-muted-foreground">
              Únete a miles de empresas hondureñas que ya usan MiFactura.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                className="gradient-bg rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
                href="/registro"
              >
                Comenzar Gratis
              </Link>
              <Link
                className="rounded-xl border border-border bg-card px-8 py-4 font-medium text-foreground transition-colors hover:border-primary/50"
                href="/precios"
              >
                Ver Precios
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
