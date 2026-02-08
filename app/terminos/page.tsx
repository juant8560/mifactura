import {
  AlertTriangle,
  CreditCard,
  FileText,
  Mail,
  RefreshCw,
  Scale,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Términos y Condiciones - MiFactura",
  description: "Términos y condiciones de uso de la plataforma MiFactura.",
};

const sections = [
  {
    icon: FileText,
    title: "1. Aceptación de los Términos",
    content:
      "Al acceder y utilizar MiFactura, usted acepta estar sujeto a estos términos y condiciones en su totalidad. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder ni utilizar nuestros servicios. Nos reservamos el derecho de actualizar estos términos en cualquier momento.",
    highlight:
      "El uso continuado del servicio constituye la aceptación de cualquier modificación.",
  },
  {
    icon: Scale,
    title: "2. Uso del Servicio",
    content:
      "MiFactura proporciona una plataforma de facturación electrónica diseñada para cumplir con los requisitos de la SAR de Honduras. Usted se compromete a utilizar el servicio únicamente para fines legales y de acuerdo con estos términos.",
    list: [
      "Mantener la confidencialidad de sus credenciales de acceso",
      "Proporcionar información veraz, precisa y actualizada",
      "Cumplir con todas las regulaciones fiscales aplicables",
      "No intentar acceder a cuentas de otros usuarios",
      "No utilizar el servicio para actividades fraudulentas o ilegales",
    ],
  },
  {
    icon: CreditCard,
    title: "3. Facturación y Pagos",
    content:
      "Los planes de pago se facturan según el ciclo seleccionado (mensual o anual). Los pagos se procesan de forma segura a través de proveedores certificados PCI-DSS.",
    list: [
      "Los precios están expresados en Lempiras hondureños (HNL)",
      "El ISV se calcula y cobra según la legislación vigente",
      "Las facturas se envían automáticamente por correo electrónico",
      "No hay reembolsos por períodos parciales no utilizados",
    ],
  },
  {
    icon: Shield,
    title: "4. Propiedad Intelectual",
    content:
      "Todo el contenido de MiFactura, incluyendo pero no limitado a diseños, logos, código fuente, textos y gráficos, es propiedad exclusiva de MiFactura o sus licenciantes. Queda expresamente prohibida su reproducción, distribución o modificación sin autorización previa por escrito.",
    highlight:
      "Las plantillas generadas por el usuario permanecen como propiedad del usuario.",
  },
  {
    icon: AlertTriangle,
    title: "5. Limitación de Responsabilidad",
    content:
      "MiFactura no será responsable por daños indirectos, incidentales, especiales, consecuentes o punitivos que resulten del uso o la imposibilidad de usar el servicio. Nuestra responsabilidad total no excederá el monto pagado por usted en los últimos 12 meses.",
    list: [
      "Interrupciones temporales del servicio por mantenimiento",
      "Errores causados por datos ingresados incorrectamente",
      "Problemas de conectividad del usuario",
      "Cambios en la legislación fiscal",
    ],
  },
  {
    icon: RefreshCw,
    title: "6. Modificaciones al Servicio",
    content:
      "Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del servicio en cualquier momento. Notificaremos a los usuarios sobre cambios significativos con al menos 30 días de anticipación a través del correo electrónico registrado.",
  },
  {
    icon: Mail,
    title: "7. Contacto",
    content:
      "Para cualquier consulta relacionada con estos términos, puede contactarnos a través de nuestros canales oficiales. Nuestro equipo legal responderá en un plazo máximo de 5 días hábiles.",
  },
];

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mx-auto mb-12 max-w-3xl">
            <div className="mb-8 rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <Scale className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="font-bold text-2xl text-foreground">
                    Términos y Condiciones
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Última actualización: Febrero 2024
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">
                Estos términos rigen el uso de la plataforma MiFactura. Por
                favor, léelos cuidadosamente antes de utilizar nuestros
                servicios.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section) => (
                <div
                  className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/20"
                  key={section.title}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-muted">
                      <section.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="mb-3 font-semibold text-foreground text-lg">
                        {section.title}
                      </h2>
                      <p className="mb-4 text-muted-foreground">
                        {section.content}
                      </p>

                      {section.list && (
                        <ul className="mb-4 space-y-2">
                          {section.list.map((item) => (
                            <li
                              className="flex items-start gap-2 text-foreground text-sm"
                              key={item}
                            >
                              <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.highlight && (
                        <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                          <p className="font-medium text-primary text-sm">
                            {section.highlight}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact CTA */}
            <div className="mt-10 rounded-2xl bg-muted/50 p-8 text-center">
              <h3 className="mb-2 font-semibold text-foreground">
                ¿Tienes preguntas sobre estos términos?
              </h3>
              <p className="mb-4 text-muted-foreground text-sm">
                Nuestro equipo legal está disponible para aclarar cualquier
                duda.
              </p>
              <Link
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-sm text-white transition-opacity hover:opacity-90"
                href="mailto:legal@mifactura.hn"
              >
                <Mail className="h-4 w-4" />
                legal@mifactura.hn
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
