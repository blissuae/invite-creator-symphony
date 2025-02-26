
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";

interface DeadlinePickerProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
}

export const DeadlinePicker = ({ selected, onSelect }: DeadlinePickerProps) => {
  const minDate = addDays(new Date(), 15); // Minimum 15 days from today
  const discountDate25 = addDays(new Date(), 25); // 300 AED discount starts
  const discountDate50 = addDays(new Date(), 50); // 500 AED discount starts

  const getDateDiscount = (date: Date) => {
    if (date >= discountDate50) {
      return { amount: 500, label: "500 AED OFF!" };
    } else if (date >= discountDate25) {
      return { amount: 300, label: "300 AED OFF!" };
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-center mb-8">
        Choose Your Deadline
      </h2>
      <div className="flex justify-center">
        <Calendar
          mode="single"
          selected={selected}
          onSelect={onSelect}
          className="rounded-md border shadow-sm"
          disabled={{ before: minDate }}
          fromDate={minDate}
          modifiers={{
            discount300: { from: discountDate25, to: addDays(discountDate50, -1) },
            discount500: { from: discountDate50 }
          }}
          modifiersStyles={{
            discount300: {
              textDecoration: 'underline',
              textDecorationStyle: 'dotted',
              textDecorationColor: '#22c55e'
            },
            discount500: {
              textDecoration: 'underline',
              textDecorationStyle: 'dotted',
              textDecorationColor: '#3b82f6'
            }
          }}
          components={{
            DayContent: ({ date }) => {
              const discount = getDateDiscount(date);
              return (
                <div className="relative w-full h-full flex items-center justify-center">
                  <span>{date.getDate()}</span>
                  {discount && (
                    <div 
                      className={`absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-medium px-1.5 py-0.5 rounded ${
                        discount.amount === 500 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      {discount.label}
                    </div>
                  )}
                </div>
              );
            }
          }}
        />
      </div>
      <p className="text-sm text-gray-500 text-center max-w-md mx-auto">
        {selected ? (
          getDateDiscount(selected) ? (
            <span className="text-green-600 font-medium">
              You'll get {getDateDiscount(selected)?.label} on this date! 🎉
            </span>
          ) : (
            "Select a later date to get up to 500 AED discount!"
          )
        ) : (
          "We require a minimum of 15 days to create your perfect invitation"
        )}
      </p>
    </div>
  );
};
