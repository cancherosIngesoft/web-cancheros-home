"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Shield, Upload, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createClub } from "@/actions/club_management/club"
import { useSession } from "next-auth/react"


interface CreateClubModalProps {
  isOpen: boolean
  onClose: () => void
}



export function CreateClubModal({ isOpen, onClose }: CreateClubModalProps) {
  
  const { data: session, status } = useSession()
  console.log(session)

  const id_captain = session?.user.id || "" //debe ser remplazado por el autentico id del usuario
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [logo, setLogo] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: createClub,
    onSuccess: () => {
      toast({
        title: "Club creado exitosamente",
        description: "Tu club ha sido creado correctamente",
      })
      handleClose()
    },
    onError: (error: Error) => {
      toast({
        title: "Error al crear el club",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setLogo(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !description.trim()) {
      toast({
        title: "Campos requeridos",
        description: "El nombre y la descripción son obligatorios",
        variant: "destructive",
      })
      return
    }

    mutation.mutate({
      id_captain,
      name: name.trim(),
      description: description.trim(),
      logo: logo? URL.createObjectURL(logo) : "",
    })
  }

  const handleClose = () => {
    setName("")
    setDescription("")
    setLogo(null)
    setPreviewUrl("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center justify-center gap-2">
            <Shield className="h-6 w-6" />
            Crea tu club
            <Shield className="h-6 w-6" />
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4">
            <div className="w-32 h-32 relative">
              <div className="w-full h-full border-2 border-dashed rounded-lg flex items-center justify-center bg-gray-50">
                {previewUrl ? (
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <Upload className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Icono de tu club"
              />
              <Label className="mt-2 text-sm text-center block">Icono de tu club</Label>
            </div>
            <div className="flex-1">
              <Label htmlFor="name">Nombre de tu club</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full bg-[#4CAF50] hover:bg-[#45a049]" disabled={mutation.isPending}>
            {mutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creando...
              </>
            ) : (
              "Crear"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

