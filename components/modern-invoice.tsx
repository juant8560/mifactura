import { FileText, QrCode } from "lucide-react";

export function ModernInvoice() {
  return (
    <div className="relative w-80 rotate-[2deg] animate-pulse-glow overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl">
      {/* Gradient accent */}
      <div className="gradient-bg absolute top-0 right-0 left-0 h-2" />

      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #7c3aed 1px, transparent 0)",
          backgroundSize: "20px 20px",
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="gradient-bg flex h-10 w-10 items-center justify-center rounded-xl shadow-lg">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">MiFactura</div>
              <div className="text-gray-500 text-xs">Factura Digital</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-gray-500 text-xs">No. Factura</div>
            <div className="font-bold text-primary">#INV-2024-0847</div>
          </div>
        </div>

        {/* Company & Client */}
        <div className="mb-6 grid grid-cols-2 gap-4 text-xs">
          <div>
            <div className="mb-1 text-gray-500">De:</div>
            <div className="font-semibold text-gray-900">
              Tech Store Honduras
            </div>
            <div className="text-gray-600">RTN: 0501-2024-12345</div>
            <div className="text-gray-600">Tegucigalpa, Honduras</div>
          </div>
          <div>
            <div className="mb-1 text-gray-500">Para:</div>
            <div className="font-semibold text-gray-900">Cliente Premium</div>
            <div className="text-gray-600">RTN: 0801-1990-54321</div>
            <div className="text-gray-600">San Pedro Sula</div>
          </div>
        </div>

        {/* Date badge */}
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
          <div className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-medium text-primary text-xs">7 Feb, 2024</span>
        </div>

        {/* Items */}
        <div className="mb-4 rounded-xl bg-gray-50 p-3">
          <div className="mb-2 flex justify-between px-2 font-medium text-gray-500 text-xs">
            <span>Descripción</span>
            <span>Monto</span>
          </div>
          <div className="space-y-2">
            {[
              { name: "Laptop HP ProBook", price: "L.18,500.00" },
              { name: "Mouse Inalámbrico", price: "L.450.00" },
              { name: "Garantía Extendida", price: "L.1,200.00" },
            ].map((item) => (
              <div
                className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm"
                key={item.name}
              >
                <span className="text-gray-700">{item.name}</span>
                <span className="font-semibold text-gray-900">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="space-y-1 border-gray-100 border-t pt-3">
          <div className="flex justify-between text-gray-500 text-xs">
            <span>Subtotal</span>
            <span>L.20,150.00</span>
          </div>
          <div className="flex justify-between text-gray-500 text-xs">
            <span>ISV (15%)</span>
            <span>L.3,022.50</span>
          </div>
          <div className="mt-2 flex justify-between border-gray-200 border-t border-dashed pt-2 font-bold text-base">
            <span className="gradient-text">Total</span>
            <span className="gradient-text">L.23,172.50</span>
          </div>
        </div>

        {/* Footer with QR */}
        <div className="mt-6 flex items-center justify-between border-gray-100 border-t pt-4">
          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-gray-100">
              <QrCode className="h-5 w-5 text-gray-400" />
            </div>
            <span>Escanea para verificar</span>
          </div>
          <div className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700 text-xs">
            ✓ Pagado
          </div>
        </div>
      </div>
    </div>
  );
}
