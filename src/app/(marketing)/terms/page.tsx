import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones Cancheros",
  description: "Términos y condiciones de uso de nuestros servicios",
};

export default function TermsPage() {
  return (
    <main className="container mx-auto px-4 py-8 prose prose-slate max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Términos y Condiciones</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introducción</h2>
        <p>
          Al acceder y utilizar este sitio web, usted acepta estar sujeto a los
          siguientes términos y condiciones de uso...
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Uso del Servicio</h2>
        <p>
          Nuestros servicios están disponibles solo para personas que puedan
          celebrar contratos legalmente vinculantes...
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Privacidad</h2>
        <p>
          Por favor, revise nuestra Política de Privacidad, que también rige su
          visita a nuestro sitio web...
        </p>
      </section>
    </main>
  );
}
