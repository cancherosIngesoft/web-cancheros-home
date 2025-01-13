import { Suspense } from 'react'
import Loading from './loading'
import { fetchRequestsOwnersPending } from '@/actions/dashboardRequest'
import RequestPanel from '@/components/panelSolicitudes/RequestPanel'


interface Request {
    id: string
    name: string
    email: string
    phone: string
    businessName: string
    address: string
}

const mockRequests: Request[] = [
    {
        id: "1",
        name: "Juan Alberto espitia",
        email: "juan@gmail.com",
        phone: "300 721 1345",
        businessName: "La futbolera",
        address: "Calle 77b #123-A"
    },
    {
        id: "2",
        name: "Armando Quintas",
        email: "aquintas@gmail.com",
        phone: "310 721 1245",
        businessName: "La futbolera",
        address: "Diagonal 27 A"
    },
    {
        id: "3",
        name: "Armando Bulla",
        email: "bulla@gmail.com",
        phone: "300 711 1245",
        businessName: "La futbolera",
        address: "Calle 12 #13-A"
    }
]
export default async function panel_solicitudes() {

    const initialPendingRequests = await fetchRequestsOwnersPending()
    return (
        <Suspense fallback={<Loading />}>
            <RequestPanel initialPendingRequests={initialPendingRequests}/>
        </Suspense>

    )
}
