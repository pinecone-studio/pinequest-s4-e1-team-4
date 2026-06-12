import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";
import { toast } from "sonner";

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const CV_WIDTH_PX = 720;

export async function generatePdfFromElement(
  element: HTMLElement,
  filename: string,
): Promise<void> {
  try {
    const dataUrl = await toPng(element, {
      cacheBust: true,
      pixelRatio: 2,
      width: CV_WIDTH_PX,
      quality: 0.95,
    });

    const img = new Image();
    img.src = dataUrl;

    img.onload = () => {
      const pdf = new jsPDF("p", "mm", "a4");
      const imgAspectRatio = img.width / img.height;
      let pdfWidth = A4_WIDTH_MM - 4;
      let pdfHeight = pdfWidth / imgAspectRatio;

      if (pdfHeight > A4_HEIGHT_MM - 4) {
        pdfHeight = A4_HEIGHT_MM - 4;
        pdfWidth = pdfHeight * imgAspectRatio;
      }

      pdf.addImage(dataUrl, "PNG", 2, 2, pdfWidth, pdfHeight);
      pdf.save(filename);
      toast.success("PDF downloaded successfully");
    };

    img.onerror = () => {
      toast.error("Failed to generate PDF image");
    };
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "PDF generation failed",
    );
  }
}
