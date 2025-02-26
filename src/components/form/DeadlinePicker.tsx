
import { Calendar } from "@/components/ui/calendar";
import { addDays, startOfDay } from "date-fns";
import { Wand2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DeadlinePickerProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
}

export const DeadlinePicker = ({ selected, onSelect }: DeadlinePickerProps) => {
  const today = startOfDay(new Date());
  const minDate = addDays(today, 15);
  const discountDate25 = addDays(today, 25);
  const discountDate50 = addDays(today, 50);

  const getDateDiscount = (date: Date) => {
    const compareDate = startOfDay(date);
    
    if (compareDate >= discountDate50) {
      return { amount: 500, label: "500 AED OFF!", color: "green", bgColor: "#e6ffed", textColor: "#15803d" };
    } else if (compareDate >= discountDate25) {
      return { amount: 300, label: "300 AED OFF!", color: "blue", bgColor: "#e6f3ff", textColor: "#1e40af" };
    } else if (compareDate >= minDate) {
      return { amount: 0, label: "Regular price", color: "orange", bgColor: "#fff7ed", textColor: "#9a3412" };
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-center mb-8">
        Choose Your Deadline
      </h2>

      {/* Fact Box */}
      <div className="bg-[#b8860b] p-6 rounded-lg border border-[#b8860b]/20 shadow-sm mb-8">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-[#b8860b]/20 rounded-full">
            <Wand2 className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-white flex-1">
            <span className="font-semibold">DID YOU KNOW: </span>
            By booking in advance, you can save up to 500 AED! Dates marked in blue offer a 300 AED discount, while dates in green give you an amazing 500 AED discount. The earlier you book, the more you save!
          </p>
        </div>
      </div>

      <TooltipProvider>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            className="rounded-md border shadow-sm w-[800px] p-6"
            disabled={{ before: minDate }}
            fromDate={minDate}
            modifiers={{
              regular: { 
                from: minDate,
                to: addDays(discountDate25, -1)
              },
              discount300: { 
                from: discountDate25, 
                to: addDays(discountDate50, -1)
              },
              discount500: { 
                from: discountDate50,
                to: addDays(today, 365)
              }
            }}
            modifiersStyles={{
              regular: {
                backgroundColor: '#fff7ed',
                color: '#9a3412',
                fontWeight: '500'
              },
              discount300: {
                backgroundColor: '#e6f3ff',
                color: '#1e40af',
                fontWeight: '500'
              },
              discount500: {
                backgroundColor: '#e6ffed',
                color: '#15803d',
                fontWeight: '500'
              }
            }}
            classNames={{
              day_selected: "bg-[#222222] text-white hover:bg-[#222222] hover:text-white focus:bg-[#222222] focus:text-white",
              day: "h-12 w-12 text-base font-medium transition-all duration-200",
              cell: "h-12 w-12 p-0",
              head_cell: "text-muted-foreground rounded-md w-12 font-normal text-[0.9rem]",
              nav_button: "h-9 w-9",
              table: "w-full border-collapse space-y-4",
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              caption: "flex justify-center pt-1 relative items-center mb-4",
              caption_label: "text-base font-medium"
            }}
            components={{
              DayContent: ({ date }) => {
                const discount = getDateDiscount(date);
                if (!discount) return <span>{date.getDate()}</span>;

                return (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full h-full flex items-center justify-center">
                        <span>{date.getDate()}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="font-medium text-sm px-3 py-1.5"
                      style={{
                        backgroundColor: discount.bgColor,
                        color: discount.textColor,
                        border: `1px solid ${discount.textColor}20`
                      }}
                    >
                      {discount.label}
                    </TooltipContent>
                  </Tooltip>
                );
              }
            }}
          />
        </div>
      </TooltipProvider>

      <p className="text-sm text-gray-500 text-center max-w-md mx-auto">
        {selected ? (
          getDateDiscount(selected)?.amount ? (
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
