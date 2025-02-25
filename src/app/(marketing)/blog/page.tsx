import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Blog | Cancheros",
  description: "Descubre todas las características y beneficios de Cancheros",
};

export default function BlogPage() {
  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold text-[#1A6B51] text-center mb-8">
        Descubre Cancheros
      </h1>

      {/* Introducción */}
      <section className="prose prose-lg mx-auto mb-16">
        <p className="lead text-xl text-gray-700">
          Cancheros es la plataforma líder en Bogotá para la reserva de canchas
          de fútbol, diseñada para conectar jugadores apasionados con los
          mejores espacios deportivos de la ciudad.
        </p>
      </section>

      {/* Video Placeholder */}
      <div className="aspect-w-16 aspect-h-40 mb-16">
        <iframe
          className="w-full h-[50vh]"
          src="https://www.youtube.com/embed/vZdXZ88SJBI"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Características Principales */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1A6B51]">Para Jugadores</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">⚽</div>
              <div>
                <h3 className="font-semibold">Reservas Instantáneas</h3>
                <p className="text-gray-600">
                  Encuentra y reserva canchas en tiempo real, sin llamadas ni
                  esperas.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">🎮</div>
              <div>
                <h3 className="font-semibold">Interfaz Intuitiva</h3>
                <p className="text-gray-600">
                  Explora canchas, verifica disponibilidad y realiza pagos de
                  forma sencilla.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">👥</div>
              <div>
                <h3 className="font-semibold">Gestión de Equipos</h3>
                <p className="text-gray-600">
                  Crea y administra tus equipos, organiza partidos y mantén el
                  registro de resultados.
                </p>
              </div>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1A6B51]">
            Para Propietarios
          </h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">📊</div>
              <div>
                <h3 className="font-semibold">Control Total</h3>
                <p className="text-gray-600">
                  Gestiona tus canchas, horarios y reservas desde un solo lugar.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">💰</div>
              <div>
                <h3 className="font-semibold">Pagos Seguros</h3>
                <p className="text-gray-600">
                  Recibe pagos de forma segura y automática por cada reserva.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="rounded-full bg-green-100 p-2">📈</div>
              <div>
                <h3 className="font-semibold">Visibilidad</h3>
                <p className="text-gray-600">
                  Aumenta la visibilidad de tu negocio y alcanza más clientes.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Proceso de Uso */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-[#1A6B51] mb-8">
          ¿Cómo Funciona?
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl mb-4">1️⃣</div>
            <h3 className="font-semibold mb-2">Explora</h3>
            <p className="text-gray-600">
              Encuentra la cancha perfecta según tus necesidades
            </p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl mb-4">2️⃣</div>
            <h3 className="font-semibold mb-2">Reserva</h3>
            <p className="text-gray-600">
              Selecciona fecha, hora y realiza el pago
            </p>
          </div>
          <div className="text-center p-6 bg-green-50 rounded-lg">
            <div className="text-3xl mb-4">3️⃣</div>
            <h3 className="font-semibold mb-2">¡Juega!</h3>
            <p className="text-gray-600">
              Disfruta de tu partido y califica tu experiencia
            </p>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="bg-[#31B642] p-8 rounded-xl text-white">
          <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
          <p>
            Facilitar la organización de encuentros deportivos, ofreciendo
            servicios como reservas rápidas con información en tiempo real y
            pagos directos. Buscamos fomentar la comunidad del fútbol amateur en
            Bogotá.
          </p>
        </div>
        <div className="bg-[#1A6B51] p-8 rounded-xl text-white">
          <h2 className="text-2xl font-bold mb-4">Nuestra Visión</h2>
          <p>
            Ser el principal soporte para la comunidad de fútbol amateur en
            Bogotá, facilitando la organización de partidos con libertad,
            empatía y respeto.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="text-center bg-green-50 p-8 rounded-xl">
        <h2 className="text-2xl font-bold text-[#1A6B51] mb-4">
          ¿Listo para empezar?
        </h2>
        <p className="text-gray-600 mb-6">
          Únete a la comunidad de Cancheros y comienza a disfrutar del fútbol de
          una manera más organizada.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/auth/signin"
            className="bg-[#1A6B51] text-white px-6 py-3 rounded-lg hover:bg-[#31B642] transition-colors"
          >
            Registrarme como Jugador
          </a>
          <a
            href="/registro_host"
            className="bg-white text-[#1A6B51] border border-[#1A6B51] px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
          >
            Registrar mi Cancha
          </a>
        </div>
      </section>
    </main>
  );
}
