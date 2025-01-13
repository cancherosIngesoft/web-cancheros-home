import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useRegistroHost } from "@/hooks/useRegistroHost";

export function CongratulationsStep() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-10">
      <h1 className="text-2xl font-bold mt-10">
        Felicidades! Tu solicitud ha sido enviada
      </h1>
      <p>
        Por favor, espera que uno de nuestros administradores se ponga en
        contacto contigo por correo electrónico.
      </p>
      <Image
        src="/CANCHEROS.svg"
        alt="congratulations"
        width={200}
        height={200}
      />
      <Button onClick={() => router.push("/")}>Volver al inicio</Button>
    </div>
  );
}
