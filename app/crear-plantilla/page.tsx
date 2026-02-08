"use client";

import {
  ArrowRight,
  Building2,
  Calculator,
  Check,
  DollarSign,
  Download,
  Eye,
  FileText,
  GripVertical,
  Image as ImageIcon,
  List,
  Loader2,
  Lock,
  MessageSquare,
  Pipette,
  Plus,
  QrCode,
  Save,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { ColorPicker } from "@/components/color-picker";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { generateInvoicePDF } from "@/lib/utils/pdf";

// Invoice sections that can be reordered
const defaultSections = [
  {
    id: "header",
    name: "Encabezado",
    icon: Building2,
    enabled: true,
    description: "Logo, nombre de empresa, RTN",
  },
  {
    id: "client",
    name: "Cliente",
    icon: FileText,
    enabled: true,
    description: "Nombre, RTN, dirección del cliente",
  },
  {
    id: "items",
    name: "Productos",
    icon: List,
    enabled: true,
    description: "Lista de productos/servicios",
  },
  {
    id: "totals",
    name: "Totales",
    icon: Calculator,
    enabled: true,
    description: "Subtotal, ISV, total",
  },
  {
    id: "notes",
    name: "Notas",
    icon: MessageSquare,
    enabled: true,
    description: "Notas adicionales",
  },
  {
    id: "qr",
    name: "Código QR",
    icon: QrCode,
    enabled: false,
    description: "QR de verificación SAR",
  },
];

export default function CrearPlantillaPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      }
    >
      <CrearPlantillaContent />
    </Suspense>
  );
}

function CrearPlantillaContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(true);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    name?: string;
  } | null>(null);

  // Template state
  const [primaryColor, setPrimaryColor] = useState("#6366f1");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [rtn, setRtn] = useState("");
  const [sections, setSections] = useState(defaultSections);
  const [products, setProducts] = useState<
    { id: string; name: string; price: number }[]
  >([
    { id: "p1", name: "Producto ejemplo 1", price: 150 },
    { id: "p2", name: "Producto ejemplo 2", price: 250 },
  ]);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [currency, setCurrency] = useState<"HNL" | "USD">("HNL");
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const invoicePreviewRef = useRef<HTMLDivElement>(null);

  const currencySymbol = currency === "HNL" ? "L." : "$";

  const searchParams = useSearchParams();
  const invoiceId = searchParams.get("id");

  const loadInvoice = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/invoices/${id}`);
      if (response.ok) {
        const data = await response.json();
        setCompanyName(data.companyName);
        setRtn(data.rtn || "");
        setPrimaryColor(data.color);
        setCurrency(data.currency);
        setProducts(
          data.items.map(
            (item: { name: string; price: number; id?: string }) => ({
              id: item.id || Math.random().toString(36).substr(2, 9),
              name: item.name,
              price: item.price,
            })
          )
        );
      }
    } catch (error) {
      console.error("Error loading invoice:", error);
    }
  }, []);

  // Check for local storage user
  useEffect(() => {
    const savedUser = localStorage.getItem("factura_pro_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
      setShowLoginPrompt(false);

      if (invoiceId) {
        loadInvoice(invoiceId);
      }
    }
  }, [invoiceId, loadInvoice]);

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo drag and drop
  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: Math.random().toString(36).substr(2, 9),
        name: "Nuevo Producto",
        price: 0,
      },
    ]);
  };

  const updateProduct = (
    id: string,
    field: "name" | "price",
    value: string | number
  ) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Generate PDF
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);

    try {
      await generateInvoicePDF({
        companyName: companyName || "Tu Empresa",
        rtn: rtn || "0501-XXXX-XXXXXX",
        color: primaryColor,
        currency,
        logo,
        items: products,
        totals: {
          subtotal: products.reduce((sum, p) => sum + p.price, 0),
          isv: products.reduce((sum, p) => sum + p.price, 0) * 0.15,
          total: products.reduce((sum, p) => sum + p.price, 0) * 1.15,
        },
        notes: "Factura generada desde el editor FacturaPro",
        clientInfo: {
          name: "Empresa Cliente S.A.",
          rtn: "0801-XXXX-XXXXXX",
          address: "Honduras",
        },
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Save to database
  const handleSaveInvoice = async () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }

    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const response = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id || "demo-user",
          templateId: "default",
          color: primaryColor,
          currency,
          companyName: companyName || "Sin Nombre",
          clientInfo: { name: "Cliente Genérico" }, // Simplified for now
          items: products,
          totals: {
            subtotal: products.reduce((sum, p) => sum + p.price, 0),
            isv: products.reduce((sum, p) => sum + p.price, 0) * 0.15,
            total: products.reduce((sum, p) => sum + p.price, 0) * 1.15,
          },
          notes: "Factura generada desde el editor",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (error) {
      console.error("Save error:", error);
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  // Section drag handlers
  const handleSectionDragStart = (id: string) => {
    setDraggedSection(id);
  };

  const handleSectionDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedSection || draggedSection === targetId) {
      return;
    }

    const oldIndex = sections.findIndex((s) => s.id === draggedSection);
    const newIndex = sections.findIndex((s) => s.id === targetId);

    const newSections = [...sections];
    const [removed] = newSections.splice(oldIndex, 1);
    newSections.splice(newIndex, 0, removed);
    setSections(newSections);
  };

  const handleSectionDragEnd = () => {
    setDraggedSection(null);
  };

  const toggleSection = (id: string) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  // Login prompt
  if (showLoginPrompt && !isLoggedIn) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="pt-28 pb-20">
          <div className="container mx-auto max-w-md px-6">
            <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-lg">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h1 className="mb-3 font-bold text-2xl text-foreground">
                Inicia sesión para continuar
              </h1>
              <p className="mb-6 text-muted-foreground">
                Para guardar tus plantillas y acceder a funciones avanzadas,
                necesitas una cuenta de FacturaPro.
              </p>

              <div className="space-y-3">
                <Link
                  className="gradient-bg flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white transition-opacity hover:opacity-90"
                  href="/login"
                >
                  Iniciar sesión
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-muted py-3 font-medium text-foreground transition-colors hover:bg-muted/80"
                  href="/registro"
                >
                  Crear cuenta gratis
                </Link>
              </div>

              <div className="mt-6 border-border border-t pt-6">
                <button
                  className="text-muted-foreground text-sm transition-colors hover:text-primary"
                  onClick={() => {
                    setShowLoginPrompt(false);
                    setIsLoggedIn(true);
                    setUser({
                      id: "demo-user",
                      name: "Demo User",
                      email: "demo@facturapro.hn",
                    });
                  }}
                  type="button"
                >
                  Continuar como demo →
                </button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-10 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-medium text-primary text-sm">
                <User className="h-4 w-4" />
                {user?.email || "Modo Edición"}
              </div>
              <h1 className="mb-3 font-bold text-3xl text-foreground">
                Tu Editor Personalizado
              </h1>
              <p className="text-muted-foreground">
                Define el estilo único de tu negocio. Sube tu logo, ajusta
                colores y reordena secciones.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Left: Editor */}
              <div className="space-y-6">
                {/* Logo Upload */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                      <ImageIcon className="h-4 w-4 text-indigo-600" />
                    </div>
                    Logo de tu marca
                  </h3>

                  {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Drag and drop region is appropriate here */}
                  <section
                    aria-label="Zona de carga de logo"
                    className={`relative rounded-xl border-2 border-dashed p-8 transition-all ${
                      logo
                        ? "border-primary/40 bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={handleLogoDrop}
                  >
                    <label className="cursor-pointer">
                      <input
                        accept="image/*"
                        className="hidden"
                        onChange={handleLogoUpload}
                        ref={fileInputRef}
                        type="file"
                      />
                      {logo ? (
                        <div className="flex items-center gap-5">
                          <div className="relative h-24 w-24">
                            <Image
                              alt="Logo de la empresa"
                              className="rounded-xl bg-white object-contain p-2 shadow-sm"
                              fill
                              src={
                                logo ||
                                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                              }
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-foreground text-sm">
                              Logo cargado
                            </p>
                            <p className="text-muted-foreground text-xs">
                              Suéltalo aquí para reemplazarlo
                            </p>
                          </div>
                          <button
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500 transition-colors hover:bg-red-100"
                            onClick={(e) => {
                              e.preventDefault();
                              setLogo(null);
                            }}
                            type="button"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                            <Upload className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <p className="mb-1 font-semibold text-foreground text-sm">
                            Elige tu mejor logo
                          </p>
                          <p className="mb-4 text-muted-foreground text-xs">
                            PNG, JPG o SVG (máximo 2MB)
                          </p>
                          <div className="inline-block rounded-xl bg-primary px-6 py-2.5 font-bold text-sm text-white shadow-md transition-all hover:translate-y-[-1px]">
                            Cargar Archivo
                          </div>
                        </div>
                      )}
                    </label>
                  </section>
                </div>

                {/* Company & RTN */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-foreground">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                      <Building2 className="h-4 w-4 text-blue-600" />
                    </div>
                    Datos de la Empresa
                  </h3>
                  <div className="grid gap-4">
                    <div>
                      <label
                        className="mb-1.5 block font-bold text-muted-foreground text-xs uppercase tracking-wider"
                        htmlFor="company-name-input"
                      >
                        Nombre del negocio
                      </label>
                      <input
                        className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                        id="company-name-input"
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Ej: Inversiones Globales S.A."
                        type="text"
                        value={companyName}
                      />
                    </div>
                    <div>
                      <label
                        className="mb-1.5 block font-bold text-muted-foreground text-xs uppercase tracking-wider"
                        htmlFor="rtn-input"
                      >
                        RTN (Opcional)
                      </label>
                      <input
                        className="w-full rounded-xl border border-border bg-muted/50 px-4 py-3 text-foreground outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10"
                        id="rtn-input"
                        onChange={(e) => setRtn(e.target.value)}
                        placeholder="0501-XXXX-XXXXXX"
                        type="text"
                        value={rtn}
                      />
                    </div>
                  </div>
                </div>

                {/* Color & Currency */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 font-bold text-foreground">
                      <Pipette className="h-4 w-4 text-violet-500" />
                      Identidad
                    </h3>
                    <div className="relative">
                      <button
                        className="flex w-full items-center gap-3 rounded-xl border border-border bg-muted/50 p-2 transition-all hover:border-primary/50"
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        type="button"
                      >
                        <div
                          className="h-10 w-10 rounded-lg border border-white/20 shadow-inner"
                          style={{ backgroundColor: primaryColor }}
                        />
                        <span className="font-bold font-mono text-foreground text-sm uppercase">
                          {primaryColor}
                        </span>
                      </button>
                      {showColorPicker && (
                        <ColorPicker
                          color={primaryColor}
                          onChange={setPrimaryColor}
                          onClose={() => setShowColorPicker(false)}
                        />
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                    <h3 className="mb-4 flex items-center gap-2 font-bold text-foreground">
                      <DollarSign className="h-4 w-4 text-emerald-500" />
                      Moneda
                    </h3>
                    <div className="flex gap-1 rounded-xl border border-border bg-muted/50 p-1">
                      <button
                        className={`flex-1 rounded-lg px-3 py-2 font-bold text-xs transition-all ${
                          currency === "HNL"
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-muted-foreground hover:bg-white/50"
                        }`}
                        onClick={() => setCurrency("HNL")}
                        type="button"
                      >
                        LEMPIRAS
                      </button>
                      <button
                        className={`flex-1 rounded-lg px-3 py-2 font-bold text-xs transition-all ${
                          currency === "USD"
                            ? "bg-white text-indigo-600 shadow-sm"
                            : "text-muted-foreground hover:bg-white/50"
                        }`}
                        onClick={() => setCurrency("USD")}
                        type="button"
                      >
                        DÓLARES
                      </button>
                    </div>
                  </div>
                </div>

                {/* Products Editor */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-bold text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
                        <List className="h-4 w-4 text-amber-600" />
                      </div>
                      Items en Factura
                    </h3>
                    <button
                      className="rounded-lg bg-primary/10 p-2 text-primary transition-colors hover:bg-primary/20"
                      onClick={addProduct}
                      title="Agregar producto"
                      type="button"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {products.map((p) => (
                      <div className="flex items-center gap-2" key={p.id}>
                        <input
                          className="flex-1 rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm"
                          onChange={(e) =>
                            updateProduct(p.id, "name", e.target.value)
                          }
                          type="text"
                          value={p.name}
                        />
                        <div className="relative w-28">
                          <span className="absolute top-1/2 left-2 -translate-y-1/2 text-muted-foreground text-xs">
                            {currencySymbol}
                          </span>
                          <input
                            className="w-full rounded-lg border border-border bg-muted/30 py-2 pr-2 pl-6 text-sm"
                            onChange={(e) =>
                              updateProduct(
                                p.id,
                                "price",
                                Number.parseFloat(e.target.value) || 0
                              )
                            }
                            type="number"
                            value={p.price}
                          />
                        </div>
                        <button
                          className="p-2 text-muted-foreground hover:text-red-500"
                          onClick={() => removeProduct(p.id)}
                          type="button"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section Ordering */}
                <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <h3 className="mb-4 flex items-center gap-2 font-bold text-foreground">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    Estructura
                  </h3>

                  <ul className="grid gap-2">
                    {sections.map((section) => (
                      // biome-ignore lint/a11y/noNoninteractiveElementInteractions: Sortable list item
                      <li
                        className={`flex cursor-move items-center gap-4 rounded-xl border p-4 transition-all ${
                          section.enabled
                            ? "group border-border bg-muted/50 shadow-sm hover:border-primary/30"
                            : "border-border/50 border-dotted bg-muted/20 opacity-40"
                        } ${draggedSection === section.id ? "scale-[1.01] bg-white ring-4 ring-primary/20" : ""}`}
                        draggable
                        key={section.id}
                        onDragEnd={handleSectionDragEnd}
                        onDragOver={(e) => handleSectionDragOver(e, section.id)}
                        onDragStart={() => handleSectionDragStart(section.id)}
                      >
                        <GripVertical className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between">
                            <span className="font-bold text-foreground text-sm">
                              {section.name}
                            </span>
                            <button
                              className={`flex h-6 w-6 items-center justify-center rounded-lg transition-all ${
                                section.enabled
                                  ? "bg-indigo-500 text-white"
                                  : "bg-muted text-muted-foreground"
                              }`}
                              onClick={() => toggleSection(section.id)}
                              type="button"
                            >
                              {section.enabled ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <Plus className="h-3 w-3" />
                              )}
                            </button>
                          </div>
                          <p className="font-medium text-[10px] text-muted-foreground uppercase tracking-widest">
                            {section.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right: Preview */}
              <div className="h-fit lg:sticky lg:top-28">
                <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl">
                  <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />

                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 font-bold text-foreground">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100">
                        <Eye className="h-4 w-4 text-emerald-600" />
                      </div>
                      Preview Final
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                      <span className="font-bold text-[10px] text-emerald-600 uppercase tracking-tighter">
                        Live Update
                      </span>
                    </div>
                  </div>

                  {/* Invoice Preview */}
                  <div
                    className="flex min-h-[500px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
                    ref={invoicePreviewRef}
                  >
                    {sections
                      .filter((s) => s.enabled)
                      .map((section) => {
                        switch (section.id) {
                          case "header":
                            return (
                              <div
                                className="p-6 text-white"
                                key={section.id}
                                style={{ backgroundColor: primaryColor }}
                              >
                                <div className="flex items-center gap-4">
                                  {logo ? (
                                    <div className="relative h-16 w-16">
                                      <Image
                                        alt="Logo de la empresa"
                                        className="rounded-xl bg-white object-contain p-2 shadow-inner"
                                        fill
                                        src={
                                          logo ||
                                          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                        }
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/30 bg-white/20 backdrop-blur-md">
                                      <Building2 className="h-8 w-8 text-white/70" />
                                    </div>
                                  )}
                                  <div>
                                    <div className="font-black text-xl uppercase tracking-tight">
                                      {companyName || "Tu Empresa"}
                                    </div>
                                    <div className="font-bold text-xs opacity-80">
                                      {rtn || "RTN: 0501-XXXX-XXXXXX"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          case "client":
                            return (
                              <div
                                className="border-gray-100 border-b bg-gray-50/50 p-6"
                                key={section.id}
                              >
                                <div className="mb-3 font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                  Información del Cliente
                                </div>
                                <div className="space-y-1">
                                  <div className="font-bold text-base text-gray-900">
                                    Empresa Cliente S.A. de C.V.
                                  </div>
                                  <div className="font-medium text-gray-500 text-xs">
                                    RTN: 0801-1990-234567
                                  </div>
                                  <div className="text-gray-500 text-xs">
                                    Tegucigalpa, Honduras
                                  </div>
                                </div>
                              </div>
                            );
                          case "items":
                            return (
                              <div className="flex-1 p-6" key={section.id}>
                                <div className="mb-4 grid grid-cols-4 items-center border-gray-100 border-b-2 pb-2">
                                  <div className="col-span-2 font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                    Descripción
                                  </div>
                                  <div className="text-right font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                    Cant.
                                  </div>
                                  <div className="text-right font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                    Precio
                                  </div>
                                </div>
                                <div className="space-y-4">
                                  {products.map((p, i) => (
                                    <div
                                      className="group grid grid-cols-4 items-center"
                                      key={p.id}
                                    >
                                      <div className="col-span-2">
                                        <div className="truncate font-bold text-gray-900 text-sm">
                                          {p.name}
                                        </div>
                                        <div className="text-[10px] text-gray-400">
                                          ID: PRD-00{i + 1}
                                        </div>
                                      </div>
                                      <div className="text-right font-bold text-gray-600 text-sm">
                                        1
                                      </div>
                                      <div className="text-right font-bold text-gray-900 text-sm">
                                        {currencySymbol}
                                        {p.price.toFixed(2)}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          case "totals": {
                            const total = products.reduce(
                              (sum, p) => sum + p.price,
                              0
                            );
                            const isv = total * 0.15;
                            return (
                              <div
                                className="mt-auto border-gray-100 border-t bg-gray-50 p-6"
                                key={section.id}
                              >
                                <div className="ml-auto max-w-[200px] space-y-2">
                                  <div className="flex justify-between font-bold text-gray-500 text-xs">
                                    <span>Subtotal</span>
                                    <span>
                                      {currencySymbol}
                                      {total.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between font-bold text-gray-500 text-xs">
                                    <span>ISV (15%)</span>
                                    <span>
                                      {currencySymbol}
                                      {isv.toFixed(2)}
                                    </span>
                                  </div>
                                  <div className="flex justify-between border-gray-200 border-t pt-2 font-black text-gray-900 text-lg">
                                    <span className="self-center text-xs">
                                      TOTAL
                                    </span>
                                    <span style={{ color: primaryColor }}>
                                      {currencySymbol}
                                      {(total + isv).toFixed(2)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          case "notes":
                            return (
                              <div
                                className="border-gray-100 border-t bg-white p-6 italic"
                                key={section.id}
                              >
                                <p className="mb-1 font-black text-[10px] text-gray-400 uppercase tracking-widest">
                                  Términos y Condiciones
                                </p>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                  Esta factura vence a los 30 días de la fecha
                                  de emisión. Favor realizar el pago mediante
                                  transferencia bancaria.
                                </p>
                              </div>
                            );
                          case "qr":
                            return (
                              <div
                                className="flex flex-col items-center bg-white p-6"
                                key={section.id}
                              >
                                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-gray-200 border-dotted bg-gray-50 p-2">
                                  <QrCode className="h-16 w-16 text-gray-300" />
                                </div>
                                <span className="mt-2 font-bold text-[8px] text-gray-300 uppercase tracking-widest underline decoration-dotted">
                                  Validado por SAR
                                </span>
                              </div>
                            );
                          default:
                            return null;
                        }
                      })}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col gap-3">
                  <div className="flex gap-3">
                    <button
                      className="flex flex-1 items-center justify-center gap-2 rounded-2xl border-2 border-border bg-white py-4 font-bold text-foreground shadow-sm transition-all hover:bg-muted disabled:opacity-50 dark:bg-slate-900 dark:hover:bg-slate-800"
                      disabled={isGeneratingPDF}
                      onClick={handleDownloadPDF}
                      type="button"
                    >
                      {isGeneratingPDF ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Download className="h-5 w-5 text-primary" />
                      )}
                      <span>DESCARGAR PDF</span>
                    </button>

                    <button
                      className={`flex flex-1 items-center justify-center gap-2 rounded-2xl py-4 font-bold shadow-lg transition-all ${
                        saveStatus === "success"
                          ? "bg-emerald-500 text-white"
                          : "gradient-bg text-white hover:opacity-90 active:scale-[0.98]"
                      }`}
                      disabled={isSaving}
                      onClick={handleSaveInvoice}
                      type="button"
                    >
                      {isSaving ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          {saveStatus === "success" ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <Save className="h-5 w-5" />
                          )}
                          <span>
                            {saveStatus === "success"
                              ? "GUARDADO!"
                              : "GUARDAR DISEÑO"}
                          </span>
                        </>
                      )}
                    </button>
                  </div>

                  {saveStatus === "error" && (
                    <p className="text-center font-bold text-red-500 text-xs">
                      Ocurrió un error al guardar. Revisa tu conexión.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
