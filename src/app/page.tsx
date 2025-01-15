"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import { useEffect } from "react";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSingIn = () => {
    signIn("auth0", {
      callbackUrl: "/reservar_cancha",
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroSection = document.querySelector(
        ".hero-section"
      ) as HTMLElement;
      if (heroSection) {
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="hero-section relative h-screen w-full flex items-center justify-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('/hero-soccer.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A6B51]/20" />

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <h1 className="text-7xl font-bold bg-gradient-to-t from-green-900 to-green-500 text-transparent bg-clip-text mb-6">
            Reserva canchas de fútbol en Bogotá
          </h1>
          <p className="text-xl text-black mb-8 max-w-3xl mx-auto font-medium">
            Encuentra canchas de futbol sintetico en Bogotá, de acuerdo lo que
            necesites, y realiza tu reserva de forma directa, sin esperas. Unete
            y crea tu equipo y disfruta de esta pasion que nos une
          </p>
          <div className="flex gap-6 justify-center">
            <Button
              variant="default"
              className="text-lg px-8"
              onClick={handleSingIn}
            >
              Iniciar sesión
            </Button>
            <Button
              variant="outline"
              className="text-lg px-8"
              onClick={() => router.push("/registro_host")}
            >
              Trabaja con nosotros
            </Button>
          </div>
        </motion.div>
      </motion.section>

      <main className="flex flex-col items-center justify-center max-w-7xl mx-auto px-4">
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-row items-center justify-center min-h-[600px] w-full py-16"
        >
          <p className="text-lg w-1/2">
            Sabemos lo dificil que es encontrar y reservar canchas para
            disfrutar de nuestra mayor pasion, por eso en CANCHEROS queremos que
            este proceso sea mucho mas rapido para jugadores y los dueños de las
            canchas. Crea tus clubes, e incluye a tus amigos aficionados del
            futbol en un solo lugar
          </p>
          <Image
            src="/soccer_photo.png"
            alt="Cancheros"
            width={800}
            height={800}
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center min-h-[400px] py-16"
        >
          <div className="relative text-center">
            <p className="text-2xl font-bold text-black">
              Por que solo nosotros entendemos lo que significa este deporte,
              <br />
              somos más que jugadores, somos
            </p>
            <p className="text-3xl font-bold text-green-500 relative z-10">
              CANCHEROS
            </p>
            <div className="absolute top-1/2 left-1/2 w-3/4 h-24 bg-green-200 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center min-h-[600px] py-16"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-t from-green-900 to-green-500 text-transparent bg-clip-text mb-16">
            Nuestros valores
          </h1>
          <div className="grid grid-cols-3 gap-x-24 gap-y-16 place-items-center max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/icons/soccer_ball.svg"
                alt="Soccer ball"
                width={150}
                height={150}
              />
              <p className="text-lg font-bold text-black mt-4">Empatía</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/icons/soccer_stadium.svg"
                alt="Soccer stadium"
                width={150}
                height={150}
              />
              <p className="text-lg font-bold text-black mt-4">Comunidad</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/icons/football_team.svg"
                alt="Valor 1"
                width={150}
                height={150}
              />
              <p className="text-lg font-bold text-black mt-4">Fraternidad</p>
            </div>
            <div className="col-span-3 flex justify-center w-full">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/icons/liberty.svg"
                  alt="Liberty"
                  width={150}
                  height={150}
                />
                <p className="text-lg font-bold text-black mt-4">Libertad</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex w-full gap-8 min-h-[400px] px-8 mb-16"
        >
          <div className="flex-1 bg-[#31B642] p-16 flex flex-col items-center justify-center text-white transition-all duration-300 hover:shadow-xl rounded-2xl">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold mb-8">Misión</h2>
              <p className="text-lg leading-relaxed">
                Cancheros facilita la organización de encuentros deportivos,
                ofreciendo servicios como reservas rápidas con información en
                tiempo real y pagos directos. Buscamos fomentar la comunidad del
                fútbol amateur en Bogotá al ofrecer una solución efectiva y
                fiable que simplifica la reserva y gestión de canchas. Diseñada
                con empatía por amantes del fútbol, cancheros promueve la
                libertad de organizar partidos según las necesidades de los
                jugadores, el respeto en cada interacción y la fraternidad que
                fortalece los lazos entre jugadores.
              </p>
            </div>
          </div>
          <div className="flex-1 bg-[#1A6B51] p-16 flex flex-col items-center justify-center text-white transition-all duration-300 hover:shadow-xl rounded-2xl">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold mb-8">Visión</h2>
              <p className="text-lg leading-relaxed">
                En cinco años, Cancheros será el principal soporte para la
                comunidad de fútbol amateur en Bogotá, facilitando la
                organización de partidos con libertad, empatía y respeto.
                Cancheros está diseñada para conectar jugadores y propietarios,
                transformar la experiencia del fútbol local al simplificar
                reservas y fortalecer la fraternidad entre los usuarios,
                promoviendo un ecosistema donde la pasión por el deporte une y
                beneficia a todos.
              </p>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
