
import { InfoIcon, SparklesIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface ColorPaletteProps {
  selected: string;
  onSelect: (value: string) => void;
}

interface PaletteOption {
  id: string;
  name: string;
  description: string;
  colors: string[];
  popular?: boolean;
}

const PALETTES: PaletteOption[] = [
  {
    id: "elegant###EAE0D5,C6AC8F,5E503F###Elegant Neutrals",
    name: "Elegant Neutrals",
    description: "Timeless beige and brown tones",
    colors: ["#EAE0D5", "#C6AC8F", "#5E503F"],
    popular: true
  },
  {
    id: "blush###F8E1E7,F3B1Cf,8A5082###Blush & Berry",
    name: "Blush & Berry",
    description: "Soft pinks with deep berry accents",
    colors: ["#F8E1E7", "#F3B1CF", "#8A5082"]
  },
  {
    id: "sage###E5EAD7,95B8D1,134074###Sage & Blue",
    name: "Sage & Blue",
    description: "Calming sage green with navy accents",
    colors: ["#E5EAD7", "#95B8D1", "#134074"]
  },
  {
    id: "sunset###FFE6CC,FFBE86,FF7F5C###Sunset Glow",
    name: "Sunset Glow",
    description: "Warm oranges and soft yellows",
    colors: ["#FFE6CC", "#FFBE86", "#FF7F5C"],
    popular: true
  },
  {
    id: "lavender###F2E9FF,D2B8E3,8C7AA9###Lavender Dream",
    name: "Lavender Dream",
    description: "Soothing purples and lavenders",
    colors: ["#F2E9FF", "#D2B8E3", "#8C7AA9"]
  },
  {
    id: "mint###E0F2E9,B3DBC5,5A9367###Mint Fresh",
    name: "Mint Fresh",
    description: "Refreshing mint and deep green",
    colors: ["#E0F2E9", "#B3DBC5", "#5A9367"]
  },
  {
    id: "gold###FFF8E1,FFD54F,C8A415###Golden Luxury",
    name: "Golden Luxury",
    description: "Luxurious golds and creams",
    colors: ["#FFF8E1", "#FFD54F", "#C8A415"],
    popular: true
  },
  {
    id: "coral###FEE1E8,FE8A71,4A8FE7###Coral & Teal",
    name: "Coral & Teal",
    description: "Vibrant coral with teal accents",
    colors: ["#FEE1E8", "#FE8A71", "#4A8FE7"]
  },
  {
    id: "dusty###E7DFE8,9C8AA5,4F4A58###Dusty Rose",
    name: "Dusty Rose",
    description: "Muted rose and purple tones",
    colors: ["#E7DFE8", "#9C8AA5", "#4F4A58"]
  }
];

export const ColorPalette = ({ selected, onSelect }: ColorPaletteProps) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="text-center">
        <h2 className="text-2xl font-serif mb-2 text-elegant-brown">Choose Your Color Palette</h2>
        <p className="text-gray-600 font-serif">Select a color scheme that matches your style</p>
      </div>

      {/* DID YOU KNOW - updated to purple */}
      <div className="bg-[#8B5CF6]/10 p-6 rounded-lg border border-[#8B5CF6]/20 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#8B5CF6]/20 rounded-full">
            <InfoIcon className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <p className="text-sm text-gray-700 flex-1">
            <span className="font-semibold">DID YOU KNOW: </span>
            Color psychology suggests that different colors evoke different emotions. Choose colors that match the mood of your event - soft blues for calm elegance, vibrant yellows for joyful celebrations, or rich golds for luxury.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PALETTES.map((palette) => {
          const isSelected = selected === palette.id;
          return (
            <TooltipProvider key={palette.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Card 
                    className={`
                      cursor-pointer border-2 relative overflow-hidden transition-all
                      hover:shadow-md hover:border-elegant-secondary/30
                      ${isSelected ? "border-elegant-primary shadow-md" : "border-elegant-secondary/10"}
                    `}
                    onClick={() => onSelect(palette.id)}
                  >
                    {palette.popular && (
                      <div className="absolute right-0 top-0">
                        <div className="bg-elegant-primary text-white text-xs px-2 py-1 rounded-bl">
                          <div className="flex items-center space-x-1">
                            <SparklesIcon className="h-3 w-3" />
                            <span>Popular</span>
                          </div>
                        </div>
                      </div>
                    )}
                    <CardHeader className="p-4 pb-0">
                      <CardTitle className="text-base font-serif text-elegant-brown">
                        {palette.name}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {palette.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="flex space-x-2">
                        {palette.colors.map((color, index) => (
                          <div 
                            key={index}
                            className="h-8 flex-1 rounded-sm"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <div className="w-full flex">
                        {palette.colors.map((color, index) => (
                          <div key={index} className="text-xs text-gray-500 flex-1 text-center">
                            {color}
                          </div>
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to select this palette</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
        })}
      </div>
    </div>
  );
};
