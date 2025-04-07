
import { Calendar } from "@/components/ui/calendar";
import { addDays, startOfDay, isSameDay, endOfDay } from "date-fns";
import { useState, useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { InfoBox } from "./deadline/InfoBox";
import { UrgentDeliveryOption } from "./deadline/UrgentDeliveryOption";
import { StatusMessage } from "./deadline/StatusMessage";
import { CalendarTooltip } from "./deadline/CalendarTooltip";
import { 
  calculateDateRanges, 
  getDateDiscount, 
  isDateBooked,
  isAlwaysAvailableDate
} from "./deadline/dateUtils";

interface DeadlinePickerProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
}

export const DeadlinePicker = ({ selected, onSelect }: DeadlinePickerProps) => {
  const today = startOfDay(new Date());
  const dateRanges = calculateDateRanges(today);
  const { urgentMinDate, urgentMaxDate, regularMinDate, discountDate40, discountDate70 } = dateRanges;
  
  const [isUrgentDelivery, setIsUrgentDelivery] = useState(false);

  // Check if currently selected date is in the urgent range and set the checkbox accordingly
  useEffect(() => {
    if (selected) {
      const compareDate = startOfDay(selected);
      const isInUrgentRange = compareDate >= urgentMinDate && compareDate <= urgentMaxDate;
      setIsUrgentDelivery(isInUrgentRange);
    }
  }, []);
  
  const getDateDiscountWithRanges = (date: Date) => {
    return getDateDiscount(date, dateRanges);
  };

  // Determine if a date should be disabled (either outside range or booked)
  const isDateDisabled = (date: Date) => {
    // First check if date is outside of allowed range
    if (isUrgentDelivery) {
      if (date < urgentMinDate || date > urgentMaxDate) return true;
    } else {
      if (date < regularMinDate) return true;
    }
    
    // Check if this is a special date that's always available
    if (isAlwaysAvailableDate(date)) return false;
    
    // Then check if the date is "booked"
    return isDateBooked(date, dateRanges);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-center mb-8">
        Choose Your Deadline
      </h2>

      <UrgentDeliveryOption 
        isChecked={isUrgentDelivery} 
        onChange={setIsUrgentDelivery} 
      />

      <InfoBox isUrgentDelivery={isUrgentDelivery} />

      <TooltipProvider>
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selected}
            onSelect={(date) => {
              // Only allow selection of non-disabled dates
              if (date && !isDateDisabled(date)) {
                onSelect(date);
              }
            }}
            className="rounded-md border shadow-sm w-full md:w-[800px] p-2 md:p-6"
            disabled={(date) => isDateDisabled(date)}
            fromDate={isUrgentDelivery ? urgentMinDate : regularMinDate}
            modifiers={{
              urgent: {
                from: urgentMinDate,
                to: urgentMaxDate
              },
              regular: { 
                from: regularMinDate,
                to: addDays(discountDate40, -1)
              },
              discount300: { 
                from: discountDate40, 
                to: addDays(discountDate70, -1)
              },
              discount500: { 
                from: discountDate70,
                to: addDays(today, 365)
              },
              booked: (date) => !isAlwaysAvailableDate(date) && isDateBooked(date, dateRanges)
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
              },
              booked: {
                textDecoration: 'line-through',
                opacity: 0.5
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
              caption_label: "text-sm md:text-base font-medium",
              day_disabled: "text-muted-foreground opacity-40 cursor-not-allowed line-through",
            }}
            components={{
              DayContent: ({ date }) => {
                const discount = getDateDiscountWithRanges(date);
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
                const isBooked = !isAlwaysAvailableDate(date) && isDateBooked(date, dateRanges);
                
                const style = isSelectedDate ? { 
                  color: 'white', 
                  backgroundColor: discount.selectedBg 
                } : {};

                return (
                  <CalendarTooltip 
                    label={isBooked ? "Date Unavailable" : discount.label}
                    bgColor={discount.bgColor}
                    textColor={discount.textColor}
                  >
                    <div 
                      className={`w-full h-full flex items-center justify-center ${isBooked ? 'line-through opacity-50' : ''}`}
                      style={style}
                    >
                      <span>{date.getDate()}</span>
                    </div>
                  </CalendarTooltip>
                );
              }
            }}
          />
        </div>
      </TooltipProvider>

      <div className="text-center text-sm text-gray-600 mt-2">
        Dates with strikethrough are already booked
      </div>

      <StatusMessage 
        selected={selected} 
        getDateDiscount={getDateDiscountWithRanges} 
        isUrgentDelivery={isUrgentDelivery} 
      />
    </div>
  );
};
