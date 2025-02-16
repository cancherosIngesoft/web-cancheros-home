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
import { Loader2 } from 'lucide-react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { addScoreToMatch } from "../../../actions/club_management/club_past_matches"
import { useTeamDataStore } from "@/store"


const scoreSchema = z.object({
  teamAScore: z.coerce
    .number()
    .min(0, "El marcador debe ser un número positivo")
    .max(99, "El marcador no puede ser mayor a 99"),
  teamBScore: z.coerce
    .number()
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
    mutationFn: async (data: ScoreFormData) => {
      const scoreData = [
        { teamName: score[0].teamName, teamId: score[0].teamId, score: data.teamAScore },
        { teamName: score[1].teamName, teamId: score[1 ].teamId, score: data.teamBScore },
      ]
        addScoreToMatch(idTeam, idReservation, scoreData)
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
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-center text-destructive font-semibold">
                EQUIPO A
              </div>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-destructive"
                    fill="currentColor"
                  >
                    <path d="M3.979 7.69a8.99 8.99 0 0 1 16.042 0l-8.021 4.63-8.021-4.63zm16.372.942a9 9 0 1 1-16.702 0L12 13.959l8.351-5.327z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <Input
                  placeholder="Marcador"
                  {...register("teamAScore")}
                  className="text-center"
                />
                {errors.teamAScore && (
                  <p className="text-xs text-destructive text-center">
                    {errors.teamAScore.message}
                  </p>
                )}
              </div>
              <div className="text-center text-sm font-medium">{score[0].teamName}</div>
            </div>

            <div className="space-y-2">
              <div className="text-center text-primary font-semibold">
                EQUIPO B
              </div>
              <div className="flex justify-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-8 h-8 text-primary"
                    fill="currentColor"
                  >
                    <path d="M3.979 7.69a8.99 8.99 0 0 1 16.042 0l-8.021 4.63-8.021-4.63zm16.372.942a9 9 0 1 1-16.702 0L12 13.959l8.351-5.327z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <Input
                  placeholder="Marcador"
                  {...register("teamBScore")}
                  className="text-center"
                />
                {errors.teamBScore && (
                  <p className="text-xs text-destructive text-center">
                    {errors.teamBScore.message}
                  </p>
                )}
              </div>
              <div className="text-center text-sm font-medium">{score[1].teamName}</div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#4CAF50] hover:bg-[#45a049]"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              "Consolidar"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

