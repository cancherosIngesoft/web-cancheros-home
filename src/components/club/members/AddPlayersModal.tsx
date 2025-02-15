"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { X, UserPlus2 } from "lucide-react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/hooks/use-toast"
import { addPlayersTeam } from "@/actions/club_management/club_players_actions"
import PlayerWithBall from "@/components/icon/PlayerWithBall"

const emailSchema = z.string().email("Correo electrónico inválido")

export const addPlayersSchema = z.object({
  emails: z.array(
    z.object({
      value: z.string().email("Correo electrónico inválido")
    })
  ).min(1, "Debes agregar al menos un jugador"),
})

export type AddPlayersFormData = {
  emails: {
    value: string;
  }[];
}

interface AddPlayersModalProps {
  isOpen: boolean
  onClose: () => void
  idTeam: string
  idUserWhoAdd: string | null
}

export default function AddPlayersModal({ isOpen, onClose, idTeam, idUserWhoAdd }: AddPlayersModalProps) {
  const [currentEmail, setCurrentEmail] = useState("")

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<AddPlayersFormData>({
    resolver: zodResolver(addPlayersSchema),
    defaultValues: {
      emails: [],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "emails",
  })

  const { mutate: addPlayers, isPending } = useMutation({
    mutationFn: (emails: string[]) => {
      if (idUserWhoAdd === null) {
        throw new Error("Error en el id del usuario")
      }
      return addPlayersTeam(idTeam, emails, idUserWhoAdd)
    },
    onSuccess: () => {
      toast({
        title: "Jugadores agregados",
        description: "Los jugadores han sido agregados exitosamente al club",
        variant: "default",
      })
      remove() // Remove all fields at once
      onClose()
    },
    onError: (error: Error) => {
      toast({
        title: "No se ha podido realizar los fichajes",
        description: error.message,
        variant: "destructive",
      })
    },
  })

  const handleAddEmail = () => {
    const result = emailSchema.safeParse(currentEmail)
    if (result.success) {

      const isDuplicate = fields.some(field => field.value.toLowerCase() === currentEmail.toLowerCase())

      if (isDuplicate) {
        setError("emails", {
          type: "manual",
          message: "Este correo ya ha sido agregado",
        })
        return
      }

      append({ value: currentEmail })
      setCurrentEmail("")
      clearErrors("emails")
    } else {
      setError("emails", {
        type: "manual",
        message: result.error.errors[0].message,
      })
    }
  }

  const onSubmit = (data: AddPlayersFormData) => {
    const emailsArray = data.emails.map(email => email.value);
    addPlayers(emailsArray);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md w-[95%] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center justify-center gap-2 text-base sm:text-xl">
            <PlayerWithBall className="h-5 w-5 sm:h-12 sm:w-12  text-primary" />
            Fichar jugadores
          </DialogTitle>
          <DialogDescription className="text-center text-xs sm:text-sm text-muted-foreground">
            Ingresa los correos de tus amigos para agregarlos al Club

          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="jugador@gmail.com"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="button" variant="secondary" onClick={handleAddEmail} className="w-full sm:w-auto">
                Agregar
              </Button>
            </div>
            {fields.length > 0 && (
              <div className="rounded-md bg-primary-70/40 p-2 max-h-[200px] overflow-y-auto">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between rounded-md bg-background p-2 px-4 text-xs sm:text-sm mb-1 last:mb-0"
                  >
                    <span className="break-all pr-2">{field.value}</span>
                    <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} className="shrink-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            {errors.emails && <p className="text-xs sm:text-sm text-destructive px-1">{errors.emails.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={isPending || fields.length === 0}>
            {isPending ? "Agregando..." : "Fichar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

