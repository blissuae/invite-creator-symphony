
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

const ACTIVITY_MESSAGES = [
  { text: "is filling in the form", needsCountry: true },
  { text: "just completed the form", needsCountry: true },
  { text: "just made a booking", needsCountry: true },
  { text: "is viewing invitation options", needsCountry: true },
  { text: "is bringing their story to life...", needsCountry: true },
  { text: "just started crafting their special invite!", needsCountry: true },
  { text: "is filling in their details – something beautiful is coming!", needsCountry: true },
  { text: "is almost ready to bloom...", needsCountry: true },
  { text: "just submitted a beautiful story!", needsCountry: true },
  { text: "just completed their order – let the magic begin!", needsCountry: true },
  { text: "just chose Bliss to celebrate a precious moment!", needsCountry: true },
  { text: "Someone just reserved their delivery slot. Limited spots left!", needsCountry: false },
  { text: "Real orders. Real stories. This is your sign to begin.", needsCountry: false },
  { text: "A moment of magic is being made in 🇶🇦...", needsCountry: false },
  { text: "The magic is real—and it's happening in 🇴🇲. Be next.", needsCountry: false },
  { text: "Need a hand? Email us at hello@bliss-go.com or DM us at @weave.bliss 💌", needsCountry: false },
  { text: "Questions about your order? We're here—reach out anytime!", needsCountry: false },
  { text: "Feeling unsure? Let's chat—hello@bliss-go.com or @weave.bliss 🤍", needsCountry: false },
  { text: "We love talking details—drop us a DM or email and let's make it perfect!", needsCountry: false },
  { text: "Not sure where to start? Message us—we've got you 💫", needsCountry: false },
  { text: "Bliss just got a new request 💫", needsCountry: true }
];

export const UserActivityPopup: React.FC = () => {
  const { toast } = useToast();
  const [nextPopupDelay, setNextPopupDelay] = useState<number>(getRandomDelay());
  
  function getRandomDelay(): number {
    // Return between 40-50 seconds
    return Math.floor(Math.random() * 10000) + 40000;
  }
  
  function getRandomCountry(): typeof GCC_COUNTRIES[0] {
    const randomIndex = Math.floor(Math.random() * GCC_COUNTRIES.length);
    return GCC_COUNTRIES[randomIndex];
  }
  
  function getRandomMessage(): {message: string, hasCountryFlag: boolean} {
    const randomIndex = Math.floor(Math.random() * ACTIVITY_MESSAGES.length);
    const messageTemplate = ACTIVITY_MESSAGES[randomIndex];
    
    if (messageTemplate.needsCountry) {
      const country = getRandomCountry();
      const prefix = Math.random() > 0.5 ? `A user from ${country.flag}` : `Someone in ${country.flag}`;
      return {
        message: `${prefix} ${messageTemplate.text}`,
        hasCountryFlag: true
      };
    } else {
      return {
        message: messageTemplate.text,
        hasCountryFlag: false
      };
    }
  }
  
  function showRandomUserActivity() {
    const { message, hasCountryFlag } = getRandomMessage();
    
    toast({
      title: "Happening Now on Bliss",
      description: (
        <p className="flex items-center gap-2">
          <span>{message}</span>
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
    const initialDelay = Math.floor(Math.random() * 15000) + 10000; // 10-25 seconds
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
