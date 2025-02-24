
interface AdditionalDetailsProps {
  formData: {
    occasion: string;
    guestCount: string;
    specialRequirements: string;
  };
  onChange: (field: string, value: string) => void;
}

export const AdditionalDetails = ({
  formData,
  onChange,
}: AdditionalDetailsProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-center mb-8">
        Additional Details
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Occasion
          </label>
          <input
            type="text"
            value={formData.occasion}
            onChange={(e) => onChange("occasion", e.target.value)}
            placeholder="e.g., Wedding, Birthday, Corporate Event"
            className="w-full p-3 rounded-lg border border-form-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Number of Guests
          </label>
          <input
            type="number"
            value={formData.guestCount}
            onChange={(e) => onChange("guestCount", e.target.value)}
            placeholder="Enter number of guests"
            className="w-full p-3 rounded-lg border border-form-200 focus:border-black focus:ring-1 focus:ring-black transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Requirements
          </label>
          <textarea
            value={formData.specialRequirements}
            onChange={(e) => onChange("specialRequirements", e.target.value)}
            placeholder="Any special requirements or preferences..."
            className="w-full h-32 p-3 rounded-lg border border-form-200 focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
          />
        </div>
      </div>
    </div>
  );
};
