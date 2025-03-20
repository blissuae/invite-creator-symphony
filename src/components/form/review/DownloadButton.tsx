
import { InviteFormData } from "@/types/invite-form-types";
import { generatePDF } from "@/utils/pdfGenerator";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  formData: InviteFormData;
}

export const DownloadButton = ({ formData }: DownloadButtonProps) => {
  const downloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const pdfDataUri = generatePDF(formData);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = pdfDataUri;
    const fileName = `Bliss-${formData.fullName.replace(/\s+/g, '')}.pdf`;
    link.download = fileName;
    
    // Append to the document, click it, and remove it
    document.body.appendChild(link);
    link.click();
    
    // Small delay before removing to ensure the download starts
    setTimeout(() => {
      document.body.removeChild(link);
    }, 100);
    
    return false; // Ensure no further actions occur
  };

  return (
    <button
      onClick={downloadPDF}
      className="px-4 py-2 bg-[#8b7256] text-white rounded-lg hover:bg-[#8b7256]/90 transition-colors flex items-center gap-2"
      type="button" // Explicitly set button type to prevent form submission
    >
      <Download className="h-5 w-5" />
      Download PDF
    </button>
  );
};
