
import { useEffect, useState, useCallback } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, MousePointerClick, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useInterval } from "@/hooks/use-interval";

export const IntroPopup = () => {
  const [open, setOpen] = useState(false);
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  
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

  // Auto-scroll functionality
  useInterval(() => {
    if (api && open) {
      api.scrollNext();
    }
  }, 3000);

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  const steps = [
    {
      icon: <Check className="h-4 w-4 text-green-600" />,
      color: "bg-green-100",
      title: "Fill in what you know",
      description: "Don't worry about providing all details now. You can fill in what you have and add more later."
    },
    {
      icon: <MousePointerClick className="h-4 w-4 text-purple-600" />,
      color: "bg-purple-100",
      title: "Easily navigate steps",
      description: "Use the progress bar at the top to jump to any section you'd like to work on."
    },
    {
      icon: <Calendar className="h-4 w-4 text-blue-600" />,
      color: "bg-blue-100",
      title: "Content and style can wait",
      description: "Not sure about content, colors, or animation styles yet? You can decide these later."
    }
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg border-elegant-secondary/30 shadow-lg bg-gradient-to-b from-white to-elegant-beige/30 px-8 sm:px-10">
        <DialogHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-elegant-beige/50 rounded-full flex items-center justify-center mb-4">
            {/* Bliss logo */}
            <img 
              src="/lovable-uploads/f566f022-debc-49f9-85e0-e54a4d70cfbd.png" 
              alt="Bliss" 
              className="h-14 w-14 object-contain"
            />
          </div>
          <DialogDescription className="text-elegant-secondary pt-2 text-center">
            Yayy! We're super excited to craft a magical invitation for your special occasion 💛✨
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 px-4">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent>
              {steps.map((step, index) => (
                <CarouselItem key={index} className="pt-2 pb-6">
                  <div className="flex flex-col items-center text-center">
                    <div className={`mb-4 ${step.color} rounded-full p-3`}>
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-medium text-elegant-brown mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-500 max-w-[240px] mx-auto">
                      {step.description}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex items-center justify-center gap-2 mt-4">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1.5 rounded-full transition-all ${
                    current === index ? "w-6 bg-elegant-brown" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>
            
            <CarouselPrevious className="left-0 border-elegant-secondary/20" />
            <CarouselNext className="right-0 border-elegant-secondary/20" />
          </Carousel>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleClose}
            className="bg-elegant-brown hover:bg-elegant-brown/90 text-white rounded-lg px-8 py-2.5"
          >
            Let's Begin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
