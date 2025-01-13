'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { fetchRequestDetails, approveRequest, rejectRequest } from '@/actions/dashboardRequest'
import { Loader2 } from 'lucide-react'
import { PersonalInfoTab } from './PersonaInfoTab'
import { BusinessInfoTab } from './BussinessInfoTab'
import { LocationInfoTab } from './LocationInfoTab'

interface RequestDetailModalProps {
  requestId: string
  isOpen: boolean
  onClose: () => void
}

export function RequestModalDetail({
  requestId,
  isOpen,
  onClose
}: RequestDetailModalProps) {
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean
    action: 'approve' | 'reject'
  }>({
    isOpen: false,
    action: 'approve'
  })

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['requestDetail', requestId],
    queryFn: () => fetchRequestDetails(requestId),
    enabled: isOpen
  })

  const approveMutation = useMutation({
    mutationFn: approveRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingRequests'] })
      onClose()
    }
  })

  const rejectMutation = useMutation({
    mutationFn: rejectRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pendingRequests'] })
      queryClient.invalidateQueries({ queryKey: ['rejectedRequests'] })
      onClose()
    }
  })

  const handleAction = (action: 'approve' | 'reject') => {
    setConfirmationDialog({ isOpen: true, action })
  }

  const handleConfirmAction = () => {
    if (confirmationDialog.action === 'approve') {
      approveMutation.mutate(requestId)
    } else {
      rejectMutation.mutate(requestId)
    }
    setConfirmationDialog({ isOpen: false, action: 'approve' })
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-3xl">
          {isLoading ? (
            <div className="py-8 flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
            </div>
          ) : data ? (
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="personal" className="flex-1">
                  Información personal
                </TabsTrigger>
                <TabsTrigger value="business" className="flex-1">
                  Información del negocio
                </TabsTrigger>
                <TabsTrigger value="location" className="flex-1">
                  Ubicación
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <PersonalInfoTab data={data.personalInfo} />
              </TabsContent>

              <TabsContent value="business">
                <BusinessInfoTab data={data.businessInfo} />
              </TabsContent>

              <TabsContent value="location">
                <LocationInfoTab data={data.locationInfo} />
              </TabsContent>

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  variant="destructive"
                  onClick={() => handleAction('reject')}
                  disabled={approveMutation.isPending || rejectMutation.isPending}
                >
                  {rejectMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Rechazar solicitud'
                  )}
                </Button>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => handleAction('approve')}
                  disabled={approveMutation.isPending || rejectMutation.isPending}
                >
                  {approveMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Aprobar solicitud'
                  )}
                </Button>
              </div>
            </Tabs>
          ) : null}
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={confirmationDialog.isOpen}
        onOpenChange={(isOpen) =>
          setConfirmationDialog({ ...confirmationDialog, isOpen })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              {confirmationDialog.action === 'approve'
                ? 'Esta acción aprobará la solicitud y notificará al usuario.'
                : 'Esta acción rechazará la solicitud y notificará al usuario.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className={
                confirmationDialog.action === 'approve'
                  ? 'bg-emerald-500 hover:bg-emerald-600'
                  : 'bg-destructive hover:bg-destructive/90'
              }
              onClick={handleConfirmAction}
            >
              {confirmationDialog.action === 'approve'
                ? 'Aprobar'
                : 'Rechazar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

