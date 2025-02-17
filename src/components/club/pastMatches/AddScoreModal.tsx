"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Loader2, Shield } from 'lucide-react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addScoreToMatch } from "../../../actions/club_management/club_past_matches"
import { useTeamDataStore } from "@/store"
import ShieldTeamAIcon from "@/components/icon/ShieldTeamAIcon"
import ShieldTeamBIcon from "@/components/icon/ShieldTeamBIcon"


const scoreSchema = z.object({
  teamAScore: z.coerce
    .number({ 
      required_error: "El marcador es requerido",
      invalid_type_error: "El marcador debe ser un número" 
    })
    .min(0, "El marcador debe ser un número positivo")
    .max(99, "El marcador no puede ser mayor a 99"),
  teamBScore: z.coerce
    .number({ 
      required_error: "El marcador es requerido",
      invalid_type_error: "El marcador debe ser un número" 
    })
    .min(0, "El marcador debe ser un número positivo")
    .max(99, "El marcador no puede ser mayor a 99"),
})

type ScoreFormData = z.infer<typeof scoreSchema>

interface ScoreModalProps {
  isOpen: boolean
  onClose: () => void
  score: {teamName: string, teamId: string, score: number | undefined}[]
  idReservation: string
}

export default function ScoreModal({
  isOpen,
  onClose,
  score,
  idReservation,
}: ScoreModalProps) {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ScoreFormData>({
    resolver: zodResolver(scoreSchema),
  })
  const idTeam =useTeamDataStore((state) => state.idTeam)

  const queryClient = useQueryClient()

  const { mutate: addScore, isPending } = useMutation({
    mutationFn:(data: ScoreFormData) => {
      const scoreData = [
        { teamName: score[0].teamName, teamId: score[0].teamId, score: data.teamAScore },
        { teamName: score[1].teamName, teamId: score[1].teamId, score: data.teamBScore },
      ]
      return addScoreToMatch(idTeam, idReservation, scoreData)
    },
    onSuccess: () => {
      toast({
        title: "Marcador agregado",
        description: "El marcador se ha guardado correctamente",
      })
      queryClient.invalidateQueries({ queryKey: ["pastMatches", idTeam] })
      reset()
      onClose()
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo guardar el marcador",
      })
    },
  })

  const onSubmit = (data: ScoreFormData) => {
    addScore(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Agregar Marcador</DialogTitle>
        </DialogHeader>
        <form onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSubmit(onSubmit)(e)
        }}  className="space-y-6">
          <div className="flex gap-6 items-center">
            <div className="space-y-2 flex-1">
              <div className="text-center text-destructive font-semibold">
                {score[0].teamName}
              </div>
              <div className="flex justify-center">
                <div className="w-14 h-14 bg-destructive/10 rounded-full flex items-center justify-center">
                  <ShieldTeamAIcon className="w-10 h-10 text-destructive" />
                </div>
              </div>
              <div className="space-y-1">
                <Input
                  required
                  placeholder="Marcador"
                  {...register("teamAScore")}
                  className="text-center"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                />
                {errors.teamAScore && (
                  <p className="text-xs text-destructive text-center">
                    {errors.teamAScore.message}
                  </p>
                )}
              </div>
            </div>
            <span className="font-bold text-xl">-</span>

            <div className="space-y-2 flex-1">
              <div className="text-center text-primary font-semibold">
                {score[1].teamName}
              </div>
              <div className="flex justify-center">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <ShieldTeamBIcon className="w-10 h-10 text-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <Input
                  required
                  placeholder="Marcador"
                  {...register("teamBScore")}
                  className="text-center"
                  onClick={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                />
                {errors.teamBScore && (
                  <p className="text-xs text-destructive text-center">
                    {errors.teamBScore.message}
                  </p>
                )}
              </div>
              
            </div>
          </div>

          <Button
            type="submit"
            className="w-full "
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

