import { Suspense } from 'react'
import Loading from './loading'
import { fetchRequestsOwnersPending } from '@/actions/dashboardRequest'
import RequestPanel from '@/components/panelSolicitudes/RequestPanel'


export default async function panel_solicitudes() {

    const initialPendingRequests = await fetchRequestsOwnersPending()
    return (
        <Suspense fallback={<Loading />}>
            <RequestPanel initialPendingRequests={initialPendingRequests}/>
        </Suspense>

    )
}
