
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
    id: "style1",
    title: "Swan Lake",
    imageUrl: "public/lovable-uploads/ff818b60-8216-4a6d-a885-091fed76b631.png",
    description: "Serene lake scene with elegant swans and floral elements"
  },
  {
    id: "style2",
    title: "Engagement",
    imageUrl: "public/lovable-uploads/e1b1cf21-4a11-4f37-8d40-3d12bfecf394.png",
    description: "Romantic couple in traditional attire with glowing light effects"
  },
  {
    id: "style3",
    title: "Elegant Arch",
    imageUrl: "public/lovable-uploads/5a57d3c7-f02d-486e-bcb5-6a894cdcc316.png",
    description: "Minimalist arch design with swan motifs and calligraphy"
  },
  {
    id: "style4",
    title: "Lantern Glow",
    imageUrl: "public/lovable-uploads/7cb2b978-f451-48b6-8512-a3b8921ab2a7.png",
    description: "Couple silhouette with floating lanterns against night sky"
  },
  {
    id: "style5",
    title: "Sketch Landscape",
    imageUrl: "public/lovable-uploads/6ec01f16-613f-47df-80b0-221c7d80098c.png",
    description: "Delicate hand-drawn landscape with balloon and butterfly motifs"
  },
  {
    id: "style6",
    title: "Hummingbird",
    imageUrl: "public/lovable-uploads/611211f3-9b04-42fd-a632-92da49cb99be.png",
    description: "Elegant hummingbird and flower illustration with calligraphy"
  },
  {
    id: "style7",
    title: "Wedding Ceremony",
    imageUrl: "public/lovable-uploads/12ba5bc8-98a2-4ca3-b7bc-eb2e763609ad.png",
    description: "Traditional wedding ceremony with soft lighting and particles"
  },
  {
    id: "style8",
    title: "Starry Hands",
    imageUrl: "public/lovable-uploads/7e101b10-542f-48a6-a69b-aa27de3a7948.png",
    description: "Holding hands under a starry night sky with magical elements"
  },
  {
    id: "style9",
    title: "Desert Moon",
    imageUrl: "public/lovable-uploads/559348e5-f742-4d5d-ac43-9ced803a4cba.png",
    description: "Palm trees silhouette with full moon and desert landscape"
  },
  {
    id: "style10",
    title: "Floral Arch",
    imageUrl: "public/lovable-uploads/bc1cf2bf-6d61-4ecf-aa82-eab5ee33dde6.png",
    description: "Couple under a beautiful floral arch with city backdrop"
  },
  {
    id: "style11",
    title: "Elegant Interior",
    imageUrl: "public/lovable-uploads/11485946-22a3-44d2-8312-7607215dd4c4.png",
    description: "Sophisticated interior with antique furniture and dove"
  },
  {
    id: "style12",
    title: "Royal Couple",
    imageUrl: "public/lovable-uploads/0160104c-0db2-4236-af52-4a25c0a1b0b3.png",
    description: "Couple with crown motif in elegant wedding attire"
  },
  {
    id: "style13",
    title: "Floral Frame",
    imageUrl: "public/lovable-uploads/bb24db12-85e5-4c72-8213-769e8797ce38.png",
    description: "Ornate frame with doves and flowers against serene backdrop"
  },
  {
    id: "style14",
    title: "Islamic Architecture",
    imageUrl: "public/lovable-uploads/31e0ad1e-a5c5-4ebe-84c3-7546ec31643f.png",
    description: "Ancient Islamic architecture with Arabic calligraphy and doves"
  },
  {
    id: "style15",
    title: "Paper Crane",
    imageUrl: "public/lovable-uploads/476f2124-fdd8-424a-b796-4279e1bcc940.png",
    description: "Hands exchanging paper crane with flowers and Arabic calligraphy"
  }
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
                    <Check className="w-4 w-4 text-white" />
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                <h3 className="text-white font-serif mb-1">{style.title}</h3>
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
