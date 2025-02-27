
import { Calendar } from "@/components/ui/calendar";
import { addDays, startOfDay, isSameDay, endOfDay } from "date-fns";
import { Wand2, AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";

interface DeadlinePickerProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
}

export const DeadlinePicker = ({ selected, onSelect }: DeadlinePickerProps) => {
  const today = startOfDay(new Date());
  const urgentMinDate = addDays(today, 6);
  const urgentMaxDate = addDays(today, 14);
  const regularMinDate = addDays(today, 15);
  const discountDate25 = addDays(today, 25);
  const discountDate50 = addDays(today, 50);
  
  const [isUrgentDelivery, setIsUrgentDelivery] = useState(false);

  // Check if currently selected date is in the urgent range and set the checkbox accordingly
  useEffect(() => {
    if (selected) {
      const compareDate = startOfDay(selected);
      const isInUrgentRange = compareDate >= urgentMinDate && compareDate <= urgentMaxDate;
      setIsUrgentDelivery(isInUrgentRange);
    }
  }, []);

  const getDateDiscount = (date: Date) => {
    const compareDate = startOfDay(date);
    
    if (compareDate >= urgentMinDate && compareDate <= urgentMaxDate) {
      return { amount: -500, label: "500 AED URGENT FEE", color: "purple", bgColor: "#f3e8ff", textColor: "#7e22ce", selectedBg: "#7e22ce" };
    } else if (compareDate >= discountDate50) {
      return { amount: 500, label: "500 AED OFF!", color: "green", bgColor: "#e6ffed", textColor: "#15803d", selectedBg: "#15803d" };
    } else if (compareDate >= discountDate25) {
      return { amount: 300, label: "300 AED OFF!", color: "blue", bgColor: "#e6f3ff", textColor: "#1e40af", selectedBg: "#1e40af" };
    } else if (compareDate >= regularMinDate) {
      return { amount: 0, label: "Regular price", color: "orange", bgColor: "#fff7ed", textColor: "#9a3412", selectedBg: "#9a3412" };
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-center mb-8">
        Choose Your Deadline
      </h2>

      {/* Delivery Options */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="urgentDelivery" 
            checked={isUrgentDelivery} 
            onCheckedChange={(checked) => {
              setIsUrgentDelivery(checked === true);
            }}
            className="data-[state=checked]:bg-purple-600"
          />
          <Label 
            htmlFor="urgentDelivery" 
            className="text-base cursor-pointer font-medium flex items-center gap-2"
          >
            <span>Enable Urgent Delivery</span>
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-semibold bg-purple-100 text-purple-800">
              +500 AED
            </span>
          </Label>
        </div>
      </div>

      {/* Fact Box */}
      <div className={`p-6 rounded-lg border shadow-sm mb-8 ${isUrgentDelivery ? 'bg-purple-50 border-purple-200' : 'bg-[#b8860b] border-[#b8860b]/20'}`}>
        <div className="flex items-start gap-4">
          <div className={`p-2 rounded-full ${isUrgentDelivery ? 'bg-purple-100' : 'bg-[#b8860b]/20'}`}>
            {isUrgentDelivery ? (
              <AlertTriangle className="w-5 h-5 text-purple-600" />
            ) : (
              <Wand2 className="w-5 h-5 text-white" />
            )}
          </div>
          <div className={`text-sm flex-1 ${isUrgentDelivery ? 'text-purple-800' : 'text-white'}`}>
            {isUrgentDelivery ? (
              <>
                <span className="font-semibold">URGENT DELIVERY: </span>
                Need your invitation sooner? Select a date between 6-14 days from today for urgent delivery with an additional fee of 500 AED. Our team will prioritize your order for a faster turnaround.
              </>
            ) : (
              <>
                <span className="font-semibold">DID YOU KNOW: </span>
                By booking in advance, you can save up to 500 AED! Dates marked in blue offer a 300 AED discount, while dates in green give you an amazing 500 AED discount. The earlier you book, the more you save!
              </>
            )}
          </div>
        </div>
      </div>

      <TooltipProvider>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={onSelect}
            className="rounded-md border shadow-sm w-full md:w-[800px] p-2 md:p-6"
            disabled={{ 
              before: isUrgentDelivery ? urgentMinDate : regularMinDate,
              after: isUrgentDelivery ? urgentMaxDate : undefined
            }}
            fromDate={isUrgentDelivery ? urgentMinDate : regularMinDate}
            modifiers={{
              urgent: {
                from: urgentMinDate,
                to: urgentMaxDate
              },
              regular: { 
                from: regularMinDate,
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
              urgent: {
                backgroundColor: '#f3e8ff',
                color: '#7e22ce',
                fontWeight: '500'
              },
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
              day_selected: "!bg-current !text-white hover:!bg-current hover:!text-white",
              day: "h-9 w-9 md:h-12 md:w-12 text-base font-medium transition-all duration-200 hover:opacity-90",
              cell: "h-9 w-9 md:h-12 md:w-12 p-0",
              head_cell: "text-muted-foreground rounded-md w-9 md:w-12 font-normal text-[0.8rem] md:text-[0.9rem]",
              nav_button: "h-7 w-7 md:h-9 md:w-9",
              table: "w-full border-collapse space-y-1 md:space-y-4",
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              caption: "flex justify-center pt-1 relative items-center mb-2 md:mb-4",
              caption_label: "text-sm md:text-base font-medium"
            }}
            components={{
              DayContent: ({ date }) => {
                const discount = getDateDiscount(date);
                if (!discount) return <span>{date.getDate()}</span>;

                // Make purple dates initially unavailable if urgent delivery is not checked
                if (!isUrgentDelivery && discount.color === "purple") {
                  return (
                    <div className="opacity-50 cursor-not-allowed">
                      <span>{date.getDate()}</span>
                    </div>
                  );
                }

                const isSelectedDate = selected && isSameDay(date, selected);
                const style = isSelectedDate ? { color: 'white', backgroundColor: discount.selectedBg } : {};

                return (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div 
                        className="w-full h-full flex items-center justify-center"
                        style={style}
                      >
                        <span>{date.getDate()}</span>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent 
                      side="right" 
                      className="font-medium text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5"
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

      <p className="text-sm text-gray-500 text-center max-w-md mx-auto mt-4">
        {selected ? (
          getDateDiscount(selected)?.amount ? (
            <span className={`font-medium ${
              getDateDiscount(selected)?.amount < 0 
              ? "text-purple-600" 
              : "text-green-600"
            }`}>
              {getDateDiscount(selected)?.amount < 0 
                ? `Urgent delivery fee: ${getDateDiscount(selected)?.label}`
                : `You'll get ${getDateDiscount(selected)?.label} on this date! 🎉`
              }
            </span>
          ) : (
            "Select a later date to get up to 500 AED discount!"
          )
        ) : (
          isUrgentDelivery
            ? "Please select an urgent delivery date (6-14 days from today)"
            : "We require a minimum of 15 days to create your perfect invitation"
        )}
      </p>
    </div>
  );
};
