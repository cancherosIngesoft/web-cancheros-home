import { Button } from "@/components/ui/button";
import { useRegistroHost } from "@/hooks/useRegistroHost";

export function WelcomeStep() {
  const { nextStep } = useRegistroHost();

  return (
    <div className="flex flex-col items-center justify-center text-center gap-10">
      <h1 className="text-2xl font-bold mt-10">
        Bienvenido a la plataforma de Cancheros
      </h1>
      <p>
        Por favor, completa el siguiente formulario para comenzar el proceso de
        registro como dueño de cancha. Con esto, podrás empezar a recibir
        reservas y gestionar tus ganancias de manera fácil y segura.
      </p>
    </div>
  );
}
