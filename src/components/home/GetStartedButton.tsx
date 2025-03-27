
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IntroPopup } from "../IntroPopup";

interface GetStartedButtonProps {
  onClick: () => void;
}

export const GetStartedButton = ({ onClick }: GetStartedButtonProps) => {
  const [showIntro, setShowIntro] = useState(false);

  const handleGetStarted = () => {
    // Show intro popup first
    setShowIntro(true);
    
    // After popup is closed, the IntroPopup component will handle 
    // setting the localStorage value via its handleClose method
  };

  return (
    <div className="flex flex-col items-center mb-12 animate-fadeIn">
      <Button 
        onClick={handleGetStarted}
        className="bg-elegant-brown hover:bg-elegant-brown/90 text-white font-serif px-8 py-6 text-lg rounded-xl shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] relative overflow-hidden group"
      >
        <span className="relative z-10">Get Started</span>
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#b8860b]/20 to-transparent animate-pulse"></span>
        <span className="absolute right-2 w-6 h-6 rounded-full bg-white/20 animate-ping"></span>
        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
      </Button>
      
      {showIntro && (
        <IntroPopup 
          forceShow={true} 
          onClose={() => {
            setShowIntro(false);
            onClick(); // Continue with the original onClick action after intro is closed
          }}
        />
      )}
    </div>
  );
};
