
import { InviteFormData } from "@/types/invite-form-types";
import { generatePDF } from "@/utils/pdfGenerator";

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
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a2 2 0 002 2h14a2 2 0 002-2v-3" />
      </svg>
      Download PDF
    </button>
  );
};
