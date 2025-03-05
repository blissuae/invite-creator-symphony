
import { useState } from "react";
import { Check } from "lucide-react";
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

interface AnimationStyleSelectorProps {
  selected: string[];
  onSelect: (styles: string[]) => void;
}

export const AnimationStyleSelector = ({ selected, onSelect }: AnimationStyleSelectorProps) => {
  const { toast } = useToast();

  const handleStyleSelection = (styleId: string) => {
    let newSelected: string[];
    if (selected.includes(styleId)) {
      newSelected = selected.filter((id) => id !== styleId);
    } else if (selected.length >= 3) {
      toast({
        title: "Selection limit reached",
        description: "You can only select up to 3 styles",
        variant: "destructive",
      });
      return;
    } else {
      newSelected = [...selected, styleId];
    }
    
    onSelect(newSelected);

    if (newSelected.length === 3) {
      setTimeout(() => {
        const continueButton = document.querySelector('button[data-continue]') as HTMLButtonElement;
        continueButton?.click();
      }, 300);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-serif mb-4 text-elegant-brown">Choose Your Animation Style</h2>
        <p className="text-gray-600 font-serif">Select up to 3 styles that inspire you</p>
        <p className="text-sm text-elegant-brown/70 mt-2">
          {3 - selected.length} selections remaining
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ANIMATION_STYLES.map((style) => (
          <div
            key={style.id}
            onClick={() => handleStyleSelection(style.id)}
            className="flex flex-col items-center space-y-4 cursor-pointer"
          >
            <div
              className={`relative w-40 h-40 rounded-lg overflow-hidden transition-all ${
                selected.includes(style.id)
                  ? "ring-4 ring-elegant-primary ring-offset-4"
                  : "hover:ring-2 hover:ring-elegant-secondary hover:ring-offset-2"
              }`}
            >
              <img
                src={style.imageUrl}
                alt={style.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-elegant-primary/20 transition-opacity ${
                selected.includes(style.id) ? "opacity-70" : "opacity-0 group-hover:opacity-40"
              }`} />
              {selected.includes(style.id) && (
                <div className="absolute top-4 right-4 bg-elegant-primary rounded-full p-1">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg mb-1 text-elegant-brown">{style.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
