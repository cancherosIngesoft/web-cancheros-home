import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">¡Fuera de juego!</h2>
      <Image src="/CANCHEROS.svg" alt="404" width={300} height={300} />
      <p className="mt-2">
        Parece que te adelantaste demasiado. Esta página está más allá de la
        línea defensiva.
      </p>
      <Link href="/" className="mt-4 text-blue-500 hover:text-blue-700">
        Volver al inicio
      </Link>
    </div>
  );
}
