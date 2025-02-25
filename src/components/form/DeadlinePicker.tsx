
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

interface DeadlinePickerProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
  isUrgent: boolean;
  onUrgentChange: (checked: boolean) => void;
}

export const DeadlinePicker = ({ selected, onSelect, isUrgent, onUrgentChange }: DeadlinePickerProps) => {
  const minDate = addDays(new Date(), isUrgent ? 14 : 25);

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
        />
      </div>
      <p className="text-sm text-gray-500 text-center">
        {isUrgent 
          ? "Express delivery requires minimum 14 days processing time"
          : "We require a minimum of 25 days to create your perfect invitation"}
      </p>

      <div className="flex items-start space-x-3 p-4 bg-elegant-beige/20 rounded-lg border border-elegant-secondary/20">
        <Checkbox 
          id="urgent"
          checked={isUrgent}
          onCheckedChange={(checked) => onUrgentChange(checked as boolean)}
        />
        <Label htmlFor="urgent" className="text-sm leading-tight cursor-pointer">
          Urgent delivery? We can deliver in 2 weeks time (depending on availability) with an additional charges.
        </Label>
      </div>
    </div>
  );
};
