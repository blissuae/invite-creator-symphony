
import { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AnimationStyle {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
}

const ANIMATION_STYLES: AnimationStyle[] = [
  {
    id: "matrix",
    title: "Matrix Style",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    description: "Digital, fast-paced, dynamic transitions"
  },
  {
    id: "tech",
    title: "Tech Flow",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80",
    description: "Modern, code-inspired animations"
  },
  {
    id: "minimalist",
    title: "Minimalist",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
    description: "Clean, subtle movements"
  },
  {
    id: "nature",
    title: "Nature Flow",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=800&q=80",
    description: "Organic, smooth transitions"
  },
  {
    id: "glass",
    title: "Glass Effect",
    imageUrl: "https://images.unsplash.com/photo-1439337153520-7082a56a81f4?w=800&q=80",
    description: "Transparent, subtle animations"
  },
  // ... Adding more styles to reach 20
  {
    id: "geometric",
    title: "Geometric",
    imageUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&q=80",
    description: "Shape-based transitions"
  },
  {
    id: "neon",
    title: "Neon Glow",
    imageUrl: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80",
    description: "Vibrant, glowing effects"
  },
  // ... Continue with more styles to reach 20 total
];

export default function AnimationStyles() {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStyleSelection = (styleId: string) => {
    setSelectedStyles((prev) => {
      if (prev.includes(styleId)) {
        return prev.filter((id) => id !== styleId);
      }
      if (prev.length >= 3) {
        toast({
          title: "Selection limit reached",
          description: "You can only select up to 3 styles",
          variant: "destructive",
        });
        return prev;
      }
      return [...prev, styleId];
    });
  };

  const handleContinue = () => {
    if (selectedStyles.length === 0) {
      toast({
        title: "Please select at least one style",
        description: "Choose up to 3 animation styles to continue",
        variant: "destructive",
      });
      return;
    }
    // Store selections and continue to next page
    localStorage.setItem('selectedAnimationStyles', JSON.stringify(selectedStyles));
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-elegant-beige to-white py-12">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl font-serif mb-4 text-elegant-brown">Choose Your Animation Style</h1>
          <p className="text-gray-600 font-serif">Select up to 3 styles that inspire you</p>
          <p className="text-sm text-elegant-brown/70 mt-2">
            {3 - selectedStyles.length} selections remaining
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {ANIMATION_STYLES.map((style) => (
            <div
              key={style.id}
              onClick={() => handleStyleSelection(style.id)}
              className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                selectedStyles.includes(style.id)
                  ? "ring-4 ring-elegant-primary"
                  : "hover:ring-2 hover:ring-elegant-secondary"
              }`}
            >
              <div className="aspect-square relative">
                <img
                  src={style.imageUrl}
                  alt={style.title}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-elegant-primary/20 transition-opacity ${
                  selectedStyles.includes(style.id) ? "opacity-70" : "opacity-0 group-hover:opacity-40"
                }`} />
                {selectedStyles.includes(style.id) && (
                  <div className="absolute top-4 right-4 bg-elegant-primary rounded-full p-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white font-serif mb-1">{style.title}</h3>
                <p className="text-white/80 text-sm">{style.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="font-serif"
          >
            Back
          </Button>
          <Button
            onClick={handleContinue}
            className="bg-elegant-primary hover:bg-elegant-primary/90 text-white font-serif"
            disabled={selectedStyles.length === 0}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
