
export const progressMessages = {
  start: [
    "Let's create something magical together! 🪄",
    "Your dream invitation is about to come alive! ✨",
    "Ready to design something extraordinary? Let's go! 🚀"
  ],
  
  basicDetails: [
    "Great! Personal details noted. This will be uniquely yours! 🌟",
    "Perfect start! We'll craft something special just for you 💝",
    "Wonderful details! Now let's make your event shine! 🎉"
  ],
  
  deliveryFormats: [
    "Excellent format choices! Your guests will be so impressed 😍",
    "Smart selections! Your invitation will look amazing across all platforms 📱💻",
    "Perfect format picks! Now let's add some personality! 🎯"
  ],
  
  characterOptions: [
    "Your character selections will make this invitation pop! 🧙‍♂️",
    "Perfect character choices! Your invite will be just as you imagined 👥",
    "Your characters will bring your invitation to life! 🌈"
  ],
  
  content: [
    "We love your creativity! That will make for an amazing invite! 💡",
    "Your words will captivate your guests! Brilliant content! 📝",
    "Your message is going to shine through beautifully! ✨"
  ],
  
  colorPalette: [
    "You've got great taste! That palette will look stunning! 🎨",
    "Beautiful color choice! Your guests will be mesmerized! 🌈",
    "Perfect palette! These colors will make your invitation pop! 💫"
  ],
  
  animationStyles: [
    "Those animations will bring magic to your invite! ✨",
    "Great animation pick! Your invitation will come alive with these effects! 🌟",
    "Perfect animation choices! Your invitation will be unforgettable! 🎬"
  ],
  
  designStyle: [
    "Excellent style choice! So elegant and perfect for your event! 👑",
    "That design will make your invitation truly stand out! 🏆",
    "Beautiful style selection! It complements your theme perfectly! 🎭"
  ],
  
  deadline: [
    "Perfect timing! We're excited to create your invitation! ⏰",
    "Great! We'll have your beautiful invitation ready right on time! 📅",
    "Deadline noted! Your dream invitation is just around the corner! 🗓️"
  ],
  
  review: [
    "Almost there! Your dream invitation is taking shape! 🌠",
    "Just one final look! Your creation is nearly complete! 🏁",
    "It's all coming together beautifully! Ready for the final step? 💖"
  ],
  
  complete: [
    "Perfection achieved! Get ready to wow your guests! 🎊",
    "Congrats! Your stunning invitation is on its way to becoming reality! 🥂",
    "Amazing work! Your special day will be announced in style! 🎯"
  ]
};

export const getPreviousStepKey = (step: number): keyof typeof progressMessages => {
  switch(step) {
    case 0: return "start";
    case 1: return "basicDetails";
    case 2: return "deliveryFormats";
    case 3: return "characterOptions";
    case 4: return "content";
    case 5: return "colorPalette";
    case 6: return "animationStyles";
    case 7: return "designStyle";
    case 8: return "deadline";
    case 9: return "review";
    default: return "start";
  }
};
