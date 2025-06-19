
interface DateDiscount {
  amount: number;
  label: string;
}

interface StatusMessageProps {
  selected: Date | null;
  getDateDiscount: (date: Date) => DateDiscount | null;
  isUrgentDelivery: boolean;
}

export const StatusMessage = ({
  selected,
  getDateDiscount,
  isUrgentDelivery,
}: StatusMessageProps) => {
  return (
    <p className="text-sm text-gray-500 text-center max-w-md mx-auto mt-4">
      {selected ? (
        getDateDiscount(selected)?.amount ? (
          <span
            className={`font-medium ${
              getDateDiscount(selected)?.amount < 0
                ? "text-purple-600"
                : "text-green-600"
            }`}
          >
            {getDateDiscount(selected)?.amount < 0
              ? `Urgent delivery fee: ${getDateDiscount(selected)?.label}`
              : `You'll get ${getDateDiscount(selected)?.label} on this date! 🎉`}
          </span>
        ) : (
          "Select a later date to get up to 300 AED discount!"
        )
      ) : isUrgentDelivery ? (
        "Please select an urgent delivery date (10-18 days from today)"
      ) : (
        "We require a minimum of 19 days to create your perfect invitation"
      )}
    </p>
  );
};
