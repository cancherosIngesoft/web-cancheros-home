import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contacto | Cancheros",
  description:
    "Ponte en contacto con nosotros para cualquier consulta o sugerencia",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1A6B51] text-center mb-8">
          Contacto
        </h1>

        <div className="grid md:grid-cols-2 gap-8 items-start justify-center">
          {/* Información de Contacto */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-[#1A6B51] mb-6">
              Información de contacto
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Link
                  href="mailto:cancherosfb@gmail.com"
                  className="text-gray-600 hover:text-[#1A6B51] transition-colors duration-200"
                >
                  📧 cancherosfb@gmail.com
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Link
                  href="https://api.whatsapp.com/send/?phone=%2B573023242843&text&type=phone_number&app_absent=0"
                  className="text-gray-600 hover:text-[#1A6B51] transition-colors duration-200"
                >
                  📱 WhatsApp
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-600">
                  📍 Cl. 7a 73 B - 98, Bogotá
                </span>
              </div>
            </div>
          </div>

          {/* Formulario de Google */}
          <div className="w-[600px] h-[500px] bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <iframe
              src="https://docs.google.com/forms/d/e/1FAIpQLSfEeNEavXDLm7pP5eVdHw6piCl4lTvZiT3BOyvnvxqvuWV6lQ/viewform?embedded=true"
              className="w-full h-full"
            >
              Cargando…
            </iframe>
          </div>
        </div>
      </div>
    </main>
  );
}
