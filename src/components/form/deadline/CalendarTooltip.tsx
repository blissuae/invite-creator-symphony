
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface CalendarTooltipProps {
  children: ReactNode;
  label: string;
  bgColor: string;
  textColor: string;
}

export const CalendarTooltip = ({
  children,
  label,
  bgColor,
  textColor,
}: CalendarTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side="right"
        className="font-medium text-xs md:text-sm px-2 py-1 md:px-3 md:py-1.5"
        style={{
          backgroundColor: bgColor,
          color: textColor,
          border: `1px solid ${textColor}20`,
        }}
      >
        {label}
      </TooltipContent>
    </Tooltip>
  );
};
