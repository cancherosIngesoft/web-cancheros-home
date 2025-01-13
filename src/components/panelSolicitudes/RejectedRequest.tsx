'use client'

import { useQuery } from '@tanstack/react-query'
import { RequestCard } from './RequestCard'
import { fetchRequestsOwnersPast } from '@/actions/dashboardRequest'


export function RejectedRequests() {
  const { data, isLoading } = useQuery({
    queryKey: ['requests'],
    queryFn: fetchRequestsOwnersPast
  })

  if (isLoading) {
    return <div className="text-center py-8">Cargando solicitudes...</div>
  }

  if (!data?.rejected.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay solicitudes rechazadas
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {data.rejected.map((request) => (
        <RequestCard key={request.id} request={request} isPending={false} />
      ))}
    </div>
  )
}

