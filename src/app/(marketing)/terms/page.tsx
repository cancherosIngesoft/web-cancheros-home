import { Metadata } from "next";
import terms from "../../../utils/data/terms.json";

export const metadata: Metadata = {
  title: "Términos y Condiciones Cancheros",
  description: "Términos y condiciones de uso de nuestros servicios",
};

export default function TermsPage() {
  const termsContent = terms;
  return (
    <main className="container mx-auto px-4 py-8 prose prose-slate max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-[#1A6B51]">
        Términos y Condiciones
      </h1>
      {termsContent.terms.map((term) => (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4  text-[#1A6B51]">
            {term.title}
          </h2>
          <p>{term.description}</p>
        </section>
      ))}
    </main>
  );
}
