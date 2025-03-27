
import { addDays, startOfDay } from "date-fns";

export interface DateDiscount {
  amount: number;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
  selectedBg: string;
}

export const calculateDateRanges = (today: Date) => {
  const urgentMinDate = addDays(today, 10);
  const urgentMaxDate = addDays(today, 18);
  const regularMinDate = addDays(today, 19);
  const discountDate40 = addDays(today, 40);
  const discountDate70 = addDays(today, 70);
  
  return {
    urgentMinDate,
    urgentMaxDate,
    regularMinDate,
    discountDate40,
    discountDate70
  };
};

export const getDateDiscount = (date: Date, dateRanges: ReturnType<typeof calculateDateRanges>): DateDiscount | null => {
  const { urgentMinDate, urgentMaxDate, regularMinDate, discountDate40, discountDate70 } = dateRanges;
  const compareDate = startOfDay(date);
  
  if (compareDate >= urgentMinDate && compareDate <= urgentMaxDate) {
    return { 
      amount: -500, 
      label: "500 AED URGENT FEE", 
      color: "purple", 
      bgColor: "#f3e8ff", 
      textColor: "#7e22ce", 
      selectedBg: "#7e22ce" 
    };
  } else if (compareDate >= discountDate70) {
    return { 
      amount: 500, 
      label: "500 AED OFF!", 
      color: "green", 
      bgColor: "#e6ffed", 
      textColor: "#15803d", 
      selectedBg: "#15803d" 
    };
  } else if (compareDate >= discountDate40) {
    return { 
      amount: 300, 
      label: "300 AED OFF!", 
      color: "blue", 
      bgColor: "#e6f3ff", 
      textColor: "#1e40af", 
      selectedBg: "#1e40af" 
    };
  } else if (compareDate >= regularMinDate) {
    return { 
      amount: 0, 
      label: "Regular price", 
      color: "orange", 
      bgColor: "#fff7ed", 
      textColor: "#9a3412", 
      selectedBg: "#9a3412" 
    };
  }
  return null;
};
