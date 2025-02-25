
import { Check, X, User, Users } from "lucide-react";

interface CharacterOptionsProps {
  formData: {
    hasCharacters: boolean;
    showFaces: boolean;
    characterCount: string;
  };
  onChange: (field: string, value: any) => void;
}

export const CharacterOptions = ({ formData, onChange }: CharacterOptionsProps) => {
  const handleCharacterCountChange = (value: string) => {
    onChange("characterCount", value);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-serif text-center mb-8 text-elegant-brown">
        Character Options
      </h2>

      <div className="space-y-8">
        {/* Human Characters Selection */}
        <div className="space-y-4">
          <h3 className="text-lg font-serif text-elegant-brown text-center">
            Do you want to add human characters?
          </h3>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => onChange("hasCharacters", true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                formData.hasCharacters
                  ? "bg-elegant-primary text-white"
                  : "border border-elegant-secondary hover:border-elegant-primary"
              }`}
            >
              <Check className="w-5 h-5" />
              Yes
            </button>
            <button
              onClick={() => {
                onChange("hasCharacters", false);
                onChange("showFaces", false);
                onChange("characterCount", "");
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                formData.hasCharacters === false
                  ? "bg-elegant-primary text-white"
                  : "border border-elegant-secondary hover:border-elegant-primary"
              }`}
            >
              <X className="w-5 h-5" />
              No
            </button>
          </div>
        </div>

        {/* Show Faces Selection - Conditional */}
        {formData.hasCharacters && (
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-elegant-brown text-center">
              Do you want to show their faces?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => onChange("showFaces", true)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  formData.showFaces
                    ? "bg-elegant-primary text-white"
                    : "border border-elegant-secondary hover:border-elegant-primary"
                }`}
              >
                <Check className="w-5 h-5" />
                Yes
              </button>
              <button
                onClick={() => {
                  onChange("showFaces", false);
                  onChange("characterCount", "");
                }}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                  formData.showFaces === false
                    ? "bg-elegant-primary text-white"
                    : "border border-elegant-secondary hover:border-elegant-primary"
                }`}
              >
                <X className="w-5 h-5" />
                No
              </button>
            </div>
          </div>
        )}

        {/* Character Count Selection - Only show when faces are enabled */}
        {formData.hasCharacters && formData.showFaces && (
          <div className="space-y-4">
            <h3 className="text-lg font-serif text-elegant-brown text-center">
              Total number of characters
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {["1", "2", "3", "4", "5"].map((count) => (
                <button
                  key={count}
                  onClick={() => handleCharacterCountChange(count)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                    formData.characterCount === count
                      ? "bg-elegant-primary text-white"
                      : "border border-elegant-secondary hover:border-elegant-primary"
                  }`}
                >
                  {count === "1" ? (
                    <User className="w-5 h-5" />
                  ) : (
                    <Users className="w-5 h-5" />
                  )}
                  {count}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
