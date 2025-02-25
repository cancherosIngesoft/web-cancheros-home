"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import faq_data from "../../../utils/data/faq.json";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function FAQPage() {
  const faqItems = faq_data.faq_data;
  const [faqs, setFaqs] = useState<FAQItem[]>(faqItems);

  const toggleFAQ = (id: number) => {
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq))
    );
  };

  return (
    <main className="w-full px-4 py-12">
      <h1 className="text-3xl md:text-4xl font-bold text-[#1A6B51] text-center mb-8 md:mb-12 pb-4 md:pb-6 border-b border-gray-200 mx-auto max-w-3xl">
        Preguntas Frecuentes
      </h1>

      <div className="mx-auto max-w-3xl w-full px-4">
        <div className="w-full space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border border-gray-200 rounded-lg overflow-hidden w-full"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full flex items-center justify-between p-4 md:p-6 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                <h2 className="text-base md:text-lg font-bold text-[#1A6B51] pr-4 break-words whitespace-normal text-pretty hyphens-auto">
                  {faq.question}
                </h2>
                <ChevronDown
                  className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 text-[#1A6B51] transition-transform duration-200 ${
                    faq.isOpen ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-200 ${
                  faq.isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="p-4 md:p-6 text-gray-700 bg-gray-50 break-words hyphens-auto">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}