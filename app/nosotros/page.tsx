import {
  Award,
  Eye,
  Heart,
  Lightbulb,
  Rocket,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata = {
  title: "Nosotros - FacturaPro",
  description:
    "Conoce la historia de FacturaPro, la plataforma de facturación más moderna de Honduras. Un producto de Inversiones San Juan Diego S. de R.L.",
};

const stats = [
  { value: "2026", label: "Año de fundación" },
  { value: "5K+", label: "Empresas activas" },
  { value: "100K+", label: "Facturas emitidas" },
  { value: "99.9%", label: "Disponibilidad" },
];

const values = [
  {
    icon: Target,
    title: "Innovación",
    description:
      "Buscamos constantemente nuevas formas de simplificar la facturación.",
  },
  {
    icon: Users,
    title: "Centrados en el cliente",
    description: "Cada decisión la tomamos pensando en nuestros usuarios.",
  },
  {
    icon: Heart,
    title: "Pasión",
    description: "Amamos lo que hacemos y se refleja en cada detalle.",
  },
  {
    icon: Award,
    title: "Excelencia",
    description: "Nos esforzamos por ofrecer la mejor experiencia posible.",
  },
];

const timeline = [
  {
    year: "2025",
    title: "La idea nace",
    description:
      "En 2025, identificamos la necesidad de modernizar la facturación en Honduras. Comenzamos a investigar y desarrollar el concepto.",
  },
  {
    year: "2025",
    title: "Desarrollo inicial",
    description:
      "Formamos el equipo fundador y comenzamos el desarrollo de la plataforma con tecnología de punta.",
  },
  {
    year: "2026",
    title: "Fundación oficial",
    description:
      "Inversiones San Juan Diego S. de R.L. funda oficialmente FacturaPro, lanzando la primera versión de la plataforma.",
  },
  {
    year: "2026",
    title: "Primeros clientes",
    description:
      "Empezamos a crecer rápidamente con restaurantes, supermercados y empresas de servicios confiando en nosotros.",
  },
  {
    year: "2026",
    title: "Hoy",
    description:
      "Más de 5,000 empresas hondureñas ya utilizan FacturaPro para su facturación diaria.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 font-medium text-primary text-sm">
              <Rocket className="h-4 w-4" />
              Un producto de Inversiones San Juan Diego S. de R.L.
            </div>
            <h1 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">
              Modernizando la facturación en Honduras
            </h1>
            <p className="text-lg text-muted-foreground">
              Nacimos en 2025 con una misión clara: hacer que facturar sea tan
              fácil como enviar un mensaje. Fundada oficialmente en 2026,
              FacturaPro ya está transformando cómo las empresas hondureñas
              manejan su facturación.
            </p>
          </div>

          {/* Stats */}
          <div className="mb-20 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
              <div
                className="rounded-xl border border-border bg-card p-6 text-center"
                key={stat.label}
              >
                <div className="mb-1 font-bold text-2xl text-primary md:text-3xl">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* About the Company */}
          <div className="mx-auto mb-20 max-w-4xl rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 p-8">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-bold text-foreground text-xl">
                  Sobre FacturaPro
                </h2>
                <p className="text-muted-foreground text-sm">
                  Nuestra historia
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              FacturaPro es una startup hondureña fundada en 2026 por{" "}
              <strong className="text-foreground">
                Inversiones San Juan Diego S. de R.L.
              </strong>{" "}
              Nuestra historia comenzó en 2025, cuando identificamos que miles
              de negocios en Honduras seguían usando métodos anticuados y
              complicados para facturar. Nos propusimos crear una solución
              moderna, accesible y cumpliendo con todos los requisitos de la
              SAR.
            </p>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              Hoy, FacturaPro permite a restaurantes, supermercados, clínicas,
              consultorías y todo tipo de empresas generar facturas
              profesionales en segundos. Nuestra plataforma 100% en la nube está
              disponible 24/7, con plantillas personalizables y un diseño
              intuitivo que cualquiera puede usar sin capacitación.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="mx-auto mb-20 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="mb-3 font-bold text-foreground text-xl">
                Nuestra Misión
              </h2>
              <p className="text-muted-foreground">
                Democratizar el acceso a herramientas de facturación
                profesional, permitiendo que cualquier negocio, sin importar su
                tamaño, pueda emitir facturas de calidad cumpliendo con la ley.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                <Eye className="h-6 w-6 text-secondary" />
              </div>
              <h2 className="mb-3 font-bold text-foreground text-xl">
                Nuestra Visión
              </h2>
              <p className="text-muted-foreground">
                Ser la plataforma líder de facturación en Centroamérica,
                reconocida por nuestra innovación, facilidad de uso y compromiso
                con el crecimiento de nuestros clientes.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="mb-10 text-center font-bold text-2xl text-foreground">
              Nuestros Valores
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => (
                <div className="text-center" key={value.title}>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-muted">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mx-auto max-w-2xl">
            <h2 className="mb-10 flex items-center justify-center gap-2 text-center font-bold text-2xl text-foreground">
              <TrendingUp className="h-6 w-6 text-primary" />
              Nuestra Historia
            </h2>
            <div className="relative">
              {/* Line */}
              <div className="absolute top-0 bottom-0 left-4 w-0.5 -translate-x-1/2 bg-border md:left-1/2" />

              {timeline.map((item, index) => (
                <div
                  className={`relative mb-8 flex items-start gap-6 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                  key={`${item.year}-${item.title}`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 mt-1.5 h-3 w-3 -translate-x-1/2 rounded-full bg-primary md:left-1/2" />

                  {/* Content */}
                  <div
                    className={`ml-10 md:ml-0 md:w-[calc(50%-24px)] ${index % 2 === 0 ? "md:text-right" : ""}`}
                  >
                    <div className="mb-2 inline-block rounded bg-primary/10 px-2.5 py-1 font-medium text-primary text-sm">
                      {item.year}
                    </div>
                    <h3 className="mb-1 font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto mt-20 max-w-2xl rounded-2xl border border-border bg-card p-10 text-center">
            <h2 className="mb-3 font-bold text-2xl text-foreground">
              ¿Listo para modernizar tu facturación?
            </h2>
            <p className="mb-6 text-muted-foreground">
              Únete a las miles de empresas hondureñas que ya confían en
              FacturaPro.
            </p>
            <a
              className="gradient-bg inline-flex items-center gap-2 rounded-xl px-8 py-4 font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
              href="/registro"
            >
              Comenzar gratis
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
