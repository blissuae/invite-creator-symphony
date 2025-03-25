
import { useEffect, useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, PenLine, MousePointerClick, Calendar } from "lucide-react";

export const IntroPopup = () => {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenFormIntroPopup");
    if (!hasSeenPopup) {
      // Add a small delay for better UX - let the form render first
      const timer = setTimeout(() => {
        setOpen(true);
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleClose = () => {
    localStorage.setItem("hasSeenFormIntroPopup", "true");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md border-elegant-secondary/30 shadow-lg bg-gradient-to-b from-white to-elegant-beige/30">
        <DialogHeader className="text-center">
          <div className="mx-auto w-14 h-14 bg-elegant-beige/50 rounded-full flex items-center justify-center mb-4">
            <PenLine className="h-7 w-7 text-elegant-brown" />
          </div>
          <DialogTitle className="text-xl font-serif text-elegant-brown">Welcome to Your Invitation Journey</DialogTitle>
          <DialogDescription className="text-elegant-secondary pt-2">
            We're excited to create your perfect invitation
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 bg-green-100 rounded-full p-1">
                <Check className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-elegant-brown">Fill in what you know</h3>
                <p className="text-sm text-gray-500">
                  Don't worry about providing all details now. You can fill in what you have and add more later.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-0.5 bg-purple-100 rounded-full p-1">
                <MousePointerClick className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-elegant-brown">Easily navigate steps</h3>
                <p className="text-sm text-gray-500">
                  Use the progress bar at the top to jump to any section you'd like to work on.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="mt-0.5 bg-blue-100 rounded-full p-1">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-elegant-brown">Content and style can wait</h3>
                <p className="text-sm text-gray-500">
                  Not sure about content, colors, or animation styles yet? You can decide these later.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleClose}
            className="bg-elegant-brown hover:bg-elegant-brown/90 text-white rounded-lg px-8"
          >
            Let's Begin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
