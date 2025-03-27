
import { AlertTriangle, Wand2 } from "lucide-react";

interface InfoBoxProps {
  isUrgentDelivery: boolean;
}

export const InfoBox = ({ isUrgentDelivery }: InfoBoxProps) => {
  return (
    <div
      className={`p-6 rounded-lg border shadow-sm mb-8 ${
        isUrgentDelivery
          ? "bg-purple-50 border-purple-200"
          : "bg-[#8B5CF6]/10 border-[#8B5CF6]/20"
      }`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`p-2 rounded-full ${
            isUrgentDelivery ? "bg-purple-100" : "bg-[#8B5CF6]/20"
          }`}
        >
          {isUrgentDelivery ? (
            <AlertTriangle className="w-5 h-5 text-purple-600" />
          ) : (
            <Wand2 className="w-5 h-5 text-[#8B5CF6]" />
          )}
        </div>
        <div
          className={`text-sm flex-1 ${
            isUrgentDelivery ? "text-purple-800" : "text-gray-700"
          }`}
        >
          {isUrgentDelivery ? (
            <>
              <span className="font-semibold">URGENT DELIVERY: </span>
              Need your invitation sooner? Select a date between 10-18 days from
              today for urgent delivery with an additional fee of 500 AED. Our
              team will prioritize your order for a faster turnaround.
            </>
          ) : (
            <>
              <span className="font-semibold">DID YOU KNOW: </span>
              By booking in advance, you can save up to 500 AED! Dates marked in
              blue offer a 300 AED discount, while dates in green give you an
              amazing 500 AED discount. The earlier you book, the more you save!
            </>
          )}
        </div>
      </div>
    </div>
  );
};
