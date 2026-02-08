import {
  Database,
  Download,
  Eye,
  Lock,
  Mail,
  Share2,
  Shield,
  UserCheck,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Política de Privacidad - MiFactura",
  description: "Política de privacidad y protección de datos de MiFactura.",
};

const sections = [
  {
    icon: Database,
    title: "1. Información que Recopilamos",
    content:
      "Recopilamos información necesaria para proporcionar nuestros servicios de facturación electrónica. Esta información nos permite crear tu cuenta, procesar facturas y mejorar tu experiencia.",
    categories: [
      {
        name: "Información de cuenta",
        items: [
          "Nombre y razón social",
          "RTN",
          "Correo electrónico",
          "Teléfono de contacto",
        ],
      },
      {
        name: "Datos de facturación",
        items: [
          "Información de clientes",
          "Historial de facturas",
          "Métodos de pago",
        ],
      },
      {
        name: "Datos técnicos",
        items: ["Dirección IP", "Tipo de navegador", "Dispositivo utilizado"],
      },
    ],
  },
  {
    icon: Eye,
    title: "2. Cómo Usamos tu Información",
    content:
      "Utilizamos tu información exclusivamente para los fines establecidos y siempre de manera transparente.",
    list: [
      {
        purpose: "Proporcionar el servicio",
        desc: "Crear y gestionar facturas",
      },
      { purpose: "Mejorar la experiencia", desc: "Personalizar la plataforma" },
      { purpose: "Comunicaciones", desc: "Enviar facturas y notificaciones" },
      { purpose: "Cumplimiento legal", desc: "Obligaciones con la SAR" },
      { purpose: "Seguridad", desc: "Detectar y prevenir fraudes" },
    ],
  },
  {
    icon: Lock,
    title: "3. Protección de Datos",
    content:
      "La seguridad de tus datos es nuestra prioridad. Implementamos múltiples capas de protección.",
    features: [
      {
        icon: "🔒",
        title: "Encriptación SSL/TLS",
        desc: "Todas las transmisiones están cifradas",
      },
      {
        icon: "🛡️",
        title: "Cifrado en reposo",
        desc: "Datos almacenados de forma segura",
      },
      {
        icon: "👥",
        title: "Acceso restringido",
        desc: "Solo personal autorizado",
      },
      {
        icon: "🔍",
        title: "Auditorías regulares",
        desc: "Revisiones de seguridad periódicas",
      },
    ],
  },
  {
    icon: Share2,
    title: "4. Compartir Información",
    content:
      "Nunca vendemos tu información personal. Solo la compartimos en casos específicos y necesarios.",
    list: [
      {
        purpose: "Proveedores de servicio",
        desc: "Procesadores de pago certificados",
      },
      { purpose: "Obligaciones legales", desc: "Cuando la ley lo requiere" },
      { purpose: "Con tu consentimiento", desc: "Si autorizas expresamente" },
    ],
    highlight:
      "Nunca vendemos ni alquilamos tu información a terceros para fines de marketing.",
  },
  {
    icon: UserCheck,
    title: "5. Tus Derechos",
    content:
      "Respetamos tus derechos sobre tus datos personales. Puedes ejercerlos en cualquier momento.",
    rights: [
      {
        right: "Acceso",
        desc: "Solicita una copia de tus datos",
        action: "Ver mis datos",
      },
      {
        right: "Rectificación",
        desc: "Corrige información incorrecta",
        action: "Actualizar",
      },
      {
        right: "Eliminación",
        desc: "Solicita borrar tus datos",
        action: "Eliminar cuenta",
      },
      { right: "Portabilidad", desc: "Exporta tus datos", action: "Descargar" },
    ],
  },
  {
    icon: Download,
    title: "6. Retención de Datos",
    content:
      "Conservamos tus datos durante el tiempo necesario para cumplir con los fines para los que fueron recopilados y según las obligaciones legales aplicables.",
    periods: [
      { type: "Datos de cuenta", period: "Mientras la cuenta esté activa" },
      { type: "Facturas", period: "5 años (requisito legal)" },
      { type: "Logs de acceso", period: "12 meses" },
    ],
  },
];

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-3xl">
            {/* Header */}
            <div className="mb-8 rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h1 className="font-bold text-2xl text-foreground">
                    Política de Privacidad
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Última actualización: Febrero 2024
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Tu privacidad es importante para nosotros. Esta política
                describe cómo recopilamos, usamos y protegemos tu información
                personal.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-8">
              {sections.map((section) => (
                <div
                  className="overflow-hidden rounded-xl border border-border bg-card"
                  key={section.title}
                >
                  {/* Section header */}
                  <div className="flex items-center gap-3 border-border border-b bg-muted/50 p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                      <section.icon className="h-4 w-4 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground">
                      {section.title}
                    </h2>
                  </div>

                  <div className="p-5">
                    <p className="mb-4 text-muted-foreground">
                      {section.content}
                    </p>

                    {/* Categories (for section 1) */}
                    {section.categories && (
                      <div className="grid gap-3">
                        {section.categories.map((cat) => (
                          <div
                            className="rounded-lg bg-muted/30 p-3"
                            key={cat.name}
                          >
                            <div className="mb-2 font-medium text-foreground text-sm">
                              {cat.name}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {cat.items.map((item) => (
                                <span
                                  className="rounded bg-background px-2 py-1 text-muted-foreground text-xs"
                                  key={item}
                                >
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* List with descriptions */}
                    {section.list && (
                      <div className="space-y-2">
                        {section.list.map((item) => (
                          <div
                            className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-muted/30"
                            key={item.purpose}
                          >
                            <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                            <div>
                              <span className="font-medium text-foreground text-sm">
                                {item.purpose}
                              </span>
                              <span className="text-muted-foreground text-sm">
                                {" "}
                                — {item.desc}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Security features (for section 3) */}
                    {section.features && (
                      <div className="grid grid-cols-2 gap-3">
                        {section.features.map((feat) => (
                          <div
                            className="rounded-lg bg-muted/30 p-3 text-center"
                            key={feat.title}
                          >
                            <div className="mb-1 text-2xl">{feat.icon}</div>
                            <div className="font-medium text-foreground text-sm">
                              {feat.title}
                            </div>
                            <div className="text-muted-foreground text-xs">
                              {feat.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Rights (for section 5) */}
                    {section.rights && (
                      <div className="grid grid-cols-2 gap-3">
                        {section.rights.map((r) => (
                          <div
                            className="rounded-lg border border-border p-3"
                            key={r.right}
                          >
                            <div className="mb-1 font-semibold text-foreground text-sm">
                              {r.right}
                            </div>
                            <div className="mb-2 text-muted-foreground text-xs">
                              {r.desc}
                            </div>
                            <span className="font-medium text-primary text-xs">
                              {r.action} →
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Retention periods */}
                    {section.periods && (
                      <div className="space-y-2">
                        {section.periods.map((p) => (
                          <div
                            className="flex items-center justify-between rounded-lg bg-muted/30 p-2"
                            key={p.type}
                          >
                            <span className="text-foreground text-sm">
                              {p.type}
                            </span>
                            <span className="font-medium text-primary text-sm">
                              {p.period}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Highlight */}
                    {section.highlight && (
                      <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
                        <p className="font-medium text-green-700 text-sm dark:text-green-400">
                          {section.highlight}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-10 rounded-2xl bg-muted/50 p-8 text-center">
              <h3 className="mb-2 font-semibold text-foreground">
                ¿Preguntas sobre tu privacidad?
              </h3>
              <p className="mb-4 text-muted-foreground text-sm">
                Nuestro equipo de protección de datos está para ayudarte.
              </p>
              <Link
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-sm text-white transition-opacity hover:opacity-90"
                href="mailto:privacidad@mifactura.hn"
              >
                <Mail className="h-4 w-4" />
                privacidad@mifactura.hn
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
