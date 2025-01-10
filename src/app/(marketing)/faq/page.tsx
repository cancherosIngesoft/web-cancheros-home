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
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-[#1A6B51] text-center mb-12 pb-6 border-b border-gray-200">
        Preguntas Frecuentes
      </h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full flex items-center justify-between p-6 text-left bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <h2 className="text-lg font-bold text-[#1A6B51] pr-8">
                {faq.question}
              </h2>
              <ChevronDown
                className={`w-6 h-6 text-[#1A6B51] transition-transform duration-200 ${
                  faq.isOpen ? "transform rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-200 ${
                faq.isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <p className="p-6 text-gray-700 bg-gray-50">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
