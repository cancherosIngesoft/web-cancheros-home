'use client'

import { useQuery } from '@tanstack/react-query'
import { RequestCard } from './RequestCard'
import { fetchRequestsOwnersPending } from '@/actions/dashboardRequest'

export function PendingRequests() {
  const { data, isLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: fetchRequestsOwnersPending
  })

  if (isLoading) {
    return <div className="text-center py-8">Cargando solicitudes...</div>
  }

  return (
    <div className="space-y-4">
      {data?.pending.map((request) => (
        <RequestCard key={request.id} request={request} isPending={true} />
      ))}
    </div>
  )
}

