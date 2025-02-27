
import { InfoIcon } from "lucide-react";

interface StyleSelectorProps {
  selected: string;
  onSelect: (value: string) => void;
}

const STYLES = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean lines and simple elegance",
    image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&q=80",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Bold and contemporary design",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80",
  },
];

export const StyleSelector = ({ selected, onSelect }: StyleSelectorProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-serif text-center mb-8 text-elegant-brown">
        Select Your Style
      </h2>
      
      {/* DID YOU KNOW - updated to purple */}
      <div className="bg-[#8B5CF6]/10 p-6 rounded-lg border border-[#8B5CF6]/20 shadow-sm mb-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#8B5CF6]/20 rounded-full">
            <InfoIcon className="w-5 h-5 text-[#8B5CF6]" />
          </div>
          <p className="text-sm text-gray-700 flex-1">
            <span className="font-semibold">DID YOU KNOW: </span>
            Your design style sets the tone for your entire invitation. Minimal styles create a sense of sophistication, while modern designs add a contemporary flair that stands out.
          </p>
        </div>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {STYLES.map((style) => (
          <div
            key={style.id}
            onClick={() => {
              onSelect(style.id);
              setTimeout(() => {
                const continueButton = document.querySelector('button[data-continue]') as HTMLButtonElement;
                continueButton?.click();
              }, 300);
            }}
            className="flex flex-col items-center space-y-4 cursor-pointer"
          >
            <div
              className={`relative w-40 h-40 rounded-lg overflow-hidden transition-all ${
                selected === style.id
                  ? "ring-4 ring-elegant-primary ring-offset-4"
                  : "hover:ring-2 hover:ring-elegant-secondary hover:ring-offset-2"
              }`}
            >
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-elegant-primary/20 hover:bg-elegant-primary/30 transition-opacity" />
            </div>
            <div className="text-center">
              <h3 className="font-serif text-lg mb-1 text-elegant-brown">{style.name}</h3>
              <p className="text-sm text-gray-600">{style.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
