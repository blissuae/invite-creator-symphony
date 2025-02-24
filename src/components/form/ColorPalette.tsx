
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PALETTES.map((palette) => (
          <div
            key={palette.id}
            onClick={() => onSelect(palette.id)}
            className={`group cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
              selected === palette.id
                ? "border-black shadow-md"
                : "border-transparent hover:border-gray-200"
            }`}
          >
            <div className="relative h-48">
              <img
                src={palette.image}
                alt={palette.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-opacity" />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-2">{palette.name}</h3>
              <div className="flex gap-2">
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
