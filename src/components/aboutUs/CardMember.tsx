import { LinkedinIcon, UserIcon } from "lucide-react"
import Image from "next/image"

export interface Miembro {
    imageUrl: string
    nombre: string
    funcion: string
    scrumMaster: string
    descripcion: string
    equipoFavorito: string
    logoEquipoFavoritoUrl: string
    linkedinUrl: string
}

export function CardMember({
    imageUrl,
    nombre,
    funcion,
    scrumMaster,
    descripcion,
    equipoFavorito,
    logoEquipoFavoritoUrl,
    linkedinUrl,
}: Miembro) {
    return (
        <div className="flex flex-row items-center rounded-lg p-6 bg-primary-98 border-2 border-gray-200 from-green-300 w-[30rem]  to-green-100 from-5% backdrop-blur-lg shadow-lg transition transform hover:scale-105">
            <Image
                src={imageUrl || "/placeholder.svg"}
                alt={nombre}
                className="w-32 h-36 rounded-md object-cover mr-6"
                width={100}
                height={100}
            />
            <div className="flex flex-col flex-1 items-center">
                <h3 className="text-2xl font-bold text-gray-900">{nombre}</h3>
                <p className="text-sm font-bold text-gray-700">{funcion}</p>
                {scrumMaster && (
                    <span className="inline-block bg-primary text-white text-xs px-3 py-1 rounded-md mt-1">
                        {scrumMaster}
                    </span>
                )}
                {/* <p className="mt-2 text-gray-800">{descripcion}</p> */}
                <div className="flex flex-col items-center  mt-4 gap-2">
                    <span className="text-sm font-medium text-gray-700">Hincha de:</span>
                    
                        
                        <Image
                        src={logoEquipoFavoritoUrl || "/placeholder.svg"}
                        alt={`Logo de ${equipoFavorito}`}
                        className="w-10 h-10   "
                        width={100}
                        height={100}
                    />
                        <span className="text-sm font-semibold text-gray-900">{equipoFavorito}</span>
                    
                </div>
                <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800"
                >
                    <LinkedinIcon className="w-4 h-4 mr-2" />
                    Perfil de LinkedIn
                </a>
            </div>
        </div>
    )

}

