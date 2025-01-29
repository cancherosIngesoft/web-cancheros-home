"use client"

import { Button } from "@/components/ui/button"
import { Shield, X } from "lucide-react"
import { useState } from "react"
import { CreateClubModal } from "./CreateClubModal"

interface Club {
  name: string
  players: number
  icon?: string
}

interface ClubsPanelProps {
  isOpen: boolean
  onClose: () => void
  navbarWidth: number
}

export function PanelClub({ isOpen, onClose, navbarWidth }: ClubsPanelProps) {
  const clubs: Club[] = [
    { name: "EPIS FC", players: 22 },
    { name: "EPIS FC", players: 22 },
    { name: "EPIS FC", players: 22 },
  ]
  const [isCreateClubOpen, setIsCreateClubOpen] = useState(false)

  return (
    <>
    <div
      style={{ left: `${navbarWidth}px`}}
      className={`fixed top-0 h-full w-[25vw] z-10 bg-surface shadow-lg transform transition-all duration-300 ease-in-out ${
        isOpen ? "translate-x-0 opacity-100 " : "-translate-x-[40vw] opacity-0  "
      } `}
    >
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Mis Clubes</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <Button variant="outline" className="flex items-center gap-2 mb-6 w-full border-2" onClick={()=>setIsCreateClubOpen(true)} >
          <Shield className="w-5 h-5" />
          <span>Crear Equipo</span>
        </Button>

        <p className="text-sm text-gray-600 mb-4">Estos son los clubes a los que perteneces actualmente</p>

        <div className="space-y-3">
          {clubs.map((club, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-[#4CAF50] rounded-lg text-white">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                {club.icon ? (
                  <img src={club.icon || "/placeholder.svg"} alt={club.name} className="w-6 h-6" />
                ) : (
                  <Shield className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="font-medium">{club.name}</p>
                <div className="flex items-center gap-1 text-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                  </svg>
                  <span>{club.players}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <CreateClubModal
        isOpen={isCreateClubOpen}
        onClose={() => setIsCreateClubOpen(false)}
        
      />
    </>
    
  )
}

