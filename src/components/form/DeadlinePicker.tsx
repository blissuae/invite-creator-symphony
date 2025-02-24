
import { Calendar } from "@/components/ui/calendar";
import { addDays } from "date-fns";

interface DeadlinePickerProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
}

export const DeadlinePicker = ({ selected, onSelect }: DeadlinePickerProps) => {
  const minDate = addDays(new Date(), 25); // Set minimum date to 25 days from today

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
        Please note: We require a minimum of 25 days to create your perfect invitation
      </p>
    </div>
  );
};
