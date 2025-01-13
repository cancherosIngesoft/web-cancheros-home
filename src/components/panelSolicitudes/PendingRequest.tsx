import { RequestsOwners } from "@/actions/dashboardRequest"
import { RequestCard } from "./RequestCard"


interface PendingRequestsProps {
  requests: RequestsOwners[]
}

export function PendingRequests({ requests }: PendingRequestsProps) {
  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} isPending={true} />
      ))}
    </div>
  )
}

