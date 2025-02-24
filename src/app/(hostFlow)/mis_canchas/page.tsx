"use client";
import { IField, getFieldsById } from "@/actions/registro_host/field";
import { GenericCard } from "@/components/field/genericCard";
import { AddFieldModal } from "@/components/forms/fields-register/addFieldModal";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselItem } from "@/components/ui/carousel";
import { useGlobalStore, useShallow } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
export default function pageMisCanchas() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fields, setFields] = useState<IField[]>([]);
  const auth = useGlobalStore(useShallow((state) => state.auth));
  const clearStore = useGlobalStore(useShallow((state) => state.clearStore));
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchFields = async () => {
      if (auth.id) {
        setIsLoading(true);
        const fields = await getFieldsById(auth.id.toString());
        setFields(fields);
        setIsLoading(false);
      }
    };
    fetchFields();
  }, [auth.id]);
  return (
    <article className="flex flex-col items-start justify-start w-full h-screen  self-center">
      <section className="flex flex-col items-start gap-4 mb-10  align-start w-full ">
        <div className="flex flex-row items-start gap-4 justify-between w-full">
          <div className="flex flex-row items-center gap-4">
            <Image
              src="/icons/canchaGris.svg"
              alt="Logo"
              width={50}
              height={50}
            />
            <h1 className="text-2xl font-bold text-[#1A6B51]">TUS CANCHAS</h1>
          </div>

          <Button variant="default" onClick={() => {
            clearStore("field");
            setIsModalOpen(true);
          }}>
            Agregar Cancha
          </Button>
        </div>
        <div className="flex flex-row items-start gap-32 mt-5 align-top self-start ">
          <p className="text-center text-sm text-gray-500 ">
            Registra las canchas de tu complejo deportivo y ajusta su
            disponibilidad para recibir reservas.
          </p>

        </div>
      </section>
      <div className="w-full flex justify-center">

        <AddFieldModal open={isModalOpen} onOpenChange={setIsModalOpen} />
        <article className="flex flex-col items-center gap-4 mt-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <Loader2 className="w-10 h-10 animate-spin" />
            </div>
          ) : fields.length > 0 ? (
            <Carousel className="w-full flex gap-4 overflow-x-auto overflow-y-hidden items-center max-h-[24rem] p-2 border-2 border-gray-100 rounded-lg max-w-[80vw]">
              
                {fields.map((field) => (
                  <CarouselItem
                    key={field.id_cancha}
                    className="flex-none w-[300px] h-[22rem]"
                  >
                    <GenericCard field={field} />
                  </CarouselItem>
                ))}
              
            </Carousel>
          ) : (
            <>
              <Image
                src="/icons/canchaGris.svg"
                alt="Logo"
                width={150}
                height={150}
              />
              <p className="text-center text-sm text-gray-500 p-20 pt-10 pb-0 w-[40vw]">
                Actualmente no tienes canchas, agrega las canchas de tu complejo
                deportivo para empezar a recibir reservas y conectar con más
                clientes. Es rápido y sencillo. ¡Haz clic en el botón y comienza
                ahora!
              </p>
              <Button
                variant="default"
                onClick={() => {
                  clearStore("field");
                  setIsModalOpen(true);
                }}
              >
                Registrar mi primera Cancha
              </Button>
            </>
          )}
        </article>

      </div>

    </article>
  );
}
