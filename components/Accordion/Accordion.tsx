'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import useAccordion from './useAccordion';

export interface AccordionItem {
  question: string;
  answer: string;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const {
    state: { openIndex },
    actions: { toggle },
  } = useAccordion();

  return (
    <div className="divide-y overflow-hidden rounded border shadow-sm">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-900"
          >
            <button
              className="flex w-full items-center justify-between px-6 py-5 text-left font-medium hover:bg-gray-50 focus-visible:bg-gray-50 focus:outline-none dark:hover:bg-gray-800 dark:focus-visible:bg-gray-800"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold leading-snug">
                {item.question}
              </span>
              {isOpen ? (
                <ChevronDown className="h-5 w-5" />
              ) : (
                <ChevronRight className="h-5 w-5" />
              )}
            </button>
            {isOpen && (
              <div className="px-6 pb-6 pt-1 text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
