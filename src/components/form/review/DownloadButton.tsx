
import { InviteFormData } from "@/types/invite-form-types";
import { generatePDF } from "@/utils/pdfGenerator";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DownloadButtonProps {
  formData: InviteFormData;
}

export const DownloadButton = ({ formData }: DownloadButtonProps) => {
  const { toast } = useToast();

  const downloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
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

      toast({
        title: "PDF Downloaded",
        description: "Your invitation details have been saved as a PDF.",
      });
    } catch (err) {
      console.error("PDF generation error:", err);
      toast({
        title: "Download Failed",
        description: "There was a problem generating your PDF. Please try again.",
        variant: "destructive",
      });
    }
    
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
