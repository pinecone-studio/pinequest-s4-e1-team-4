import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { toast } from "sonner";

const A4_WIDTH_MM = 210;

function elementSize(element: HTMLElement) {
  const rect = element.getBoundingClientRect();

  return {
    height: Math.ceil(Math.max(rect.height, element.scrollHeight)),
    width: Math.ceil(Math.max(rect.width, element.scrollWidth)),
  };
}

export async function generatePdfFromElement(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  try {
    const { height, width } = elementSize(element);
    const dataUrl = await toPng(element, {
      backgroundColor: "#ffffff",
      cacheBust: true,
      height,
      pixelRatio: 2,
      quality: 0.95,
      style: {
        margin: "0",
        maxHeight: "none",
        maxWidth: "none",
        transform: "none",
      },
      width,
    });

    const img = new Image();
    const imageLoaded = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to generate PDF image"));
    });

    img.src = dataUrl;
    await imageLoaded;

    const imgAspectRatio = img.width / img.height;
    const pdfWidth = A4_WIDTH_MM;
    const pdfHeight = pdfWidth / imgAspectRatio;
    const pdf = new jsPDF({
      format: [pdfWidth, pdfHeight],
      orientation: pdfWidth >= pdfHeight ? "l" : "p",
      unit: "mm",
    });

    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
    toast.success("PDF downloaded successfully");
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "PDF generation failed",
    );
  }
}
