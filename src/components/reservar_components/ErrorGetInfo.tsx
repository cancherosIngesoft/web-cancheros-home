import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"


export function ErrorGetInfo({ retry }: { retry: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-full">
            <h1 className="text-2xl text-gray-600 font-bold">Ha sucedido un error</h1>
            <AlertCircle className="h-24 w-24 text-gray-600" />
            <Button onClick={retry} variant="outline">
                Intentar de nuevo
            </Button>
        </div>


    )
}

