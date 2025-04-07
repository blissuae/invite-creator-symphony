
import React, { useState, useEffect } from 'react';
import { Flag } from 'lucide-react';
import { useInterval } from '@/hooks/use-interval';
import { useToast } from '@/hooks/use-toast';

const GCC_COUNTRIES = [
  { name: 'UAE', flag: '🇦🇪' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Qatar', flag: '🇶🇦' },
  { name: 'Kuwait', flag: '🇰🇼' },
  { name: 'Bahrain', flag: '🇧🇭' },
  { name: 'Oman', flag: '🇴🇲' }
];

const ACTIONS = [
  'is filling in the form',
  'just completed the form',
  'just made a booking',
  'is viewing invitation options'
];

export const UserActivityPopup: React.FC = () => {
  const { toast } = useToast();
  const [nextPopupDelay, setNextPopupDelay] = useState<number>(getRandomDelay());
  
  function getRandomDelay(): number {
    // Return between 30-50 seconds
    return Math.floor(Math.random() * 20000) + 30000;
  }
  
  function getRandomCountry(): typeof GCC_COUNTRIES[0] {
    const randomIndex = Math.floor(Math.random() * GCC_COUNTRIES.length);
    return GCC_COUNTRIES[randomIndex];
  }
  
  function getRandomAction(): string {
    const randomIndex = Math.floor(Math.random() * ACTIONS.length);
    return ACTIONS[randomIndex];
  }
  
  function showRandomUserActivity() {
    const country = getRandomCountry();
    const action = getRandomAction();
    
    toast({
      title: "User Activity",
      description: (
        <p className="flex items-center gap-2">
          <span className="text-xl">{country.flag}</span>
          <span>A user from {country.name} {action}</span>
        </p>
      ),
      duration: 5000,
      className: "bottom-left-toast",
    });
    
    // Set next popup delay
    setNextPopupDelay(getRandomDelay());
  }
  
  // Show first popup after a short delay
  useEffect(() => {
    const initialDelay = Math.floor(Math.random() * 10000) + 5000; // 5-15 seconds
    const timer = setTimeout(() => {
      showRandomUserActivity();
    }, initialDelay);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Setup interval for recurring popups
  useInterval(() => {
    showRandomUserActivity();
  }, nextPopupDelay);
  
  return null; // This component doesn't render anything visually
};
