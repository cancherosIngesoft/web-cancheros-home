"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { Shield, Upload, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { createClub } from "@/actions/club_management/club"
import { useSession } from "next-auth/react"
import { z } from "zod"
import { compressImage } from "@/utils/utils"
import CustomShield from "../icon/CustomShield"

export const createClubSchema = z.object({
  name: z.string().min(1, "El nombre es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  logo: z.instanceof(File).optional(),
})

export type CreateClubInput = z.infer<typeof createClubSchema>



interface CreateClubModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateClubModal({ isOpen, onClose }: CreateClubModalProps) {
  const { data: session } = useSession()
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<CreateClubInput>({
    resolver: zodResolver(createClubSchema),
  })

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
      setValue("logo", file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const onSubmit = async (data: CreateClubInput) => {
    mutation.mutate({
      id_captain: session?.user.id || "",
      name: data.name,
      description: data.description,
      logo: data.logo ? await compressImage(data.logo) : undefined
    })
  }

  const handleClose = () => {
    reset()
    setPreviewUrl("")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-center flex items-center text-2xl justify-center gap-2">
            <CustomShield className="h-10 w-10" />
            Crea tu club
            <CustomShield className="h-10 w-10" />
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex gap-4">
            <div className="w-1/3">
              <div className="w-full aspect-square relative flex flex-col ">
                <Label className=" text-sm text-center block font-bold">Icono</Label>

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
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer p-0"
                  aria-label="Icono de tu club"
                />
              </div>
            </div>
            <div className="w-2/3 space-y-4">
              <div>
                <Label htmlFor="name" className="font-bold">Nombre de tu club<span className="text-red-600">*</span></Label>
                <Input id="name" {...register("name")} />
                {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="description" className="font-bold">Descripción<span className="text-red-600">*</span></Label>
                <Textarea id="description" {...register("description")} className="min-h-[100px]" />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
              </div>
            </div>
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

  