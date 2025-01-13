import { RequestsOwners } from "@/actions/dashboardRequest"
import { RequestCard } from "./RequestCard"

interface RejectedRequestsProps {
  requests: RequestsOwners[]
}

export function RejectedRequests({ requests }: RejectedRequestsProps) {
  if (!requests.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay solicitudes rechazadas
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} isPending={false} />
      ))}
    </div>
  )
}

