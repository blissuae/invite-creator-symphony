
import { addDays, startOfDay, isWithinInterval, isSameDay } from "date-fns";

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

// This function uses a deterministic algorithm to generate "booked" dates
// The same date will always return the same availability status
export const isDateBooked = (date: Date, dateRanges: ReturnType<typeof calculateDateRanges>): boolean => {
  const { urgentMinDate, urgentMaxDate, regularMinDate, discountDate40, discountDate70 } = dateRanges;
  const day = date.getDate();
  const month = date.getMonth();
  const dayOfWeek = date.getDay();
  
  // Create a deterministic pattern based on the date's properties
  // This ensures consistency for the same dates
  
  // Base availability on numeric properties of the date
  const dateSum = day + month;
  const dateFactor = (day * month) % 11;
  
  // Make the pattern different for each bracket
  if (isWithinInterval(date, { start: urgentMinDate, end: urgentMaxDate })) {
    // Urgent bracket - Make 80% of dates unavailable (very limited availability)
    // Preserve a few specific days to ensure some options
    if (dayOfWeek === 1 || dayOfWeek === 4) return false; // Always keep Mondays and Thursdays available
    return (dateSum % 5 !== 0); // Make 80% booked
  } 
  else if (isWithinInterval(date, { start: regularMinDate, end: addDays(discountDate40, -1) })) {
    // Regular bracket - Make 70% of dates unavailable
    if (dayOfWeek === 2 || dayOfWeek === 5) return false; // Always keep Tuesdays and Fridays available
    return (dateFactor % 10 > 2); // Make 70% booked
  }
  else if (isWithinInterval(date, { start: discountDate40, end: addDays(discountDate70, -1) })) {
    // Discount 300 bracket - Make 50% of dates unavailable
    if (dayOfWeek === 0 || dayOfWeek === 3) return false; // Always keep Sundays and Wednesdays available
    return (day % 2 === 0 && month % 2 === 0); // Make 50% booked
  }
  else if (date >= discountDate70) {
    // Discount 500 bracket - Make 30% of dates unavailable (more availability)
    if (dayOfWeek === 6) return true; // Make Saturdays unavailable
    return (dateSum % 7 === 0); // Make 30% booked
  }
  
  return false;
};

// Fixed special dates that are always available regardless of the algorithm
// These could be promotional dates or special occasions
export const getAlwaysAvailableDates = (): Date[] => {
  const specialDates = [
    new Date(2025, 3, 15), // April 15, 2025
    new Date(2025, 4, 1),  // May 1, 2025
    new Date(2025, 5, 10), // June 10, 2025
    new Date(2025, 6, 4),  // July 4, 2025
  ];
  
  return specialDates.map(date => startOfDay(date));
};

// Helper method to check if a date is in the list of always available dates
export const isAlwaysAvailableDate = (date: Date): boolean => {
  return getAlwaysAvailableDates().some(availableDate => 
    isSameDay(date, availableDate)
  );
};
