
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
      <div className="grid gap-12 md:grid-cols-2">
        {STYLES.map((style) => (
          <div
            key={style.id}
            onClick={() => onSelect(style.id)}
            className="flex flex-col items-center space-y-4"
          >
            <div
              className={`relative w-56 h-56 rounded-full overflow-hidden cursor-pointer transition-all ${
                selected === style.id
                  ? "ring-4 ring-black ring-offset-4"
                  : "hover:ring-2 hover:ring-gray-200 hover:ring-offset-2"
              }`}
            >
              <img
                src={style.image}
                alt={style.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 hover:bg-opacity-30 transition-opacity" />
            </div>
            <div className="text-center">
              <h3 className="font-medium mb-1">{style.name}</h3>
              <p className="text-sm text-gray-600">{style.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
