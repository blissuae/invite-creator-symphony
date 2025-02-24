
import { Calendar } from "@/components/ui/calendar";

interface DeadlinePickerProps {
  selected: Date | null;
  onSelect: (date: Date | null) => void;
}

export const DeadlinePicker = ({ selected, onSelect }: DeadlinePickerProps) => {
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
          disabled={{ before: new Date() }}
        />
      </div>
    </div>
  );
};
