'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { fetchRequestDetails, approveRequest, rejectRequest } from '@/actions/dashboardRequest'
import { Loader2 } from 'lucide-react'
import { PersonalInfoTab } from './PersonaInfoTab'
import { BusinessInfoTab } from './BussinessInfoTab'
import { LocationInfoTab } from './LocationInfoTab'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { useToast } from '@/hooks/use-toast'
import { ApproveConfirmation } from './ApproveConfirmation'
import { RejectConfirmation } from './RejectConfirmation'

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
    const [approveDialogOpen, setApproveDialogOpen] = useState(false)
    const [rejectDialogOpen, setRejectDialogOpen] = useState(false)

    const { toast } = useToast()
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
            toast({
                title: "Solicitud aprobada",
                description: "La solicitud ha sido aprobada exitosamente.",
                variant: "default",
            })
            onClose()
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Hubo un problema al aprobar la solicitud. Por favor, intente nuevamente.",
                variant: "destructive",
            })
        }
    })

    const rejectMutation = useMutation({
        mutationFn: ({ requestId, reason }: { requestId: string, reason: string }) =>
            rejectRequest(requestId, reason),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pendingRequests'] })
            queryClient.invalidateQueries({ queryKey: ['rejectedRequests'] })
            toast({
                title: "Solicitud rechazada",
                description: "La solicitud ha sido rechazada exitosamente.",
                variant: "default",
            })
            onClose()
        },
        onError: () => {
            toast({
                title: "Error",
                description: "Hubo un problema al rechazar la solicitud. Por favor, intente nuevamente.",
                variant: "destructive",
            })
        }
    })

    const handleApprove = () => {
        approveMutation.mutate(requestId)
        setApproveDialogOpen(false)
    }

    const handleReject = (reason: string) => {
        rejectMutation.mutate({ requestId, reason })
        setRejectDialogOpen(false)
    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="max-w-3xl pt-12">
                    <DialogHeader>
                        <DialogTitle className='font-bold text-2xl'>Detalles de la solicitud</DialogTitle>
                        <DialogDescription className='hidden'>información registrada en la solicitud</DialogDescription>
                    </DialogHeader>

                    {isLoading ? (
                        <div className="py-8 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                        </div>
                    ) : data ? (
                        <Tabs defaultValue="personal" className="w-full">
                            <TabsList className="relative flex justify-between w-full mb-6 bg-transparent border-none">
                                <div className="absolute top-1 left-0 w-full h-[2px] bg-gray-200" />
                                {[
                                    { value: "personal", label: "Información personal", step: 1 },
                                    { value: "business", label: "Información del negocio", step: 2 },
                                    { value: "location", label: "Ubicación", step: 3 }
                                ].map((tab) => (
                                    <TabsTrigger
                                        key={tab.value}
                                        value={tab.value}
                                        className="relative flex flex-col items-center gap-2 p-0 border-none data-[state=active]:bg-transparent data-[state=active]:shadow-none hover:bg-transparent group"
                                    >
                                        <div
                                            className="z-10 flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-600 transition-colors duration-200 group-data-[state=active]:bg-primary group-data-[state=active]:text-white"
                                        >
                                            {tab.step}
                                        </div>
                                        <span
                                            className="text-xs text-gray-600 transition-colors duration-200 group-data-[state=active]:text-emerald-600 group-data-[state=active]:font-bold"
                                        >
                                            {tab.label}
                                        </span>
                                    </TabsTrigger>
                                ))}
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
                                    onClick={() => setRejectDialogOpen(true)}
                                    disabled={approveMutation.isPending || rejectMutation.isPending}
                                >
                                    {rejectMutation.isPending ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        'Rechazar solicitud'
                                    )}
                                </Button>
                                <Button
                                    className="bg-primary hover:bg-primary-600"
                                    onClick={() => setApproveDialogOpen(true)}
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
            <ApproveConfirmation
                isOpen={approveDialogOpen}
                onClose={() => setApproveDialogOpen(false)}
                onConfirm={handleApprove}
            />
            <RejectConfirmation
                isOpen={rejectDialogOpen}
                onClose={() => setRejectDialogOpen(false)}
                onConfirm={handleReject}
            />
        </>
    )
}

