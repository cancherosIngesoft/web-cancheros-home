import { CardMember, Miembro } from '@/components/aboutUs/CardMember'
import { Trophy, Crosshair, Users, DollarSign } from 'lucide-react'
import Image from 'next/image'

const miembrosEquipo: Miembro[] = [
  {
    imageUrl: '/Simoncho.jpg',
    nombre: 'Jose Simon Ramos',
    funcion: 'Desarrollador Backend',
    scrumMaster: 'Scrum Master 1',
    descripcion: 'Apasionado por la programación y el fútbol',
    equipoFavorito: 'Millonarios',
    logoEquipoFavoritoUrl: '/Millonarios.png',
    linkedinUrl: 'https://www.linkedin.com/in/juanperez',
  },
  {
    imageUrl: '/JuanDa.JPG',
    nombre: 'Juan Manuel Cortes',
    funcion: 'Desarrollador Frontend',
    scrumMaster: 'Scrum Master 2',
    descripcion: 'Apasionado por la programación y el fútbol',
    equipoFavorito: 'Patriotas',
    logoEquipoFavoritoUrl: '/Patriotas.png',
    linkedinUrl: 'https://www.linkedin.com/in/jcortesj/',
  },
  {
    imageUrl: '/JuanDa.JPG',
    nombre: 'Miguel Angel Parrado',
    funcion: 'Desarrollador Backend',
    scrumMaster: 'Scrum Master 3',
    descripcion: 'Apasionado por la programación y el fútbol',
    equipoFavorito: 'Bmerica de Cali',
    logoEquipoFavoritoUrl: '/AmericaDeCali.png',
    linkedinUrl: 'https://www.linkedin.com/in/miguelparrado/',
  },
  {
    imageUrl: '/JuanDa.JPG',
    nombre: 'Juan David Palacios',
    funcion: 'Desarrollador Frontend',
    scrumMaster: 'Scrum Master 4',
    descripcion: 'Apasionado por la programación y el fútbol',
    equipoFavorito: 'Barcelona FC',
    logoEquipoFavoritoUrl: '/Barcelona.png',
    linkedinUrl: 'https://www.linkedin.com/in/juandapalacios/',
  },
  // Añadir más miembros del equipo aquí
]

const SobreNosotros = () => {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Sección Hero con degradado */}
      <div className="text-center mb-8">
        <div className='flex flex-col items-center'>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-t from-green-600 to-green-800 text-transparent bg-clip-text">
          Sobre Nosotros
        </h1>
        <Image src="/CANCHEROS.svg" alt="Cancheros" width={300} height={300} className="rounded-2xl" />
        

        </div>
        
      </div>

      {/* Sección de propuesta de valor */}
      <div className="mb-20">
        <div className="bg-green-50 rounded-2xl p-8 md:p-12 mb-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6">¿Qué es Cancheros?</h2>
          <p className="text-lg text-gray-700 mb-6">
            Plataforma líder en Bogotá para reservar canchas de fútbol.
            Simplificamos la organización de partidos mientras generamos oportunidades económicas para propietarios.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                <Trophy className="w-6 h-6" /> Nuestro enfoque
              </h3>
              <p className="text-gray-600">
                Combinamos tecnología innovadora con pasión deportiva para crear experiencias únicas
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                <Crosshair className="w-6 h-6" /> Objetivo principal
              </h3>
              <p className="text-gray-600">
                Eliminar barreras logísticas en la organización de partidos
              </p>
            </div>
          </div>
        </div>

        

        {/* Sección de equipo */}
        <div className="text-center ">
          <h2 className="text-3xl font-bold text-green-800 mb-2">Nuestro Equipo</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Apasionados por el fútbol y la tecnología trabajando para tu mejor experiencia
          </p>
          <div className="flex flex-row w-full justify-center flex-wrap gap-6">
            {miembrosEquipo.map((miembro, index) => (
              <CardMember key={index} {...miembro} />
            ))}
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default SobreNosotros