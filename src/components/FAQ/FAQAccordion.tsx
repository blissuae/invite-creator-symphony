
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { X } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type FAQItem = {
  category: string;
  content: string | React.ReactNode;
};

interface FAQAccordionProps {
  onClose: () => void;
}

export const FAQAccordion = ({ onClose }: FAQAccordionProps) => {
  const faqItems: FAQItem[] = [
    {
      category: "Delivery Schedule",
      content: (
        <p>While we typically complete 85% of projects within the agreed timeline, there are occasions when changes or multiple rounds of revisions may extend the delivery by a few days. We recommend factoring in a bit of extra time to account for potential delays.</p>
      )
    },
    {
      category: "Working with Characters",
      content: (
        <p>When it comes to characters and faces, we aim to capture the likeness as accurately as possible. However, please note that we can't guarantee 100% accuracy, especially with facial features or clothing details. The more detailed references we receive, especially from different angles, the better the results we can provide. But do keep in mind, the final outcome may not match the reference images exactly.</p>
      )
    },
    {
      category: "Rounds of Changes",
      content: (
        <p>We offer up to 3 rounds of changes at no additional cost. Any additional revisions beyond that will be subject to extra charges, depending on the specific requests.</p>
      )
    },
    {
      category: "Refund Policy",
      content: (
        <div>
          <p>If you wish to cancel your order and request a refund after confirmation, please note the following:</p>
          <div className="mt-3 overflow-x-auto">
            <Table>
              <TableHeader className="bg-elegant-brown/5">
                <TableRow>
                  <TableHead className="w-1/2 font-serif text-elegant-brown">Project Stage</TableHead>
                  <TableHead className="w-1/2 font-serif text-elegant-brown">Refund Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Before We Start</TableCell>
                  <TableCell>90% of total amount</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">During Design Phase</TableCell>
                  <TableCell>50% of total amount</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">After Design Completion</TableCell>
                  <TableCell>No refunds available</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      )
    },
    {
      category: "Posting Policy",
      content: (
        <div>
          <p>As part of our marketing efforts, we post all completed projects on our social media pages. However, we respect your privacy, especially if the video includes personal details or faces. You can choose one of the following options for how we share the video:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>We'll post the video as is.</li>
            <li>We'll blur or hide the faces in the video.</li>
            <li>We'll remove names and event details to maintain privacy.</li>
          </ul>
          <p className="mt-2">Please let us know your preference so we can ensure we post the video in accordance with your wishes.</p>
          <p className="mt-2">Additionally, we'll only share the video publicly once you've either shared it or the event has passed, or you've explicitly given us permission to post.</p>
        </div>
      )
    },
    {
      category: "Watermark Policy",
      content: (
        <p>To maintain our brand identity, we include a watermark at the bottom of all videos. We don't remove it, except in special circumstances, such as when working with businesses or government entities where the watermark is not suitable.</p>
      )
    },
    {
      category: "Resale Rights",
      content: (
        <div>
          <p>Bliss retains the resale rights to completed projects, provided that any personalized elements included in the video—such as character faces, houses, or other custom features created upon request—are replaced.</p>
          <p className="mt-2">In general, however, we retain ownership of the videos we create and reserve the right to resell them to our audience as ready-made templates.</p>
        </div>
      )
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-auto relative">
        <button 
          onClick={onClose}
          className="absolute right-3 top-3 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-gray-700"
          aria-label="Close FAQ"
        >
          <X className="h-4 w-4" />
        </button>
        
        <div className="p-6">
          <h2 className="text-2xl font-serif text-elegant-brown mb-6 text-center">Frequently Asked Questions</h2>
          
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-elegant-brown/10 rounded-lg px-4">
                <AccordionTrigger className="text-elegant-brown font-serif py-3 hover:no-underline">
                  {item.category}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 pb-4">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
};
