"use client";

import { Check, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h1 className="mb-4 font-bold text-3xl text-foreground md:text-4xl">
              Contáctanos
            </h1>
            <p className="text-muted-foreground">
              ¿Tienes preguntas? Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">Email</h3>
                <p className="mb-2 text-muted-foreground text-sm">
                  Respuesta en 24 horas
                </p>
                <a
                  className="font-medium text-primary text-sm hover:underline"
                  href="mailto:contacto@mifactura.hn"
                >
                  contacto@mifactura.hn
                </a>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">Teléfono</h3>
                <p className="mb-2 text-muted-foreground text-sm">
                  Lun-Vie 8am-5pm
                </p>
                <a
                  className="font-medium text-primary text-sm hover:underline"
                  href="tel:+50432960762"
                >
                  +504 3296-0762
                </a>
              </div>

              <div className="rounded-xl border border-border bg-card p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <MapPin className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mb-1 font-semibold text-foreground">Oficina</h3>
                <p className="text-muted-foreground text-sm">
                  Blvd. Morazán, Torre Ejecutiva
                  <br />
                  Tegucigalpa, Honduras
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-border bg-card p-8">
                {isSubmitted ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                      <Check className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="mb-2 font-bold text-foreground text-xl">
                      ¡Mensaje enviado!
                    </h2>
                    <p className="text-muted-foreground">
                      Te responderemos a la brevedad posible.
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="mb-6 font-bold text-foreground text-xl">
                      Envíanos un mensaje
                    </h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                      <div className="grid gap-5 md:grid-cols-2">
                        <div>
                          <label
                            className="mb-2 block font-medium text-foreground text-sm"
                            htmlFor="name"
                          >
                            Nombre *
                          </label>
                          <input
                            className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                            id="name"
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Tu nombre"
                            required
                            type="text"
                            value={formData.name}
                          />
                        </div>
                        <div>
                          <label
                            className="mb-2 block font-medium text-foreground text-sm"
                            htmlFor="email"
                          >
                            Email *
                          </label>
                          <input
                            className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                            id="email"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            placeholder="correo@ejemplo.com"
                            required
                            type="email"
                            value={formData.email}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          className="mb-2 block font-medium text-foreground text-sm"
                          htmlFor="subject"
                        >
                          Asunto *
                        </label>
                        <input
                          className="w-full rounded-lg border border-border bg-muted px-4 py-2.5 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                          id="subject"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              subject: e.target.value,
                            })
                          }
                          placeholder="¿Cómo podemos ayudarte?"
                          required
                          type="text"
                          value={formData.subject}
                        />
                      </div>

                      <div>
                        <label
                          className="mb-2 block font-medium text-foreground text-sm"
                          htmlFor="message"
                        >
                          Mensaje *
                        </label>
                        <textarea
                          className="w-full resize-none rounded-lg border border-border bg-muted px-4 py-2.5 text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
                          id="message"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                          placeholder="Cuéntanos más sobre tu consulta..."
                          required
                          rows={5}
                          value={formData.message}
                        />
                      </div>

                      <button
                        className="gradient-bg flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Enviar mensaje
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
