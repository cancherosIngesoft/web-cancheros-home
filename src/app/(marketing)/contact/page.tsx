import { Metadata } from "next";
import ContactForm from "@/components/forms/contact-form";

export const metadata: Metadata = {
  title: "Contacto | Cancheros",
  description:
    "Ponte en contacto con nosotros para cualquier consulta o sugerencia",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contacto</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Información de contacto
          </h2>
          <div className="space-y-4">
            <p>Email: info@cancheros.com</p>
            <p>Teléfono: +34 123 456 789</p>
            <p>Dirección: Tu dirección aquí</p>
          </div>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}
