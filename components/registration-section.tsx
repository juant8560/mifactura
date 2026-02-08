"use client";

import { Building2, Check, FileText, Loader2, Mail, Phone } from "lucide-react";
import { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";

export function RegistrationSection() {
  const [formData, setFormData] = useState({
    companyName: "",
    rtn: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const formatRTN = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 14);
    if (digits.length <= 4) {
      return digits;
    }
    if (digits.length <= 8) {
      return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    }
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
  };

  if (isSubmitted) {
    return (
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center shadow-lg">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="mb-3 font-bold text-2xl text-foreground">
              ¡Registro exitoso!
            </h2>
            <p className="text-muted-foreground">
              Te hemos enviado un correo a{" "}
              <strong className="text-foreground">{formData.email}</strong> con
              los siguientes pasos.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-muted/30 py-24" id="registro">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          {/* Left Content */}
          <ScrollReveal>
            <div>
              <h2 className="mb-5 font-bold text-3xl text-foreground md:text-4xl">
                Comienza a facturar en minutos
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Registra tu empresa y genera tu primera factura hoy. Sin
                contratos, sin complicaciones.
              </p>

              {/* Benefits */}
              <div className="space-y-4">
                {[
                  {
                    icon: FileText,
                    text: "Facturas ilimitadas desde el primer día",
                  },
                  { icon: Building2, text: "Tu logo y marca en cada factura" },
                  { icon: Mail, text: "Envío automático por correo" },
                ].map((benefit) => (
                  <div className="flex items-center gap-4" key={benefit.text}>
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-foreground">{benefit.text}</p>
                  </div>
                ))}
              </div>

              {/* Live Preview */}
              <div className="mt-10 rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-3 font-medium text-muted-foreground text-xs">
                  Vista previa
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                    {formData.companyName ? (
                      <span className="font-bold text-primary text-xl">
                        {formData.companyName.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      <Building2 className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {formData.companyName || "Nombre de tu empresa"}
                    </div>
                    <div className="text-muted-foreground text-sm">
                      RTN: {formData.rtn || "XXXX-XXXX-XXXXX"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal delay={200}>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-xl">
              <h3 className="mb-5 font-bold text-foreground text-xl">
                Información de tu empresa
              </h3>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Company Name */}
                <div>
                  <label
                    className="mb-1.5 block font-medium text-foreground text-sm"
                    htmlFor="companyName"
                  >
                    Nombre de la empresa *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      className="w-full rounded-lg border border-border bg-muted py-2.5 pr-4 pl-10 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                      id="companyName"
                      name="companyName"
                      onChange={handleInputChange}
                      placeholder="Ej: Tech Store Honduras"
                      required
                      type="text"
                      value={formData.companyName}
                    />
                  </div>
                </div>

                {/* RTN */}
                <div>
                  <label
                    className="mb-1.5 block font-medium text-foreground text-sm"
                    htmlFor="rtn"
                  >
                    RTN *
                  </label>
                  <div className="relative">
                    <FileText className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      className="w-full rounded-lg border border-border bg-muted py-2.5 pr-4 pl-10 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                      id="rtn"
                      name="rtn"
                      onChange={(e) => {
                        const formatted = formatRTN(e.target.value);
                        setFormData((prev) => ({ ...prev, rtn: formatted }));
                      }}
                      placeholder="0501-2024-12345"
                      required
                      type="text"
                      value={formData.rtn}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    className="mb-1.5 block font-medium text-foreground text-sm"
                    htmlFor="email"
                  >
                    Correo electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      className="w-full rounded-lg border border-border bg-muted py-2.5 pr-4 pl-10 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                      id="email"
                      name="email"
                      onChange={handleInputChange}
                      placeholder="correo@empresa.hn"
                      required
                      type="email"
                      value={formData.email}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label
                    className="mb-1.5 block font-medium text-foreground text-sm"
                    htmlFor="phone"
                  >
                    Teléfono
                  </label>
                  <div className="relative">
                    <Phone className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      className="w-full rounded-lg border border-border bg-muted py-2.5 pr-4 pl-10 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                      id="phone"
                      name="phone"
                      onChange={handleInputChange}
                      placeholder="+504 2222-3333"
                      type="tel"
                      value={formData.phone}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  className="gradient-bg mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white shadow-md transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    "Crear cuenta gratis"
                  )}
                </button>

                <p className="text-center text-muted-foreground text-xs">
                  Al registrarte aceptas nuestros{" "}
                  <a className="text-primary hover:underline" href="/terminos">
                    Términos
                  </a>{" "}
                  y{" "}
                  <a
                    className="text-primary hover:underline"
                    href="/privacidad"
                  >
                    Privacidad
                  </a>
                </p>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
