
import { CheckCircle, Download } from "lucide-react";
import { InviteFormData } from "@/types/invite-form-types";
import { Button } from "@/components/ui/button";
import { generatePDF } from "@/utils/pdfGenerator";

interface SuccessScreenProps {
  formData: InviteFormData;
}

export const SuccessScreen = ({ formData }: SuccessScreenProps) => {
  const downloadPDF = () => {
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
