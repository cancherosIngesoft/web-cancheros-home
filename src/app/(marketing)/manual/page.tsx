import { Metadata } from "next";
import dynamic from "next/dynamic";

// Importamos el visor de PDF de manera dinámica para evitar problemas de SSR
const PDFViewer = dynamic(() => import("@/components/ui/PDFViewer"), {
  ssr: false,
  loading: () => <div>Cargando visor...</div>,
});

export const metadata: Metadata = {
  title: "Tutoriales | Cancheros",
  description:
    "Aprende a usar todas las funcionalidades de Cancheros con nuestros tutoriales",
};

export default function TutorialesPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-[#1A6B51] text-center mb-8">
        Tutoriales Cancheros
      </h1>

      {/* Introducción */}
      <section className="prose prose-lg mx-auto mb-16">
        <p className="lead text-xl text-gray-700">
          Descubre cómo aprovechar al máximo todas las funcionalidades de
          Cancheros con nuestros tutoriales detallados.
        </p>
      </section>

      {/* Sección del Manual PDF */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#1A6B51] mb-8">
          Manual de Usuario
        </h2>
        <div className="w-full h-[800px] border rounded-lg overflow-hidden mb-8">
          <PDFViewer pdfUrl="/documents/manual_usuario.pdf" />
        </div>
        <h2 className="text-2xl font-bold text-[#1A6B51] mb-8">
          Manual de Establecimiento
        </h2>
        <div className="w-full h-[800px] border rounded-lg overflow-hidden mb-8">
          <PDFViewer pdfUrl="/documents/manual_canchas.pdf" />
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center bg-green-50 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-[#1A6B51] mb-4">
          ¿Necesitas más ayuda?
        </h2>
        <p className="text-gray-600 mb-6">
          Si tienes alguna duda adicional, no dudes en contactar a nuestro
          equipo de soporte.
        </p>
        <a
          href="/contacto"
          className="bg-[#1A6B51] text-white px-6 py-3 rounded-lg hover:bg-[#31B642] transition-colors inline-block"
        >
          Contactar Soporte
        </a>
      </section>
    </main>
  );
}
