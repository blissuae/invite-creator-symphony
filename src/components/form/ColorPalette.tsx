
interface ColorPaletteProps {
  selected: string;
  onSelect: (value: string) => void;
}

const PALETTES = [
  {
    id: "minimal",
    name: "Minimal Monochrome",
    colors: ["#000000", "#FFFFFF", "#F5F5F5"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
  },
  {
    id: "warm",
    name: "Warm Earth",
    colors: ["#D4A373", "#FEFAE0", "#E9EDC9"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  },
  {
    id: "cool",
    name: "Cool Breeze",
    colors: ["#94A3B8", "#E2E8F0", "#F8FAFC"],
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80",
  },
];

export const ColorPalette = ({ selected, onSelect }: ColorPaletteProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-center mb-8">
        Choose Your Color Palette
      </h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {PALETTES.map((palette) => (
          <div
            key={palette.id}
            onClick={() => {
              onSelect(palette.id);
              // Add a small delay before moving to next step to show the selection
              setTimeout(() => {
                const continueButton = document.querySelector('button[data-continue]') as HTMLButtonElement;
                continueButton?.click();
              }, 300);
            }}
            className="flex flex-col items-center space-y-4 cursor-pointer"
          >
            <div
              className={`relative w-48 h-48 rounded-full overflow-hidden transition-all ${
                selected === palette.id
                  ? "ring-4 ring-black ring-offset-4"
                  : "hover:ring-2 hover:ring-gray-200 hover:ring-offset-2"
              }`}
            >
              <img
                src={palette.image}
                alt={palette.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity" />
            </div>
            <div className="text-center">
              <h3 className="font-medium mb-2">{palette.name}</h3>
              <div className="flex justify-center gap-2">
                {palette.colors.map((color) => (
                  <div
                    key={color}
                    style={{ backgroundColor: color }}
                    className="w-6 h-6 rounded-full border border-gray-200"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
