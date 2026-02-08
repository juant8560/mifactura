import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface InvoiceData {
  companyName: string;
  rtn?: string;
  color: string;
  currency: "HNL" | "USD";
  logo?: string | null;
  items: { name: string; price: number }[];
  totals: {
    subtotal: number;
    isv: number;
    total: number;
  };
  notes?: string;
  clientInfo?: {
    name?: string;
    rtn?: string;
    address?: string;
  };
  createdAt?: string;
}

export const generateInvoicePDF = async (data: InvoiceData) => {
  const currencySymbol = data.currency === "HNL" ? "L." : "$";

  // Create a container for the PDF content
  const container = document.createElement("div");
  container.style.position = "fixed";
  container.style.left = "-9999px";
  container.style.top = "0";
  container.style.width = "800px"; // Fixed width for consistent rendering
  container.style.backgroundColor = "#ffffff";
  container.style.color = "#000000";
  container.style.fontFamily = "sans-serif";

  // Build the invoice HTML
  container.innerHTML = `
    <div style="padding: 40px; min-h-screen; display: flex; flex-direction: column;">
      <!-- Header -->
      <div style="background-color: ${data.color}; color: #ffffff; padding: 30px; margin: -40px -40px 30px -40px; display: flex; align-items: center; gap: 20px;">
        ${data.logo ? `<img src="${data.logo}" style="width: 80px; height: 80px; object-fit: contain; background: white; padding: 10px; border-radius: 12px;" />` : `<div style="width: 80px; height: 80px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center;"><span style="font-size: 40px;">🏢</span></div>`}
        <div>
          <h1 style="margin: 0; font-size: 28px; text-transform: uppercase;">${data.companyName || "FACTURAPRO"}</h1>
          <p style="margin: 5px 0 0; opacity: 0.9; font-weight: bold;">RTN: ${data.rtn || "0501-XXXX-XXXXXX"}</p>
        </div>
      </div>

      <!-- Client Info -->
      <div style="margin-bottom: 30px; padding: 20px; background: #f8fafc; border-radius: 12px;">
        <p style="margin: 0 0 10px; font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Información del Cliente</p>
        <p style="margin: 0; font-size: 18px; font-weight: bold;">${data.clientInfo?.name || "Empresa Cliente S.A."}</p>
        <p style="margin: 5px 0; font-size: 14px; color: #64748b;">RTN: ${data.clientInfo?.rtn || "0801-XXXX-XXXXXX"}</p>
        <p style="margin: 0; font-size: 14px; color: #64748b;">${data.clientInfo?.address || "Honduras"}</p>
      </div>

      <!-- Items Table -->
      <div style="flex: 1; margin-bottom: 30px;">
        <div style="display: flex; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 15px;">
          <div style="flex: 3; font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase;">Descripción</div>
          <div style="flex: 1; font-size: 10px; font-weight: 900; color: #64748b; text-transform: uppercase; text-align: right;">Precio</div>
        </div>
        ${data.items
          .map(
            (item, idx) => `
          <div style="display: flex; margin-bottom: 15px; align-items: center;">
            <div style="flex: 3;">
              <p style="margin: 0; font-weight: bold; font-size: 14px;">${item.name}</p>
              <p style="margin: 0; font-size: 10px; color: #94a3b8;">ID: PRD-00${idx + 1}</p>
            </div>
            <div style="flex: 1; text-align: right; font-weight: bold; font-size: 14px;">
              ${currencySymbol}${item.price.toFixed(2)}
            </div>
          </div>
        `
          )
          .join("")}
      </div>

      <!-- Totals -->
      <div style="margin-top: auto; border-top: 2px solid #e2e8f0; padding-top: 20px; display: flex; justify-content: flex-end;">
        <div style="width: 250px;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #64748b; font-weight: bold;">
            <span>Subtotal</span>
            <span>${currencySymbol}${data.totals.subtotal.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #64748b; font-weight: bold;">
            <span>ISV (15%)</span>
            <span>${currencySymbol}${data.totals.isv.toFixed(2)}</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding-top: 10px; border-top: 1px solid #e2e8f0;">
            <span style="font-size: 12px; font-weight: bold; align-self: center;">TOTAL</span>
            <span style="font-size: 24px; font-weight: 900; color: ${data.color};">${currencySymbol}${(data.totals.total || data.totals.subtotal * 1.15).toFixed(2)}</span>
          </div>
        </div>
      </div>

      <!-- Notes -->
      ${
        data.notes
          ? `
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-style: italic;">
          <p style="margin: 0 0 5px; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase;">Notas</p>
          <p style="margin: 0; font-size: 12px; color: #64748b; line-height: 1.5;">${data.notes}</p>
        </div>
      `
          : ""
      }
    </div>
  `;

  document.body.appendChild(container);

  try {
    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(
      `factura-${data.companyName.replace(/\s+/g, "-").toLowerCase() || "pro"}.pdf`
    );
  } catch (error) {
    console.error("PDF generation failed:", error);
  } finally {
    document.body.removeChild(container);
  }
};
