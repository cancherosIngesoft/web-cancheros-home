import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preguntas Frecuentes | Cancheros",
  description:
    "Encuentra respuestas a las preguntas más comunes sobre nuestros servicios",
};

const faqs = [
  {
    question: "¿Pregunta 1?",
    answer: "Respuesta detallada a la pregunta 1...",
  },
  {
    question: "¿Pregunta 2?",
    answer: "Respuesta detallada a la pregunta 2...",
  },
  // Añade más preguntas aquí
];

export default function FAQPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Preguntas Frecuentes</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b pb-4">
            <h2 className="text-xl font-semibold mb-2">{faq.question}</h2>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
