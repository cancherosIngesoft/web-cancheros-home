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
            "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/hero-soccer.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A6B51]/40" />

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
            La forma más inteligente de reservar canchas
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Únete a la comunidad deportiva más grande de Bogotá. Reserva
            canchas, organiza partidos y conecta con otros jugadores, todo en un
            solo lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button
              variant="default"
              className="text-base lg:text-lg px-8 bg-green-500 hover:bg-green-600"
              onClick={handleSingIn}
            >
              Comenzar ahora
            </Button>
            <Button
              variant="outline"
              className="text-base lg:text-lg px-8 text-black border-white hover:bg-white/10 hover:text-white"
              onClick={() => router.push("/registro_host")}
            >
              Registrar mi cancha
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
          className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 w-full"
        >
          {[
            { number: "1000+", label: "Usuarios activos" },
            { number: "50+", label: "Canchas registradas" },
            { number: "5000+", label: "Reservas exitosas" },
            { number: "4.8/5", label: "Calificación promedio" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 w-full"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Todo lo que necesitas en un solo lugar
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "⚡",
                title: "Reservas instantáneas",
                description:
                  "Encuentra y reserva canchas en tiempo real, sin llamadas ni esperas.",
              },
              {
                icon: "💳",
                title: "Pagos seguros",
                description:
                  "Realiza pagos de forma segura y recibe confirmación instantánea.",
              },
              {
                icon: "📱",
                title: "Gestión simple",
                description:
                  "Administra tus reservas, equipos y partidos desde cualquier dispositivo.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-16 w-full bg-gray-50 -mx-4 px-4"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Lo que dicen nuestros usuarios
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "Cancheros ha revolucionado la forma en que organizamos nuestros partidos semanales. ¡Es increíblemente fácil de usar!",
                author: "Carlos R.",
                role: "Capitán de equipo",
              },
              {
                quote:
                  "Como dueño de canchas, he visto un aumento significativo en las reservas desde que me uní a la plataforma.",
                author: "Andrea M.",
                role: "Propietaria de complejo deportivo",
              },
              {
                quote:
                  "La mejor parte es poder ver la disponibilidad en tiempo real y hacer reservas instantáneas.",
                author: "Juan D.",
                role: "Jugador frecuente",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="mb-4">⭐⭐⭐⭐⭐</div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center min-h-[600px] py-16"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-t from-green-900 to-green-500 text-transparent bg-clip-text mb-16">
            Nuestros valores
          </h1>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-12 md:gap-x-24 md:gap-y-16 items-center max-w-6xl mx-auto">
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/icons/soccer_ball.svg"
                alt="Soccer ball"
                width={120}
                height={120}
                className="w-24 md:w-32 lg:w-40 h-auto"
              />
              <p className="text-lg font-bold text-black mt-4">Empatía</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/icons/soccer_stadium.svg"
                alt="Soccer stadium"
                width={150}
                height={150}
                className="w-24 md:w-32 lg:w-40 h-auto"
              />
              <p className="text-lg font-bold text-black mt-4">Comunidad</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src="/icons/football_team.svg"
                alt="Valor 1"
                width={150}
                height={150}
                className="w-24 md:w-32 lg:w-40 h-auto"
              />
              <p className="text-lg font-bold text-black mt-4">Fraternidad</p>
            </div>
            <div className="md:col-span-3 flex justify-center w-full">
              <div className="flex flex-col items-center justify-center">
                <Image
                  src="/icons/liberty.svg"
                  alt="Liberty"
                  width={150}
                  height={150}
                  className="w-24 md:w-32 lg:w-40 h-auto"
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
          className="flex flex-col md:flex-row w-full gap-8 min-h-[400px] px-4 md:px-8 mb-16"
        >
          <div className="flex-1 bg-[#31B642] p-8 md:p-16 flex flex-col items-center justify-center text-white transition-all duration-300 hover:shadow-xl rounded-2xl">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Misión</h2>
              <p className="text-base md:text-lg leading-relaxed">
                Cancheros facilita la organización de encuentros deportivos,
                ofreciendo servicios como reservas rápidas con información en
                tiempo real y pagos directos. Buscamos fomentar la comunidad del
                fútbol amateur en Bogotá al ofrecer una solución efectiva y
                fiable que simplifica la reserva y gestión de canchas.
              </p>
            </div>
          </div>
          <div className="flex-1 bg-[#1A6B51] p-8 md:p-16 flex flex-col items-center justify-center text-white transition-all duration-300 hover:shadow-xl rounded-2xl">
            <div className="max-w-2xl mx-auto text-center space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Visión</h2>
              <p className="text-base md:text-lg leading-relaxed">
                En cinco años, Cancheros será el principal soporte para la
                comunidad de fútbol amateur en Bogotá, facilitando la
                organización de partidos con libertad, empatía y respeto.
                Cancheros está diseñada para conectar jugadores y propietarios,
                transformando la experiencia del fútbol local.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full py-16 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl mb-16"
        >
          <div className="text-center max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              ¿Listo para revolucionar tu experiencia futbolística?
            </h2>
            <p className="text-lg mb-8">
              Únete a miles de jugadores que ya están disfrutando de una forma
              más inteligente de jugar fútbol.
            </p>
            <Button
              variant="default"
              className="text-base lg:text-lg px-8 bg-white text-green-700 hover:bg-gray-100 hover:text-black"
              onClick={handleSingIn}
            >
              Comenzar ahora
            </Button>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
