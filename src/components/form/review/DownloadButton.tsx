
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
      
      // Open PDF in a new tab/window instead of downloading directly
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <iframe width="100%" height="100%" src="${pdfDataUri}"></iframe>
        `);
        // Add title to the new window
        const fileName = `Bliss-${formData.fullName.replace(/\s+/g, '')}.pdf`;
        newWindow.document.title = fileName;
        
        // Create download link in the new window
        const downloadDiv = document.createElement('div');
        downloadDiv.style.position = 'fixed';
        downloadDiv.style.top = '10px';
        downloadDiv.style.right = '10px';
        downloadDiv.style.zIndex = '1000';
        downloadDiv.innerHTML = `
          <a href="${pdfDataUri}" download="${fileName}" 
             style="padding: 10px 15px; background-color: #8b7256; color: white; 
                    text-decoration: none; border-radius: 5px; font-family: Arial; 
                    display: inline-block;">
            Download PDF
          </a>
        `;
        
        newWindow.document.body.appendChild(downloadDiv);
      } else {
        // Fallback if popup is blocked
        const link = document.createElement('a');
        link.href = pdfDataUri;
        link.download = `Bliss-${formData.fullName.replace(/\s+/g, '')}.pdf`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
        }, 100);
      }

      toast({
        title: "PDF Opened",
        description: "Your invitation details have been opened in a new window.",
      });
    } catch (err) {
      console.error("PDF download error:", err);
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
