"use client";

import {
  ArrowRight,
  Calendar,
  Clock,
  DollarSign,
  Download,
  Edit,
  FileText,
  Loader2,
  Plus,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { generateInvoicePDF } from "@/lib/utils/pdf";

interface Invoice {
  id: string;
  userId: string;
  templateId: string;
  color: string;
  currency: "HNL" | "USD";
  companyName: string;
  rtn?: string | null;
  clientInfo: Record<string, unknown>;
  items: { name: string; price: number }[];
  totals: {
    subtotal: number;
    isv: number;
    total: number;
  };
  notes?: string | null;
  createdAt: string | Date;
}

export default function DashboardPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const fetchInvoices = useCallback(async (userId: string) => {
    try {
      const response = await fetch(`/api/invoices?userId=${userId}`);
      if (response.ok) {
        const data = await response.json();
        setInvoices(data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedUser = localStorage.getItem("factura_pro_user");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      fetchInvoices(parsedUser.id);
    } else {
      window.location.href = "/login";
    }
  }, [fetchInvoices]);

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAmount = invoices.reduce(
    (sum, inv) => sum + (inv.totals?.total || 0),
    0
  );

  const handleDownload = async (inv: Invoice) => {
    setDownloadingId(inv.id);
    try {
      await generateInvoicePDF({
        companyName: inv.companyName,
        rtn: inv.rtn || "",
        color: inv.color,
        currency: inv.currency,
        items: inv.items,
        totals: inv.totals,
        notes: inv.notes || "",
        clientInfo: inv.clientInfo,
      });
    } catch (error) {
      console.error("Download failed:", error);
      console.error("Download failed:", error);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h1 className="mb-2 font-bold text-3xl text-foreground">
                  Panel de Control
                </h1>
                <p className="font-medium text-muted-foreground">
                  Gestiona tus facturas y diseños guardados.
                </p>
              </div>
              <Link
                className="gradient-bg flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-[0.98]"
                href="/crear-plantilla"
              >
                <Plus className="h-5 w-5" />
                NUEVA FACTURA
              </Link>
            </div>

            {/* Stats */}
            <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100">
                    <FileText className="h-6 w-6 text-indigo-600" />
                  </div>
                  <span className="font-bold text-muted-foreground text-sm uppercase tracking-widest">
                    Facturas
                  </span>
                </div>
                <div className="font-black text-3xl text-foreground">
                  {invoices.length}
                </div>
                <div className="mt-2 font-bold text-emerald-500 text-xs">
                  +12% este mes
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                    <DollarSign className="h-6 w-6 text-emerald-600" />
                  </div>
                  <span className="font-bold text-muted-foreground text-sm uppercase tracking-widest">
                    Total Vendido
                  </span>
                </div>
                <div className="font-black text-3xl text-foreground">
                  L.{totalAmount.toLocaleString()}
                </div>
                <div className="mt-2 font-bold text-emerald-500 text-xs">
                  Valores simulados
                </div>
              </div>

              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100">
                    <Clock className="h-6 w-6 text-amber-600" />
                  </div>
                  <span className="font-bold text-muted-foreground text-sm uppercase tracking-widest">
                    Pendientes
                  </span>
                </div>
                <div className="font-black text-3xl text-foreground">0</div>
                <div className="mt-2 font-bold text-muted-foreground text-xs">
                  Todo al día
                </div>
              </div>
            </div>

            {/* List Section */}
            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              <div className="flex flex-col justify-between gap-4 border-border border-b p-6 md:flex-row md:items-center">
                <h2 className="flex items-center gap-2 font-bold text-foreground text-lg">
                  Historial de Invoices
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground uppercase tracking-tighter">
                    {filteredInvoices.length} TOTAL
                  </span>
                </h2>

                <div className="relative max-w-md flex-1">
                  <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    className="w-full rounded-xl border border-border bg-muted/50 py-2.5 pr-4 pl-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por cliente o ID..."
                    type="text"
                    value={searchTerm}
                  />
                </div>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center p-20">
                  <Loader2 className="mb-4 h-10 w-10 animate-spin text-primary" />
                  <p className="font-medium text-muted-foreground">
                    Cargando tus facturas...
                  </p>
                </div>
              ) : (
                <div className="w-full">
                  {filteredInvoices.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="bg-muted/30">
                            <th className="px-6 py-4 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                              ID Factura
                            </th>
                            <th className="px-6 py-4 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                              Cliente / Negocio
                            </th>
                            <th className="px-6 py-4 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                              Fecha
                            </th>
                            <th className="px-6 py-4 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                              Total
                            </th>
                            <th className="px-6 py-4 text-right font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                              Acciones
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/50">
                          {filteredInvoices.map((inv) => (
                            <tr
                              className="group transition-colors hover:bg-muted/20"
                              key={inv.id}
                            >
                              <td className="px-6 py-4">
                                <span className="rounded-lg bg-primary/5 px-2 py-1 font-bold font-mono text-primary text-xs">
                                  #{inv.id.slice(0, 8)}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-bold text-foreground text-sm">
                                  {inv.companyName}
                                </div>
                                <div className="text-[10px] text-muted-foreground uppercase">
                                  {inv.currency}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs">
                                  <Calendar className="h-3 w-3" />
                                  {new Date(inv.createdAt).toLocaleDateString()}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-black text-foreground text-sm">
                                  {inv.currency === "HNL" ? "L." : "$"}
                                  {inv.totals?.total?.toLocaleString() ||
                                    "0.00"}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Link
                                    className="rounded-lg border border-transparent p-2 text-indigo-500 transition-all hover:border-border hover:bg-white hover:shadow-md dark:hover:bg-slate-800"
                                    href={`/crear-plantilla?id=${inv.id}`}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Link>
                                  <button
                                    className="rounded-lg border border-transparent p-2 text-emerald-500 transition-all hover:border-border hover:bg-white hover:shadow-md disabled:opacity-50 dark:hover:bg-slate-800"
                                    disabled={downloadingId === inv.id}
                                    onClick={() => handleDownload(inv)}
                                    type="button"
                                  >
                                    {downloadingId === inv.id ? (
                                      <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                      <Download className="h-4 w-4" />
                                    )}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="p-20 text-center">
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <FileText className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h3 className="mb-2 font-bold text-foreground text-lg">
                        {searchTerm
                          ? "No se encontraron facturas"
                          : "No hay facturas aún"}
                      </h3>
                      <p className="mb-6 text-muted-foreground transition-colors">
                        {searchTerm
                          ? "Intenta con otra búsqueda"
                          : "Comienza creando tu primera factura profesional hoy mismo."}
                      </p>
                      {!searchTerm && (
                        <Link
                          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-white shadow-md transition-all hover:translate-y-[-2px]"
                          href="/crear-plantilla"
                        >
                          Crear Factura
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
