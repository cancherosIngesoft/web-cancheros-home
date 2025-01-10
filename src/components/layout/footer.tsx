import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#defde2]">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between gap-8">
          {/* Company Info */}
          <div className="flex-1 min-w-[250px] space-y-4">
            <h3 className="text-gray-800 text-lg font-bold mb-4">Cancheros</h3>
            <p className="text-gray-600 text-sm">
              Facilitamos la reserva de canchas deportivas, conectando
              deportistas con los mejores espacios para jugar.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" className="hover:text-[#1A6B51]">
                <Image src="/icons/x.svg" alt="X" width={24} height={24} />
              </a>
              <a href="https://facebook.com" className="hover:text-[#1A6B51]">
                <Image
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a href="https://instagram.com" className="hover:text-[#1A6B51]">
                <Image
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-gray-800 text-lg font-bold mb-4">
              Enlaces Rápidos
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/canchas" className="hover:text-[#1A6B51]">
                  Buscar Canchas
                </Link>
              </li>
              <li>
                <Link href="/reservas" className="hover:text-[#1A6B51]">
                  Mis Reservas
                </Link>
              </li>
              <li>
                <Link href="/torneos" className="hover:text-[#1A6B51]">
                  Torneos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#1A6B51]">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-gray-800 text-lg font-bold mb-4">Soporte</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="hover:text-[#1A6B51]">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#1A6B51]">
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#1A6B51]">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#1A6B51]">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <p className="text-gray-600 text-sm">
              © {new Date().getFullYear()} Cancheros. Todos los derechos
              reservados.
            </p>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link href="/terms" className="hover:text-[#1A6B51]">
                Términos
              </Link>
              <Link href="/privacy" className="hover:text-[#1A6B51]">
                Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
