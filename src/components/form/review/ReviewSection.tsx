
import React from "react";

interface ReviewSectionProps {
  title: string;
  content: React.ReactNode;
}

export const ReviewSection = ({ title, content }: ReviewSectionProps) => (
  <div className="space-y-2">
    <h3 className="text-elegant-brown font-serif text-lg">{title}</h3>
    <div className="text-gray-700">{content}</div>
  </div>
);
