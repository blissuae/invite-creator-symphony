
import { CheckCircle, Download } from "lucide-react";
import { InviteFormData } from "@/types/invite-form-types";
import { Button } from "@/components/ui/button";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

interface SuccessScreenProps {
  formData: InviteFormData;
}

export const SuccessScreen = ({ formData }: SuccessScreenProps) => {
  const { toast } = useToast();
  
  const downloadPDF = () => {
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
  };

  return (
    <div className="p-8 text-center space-y-6 animate-fadeIn">
      <div className="flex justify-center">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      
      <h2 className="text-2xl font-serif text-elegant-brown">
        Thank You, {formData.fullName}!
      </h2>
      
      <p className="text-gray-600 max-w-md mx-auto">
        Your {formData.occasion === 'Other' ? formData.customOccasion.toLowerCase() : formData.occasion.toLowerCase()} invitation request has been successfully submitted. We'll review your requirements and get back to you soon.
      </p>

      <div className="pt-4">
        <Button 
          onClick={downloadPDF}
          className="bg-[#8b7256] hover:bg-[#8b7256]/90 text-white"
          type="button"
        >
          <Download className="mr-2 h-4 w-4" />
          Download Your Details
        </Button>
      </div>

      <div className="pt-2">
        <p className="text-sm text-gray-500">
          A confirmation email will be sent to you shortly
        </p>
      </div>
    </div>
  );
};
