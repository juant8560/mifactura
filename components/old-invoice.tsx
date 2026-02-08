export function OldInvoice() {
  return (
    <div className="relative w-72 rotate-[-2deg] overflow-hidden rounded-sm border-2 border-amber-200 bg-amber-50 p-6 shadow-lg">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Coffee stain */}
      <div className="absolute top-4 right-4 h-16 w-16 rounded-full bg-amber-200/50 blur-sm" />

      <div className="relative">
        {/* Header - poor typography */}
        <div className="mb-4 border-amber-400 border-b-2 border-dashed pb-4 text-center">
          <div className="font-mono text-amber-800 text-sm tracking-widest">
            - - - FACTURA - - -
          </div>
          <div className="mt-1 font-mono text-amber-700 text-xs">
            No. 000847
          </div>
        </div>

        {/* Company info - misaligned */}
        <div className="mb-4 space-y-0.5 font-mono text-amber-900 text-xs">
          <div className="ml-2">TIENDA EL ECONÓMICO</div>
          <div className="ml-4">Col. Centro, Tegucigalpa</div>
          <div>RTN: 0501-1990-00123</div>
        </div>

        {/* Date - inconsistent */}
        <div className="mb-4 font-mono text-amber-800 text-xs">
          Fecha: 15/ENE/2020
        </div>

        {/* Items - poorly formatted */}
        <div className="mb-4 space-y-1 font-mono text-amber-900 text-xs">
          <div className="flex justify-between">
            <span>1x Producto A..........</span>
            <span>L.150.00</span>
          </div>
          <div className="flex justify-between">
            <span>2x Producto B..........</span>
            <span>L.200.00</span>
          </div>
          <div className="flex justify-between">
            <span>1x Producto C..........</span>
            <span>L.75.00</span>
          </div>
        </div>

        {/* Divider */}
        <div className="my-2 border-amber-400 border-t border-dashed" />

        {/* Total */}
        <div className="flex justify-between font-bold font-mono text-amber-900 text-sm">
          <span>TOTAL:</span>
          <span>L.425.00</span>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center font-mono text-[10px] text-amber-700">
          * * * GRACIAS POR SU COMPRA * * *
        </div>

        {/* Fake typewriter effect - some characters look faded */}
        <div className="absolute bottom-20 left-6 h-4 w-2 bg-amber-300/30" />
        <div className="absolute top-16 right-12 h-1 w-3 bg-amber-300/40" />
      </div>
    </div>
  );
}
