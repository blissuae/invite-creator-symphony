
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
      <h2 className="text-2xl font-light text-center mb-8">
        Select Your Style
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {STYLES.map((style) => (
          <div
            key={style.id}
            onClick={() => onSelect(style.id)}
            className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all ${
              selected === style.id
                ? "border-black shadow-md"
                : "border-transparent hover:border-gray-200"
            }`}
          >
            <div className="relative h-48">
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity" />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">{style.name}</h3>
              <p className="text-sm text-gray-600">{style.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
