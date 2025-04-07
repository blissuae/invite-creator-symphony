
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
  const year = date.getFullYear();
  
  // Create a deterministic pattern based on the date's properties
  // This ensures consistency for the same dates
  
  // Base availability on numeric properties of the date
  const dateSum = day + month;
  const dateFactor = (day * month) % 11;
  const dateProduct = (day * (month + 1) * year) % 100;
  
  // Check if the date is 90+ days in the future
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const dayDiff = Math.floor((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const is90PlusDays = dayDiff >= 90;
  
  // Make dates in the urgent bracket very limited
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
    // Discount 300 bracket - Make 60% of dates unavailable with a pattern that feels more natural
    if (dayOfWeek === 0 || dayOfWeek === 3) return false; // Always keep Sundays and Wednesdays available
    
    // Make more dates available toward the end of this bracket
    const daysFromDiscount40 = Math.floor((date.getTime() - discountDate40.getTime()) / (1000 * 60 * 60 * 24));
    const totalDaysInBracket = Math.floor((discountDate70.getTime() - discountDate40.getTime()) / (1000 * 60 * 60 * 24));
    const percentThroughBracket = daysFromDiscount40 / totalDaysInBracket;
    
    // More dates available toward the end - from 60% booked to 40% booked
    const threshold = Math.floor(3 + (percentThroughBracket * 3)); // Threshold increases from 3 to 6
    return ((day + month) % 10) < threshold;
  }
  else if (date >= discountDate70) {
    // Discount 500 bracket - Make most dates available, especially 90+ days out
    
    // Always make weekends (Saturday/Sunday) available in this bracket
    if (dayOfWeek === 0 || dayOfWeek === 6) return false;
    
    // Make almost all dates available from 90+ days
    if (is90PlusDays) {
      // Only about 10% of dates are unavailable after 90 days
      return (day * month) % 20 === 0;
    }
    
    // For dates before 90 days in the 500 AED bracket, make about 30% unavailable
    if ((day % 7 === 3 && month % 2 === 1) || (dateProduct % 25 === 0)) {
      return true;
    }
    
    return false;
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
