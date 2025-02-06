import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"


export function ErrorGetInfo({ retry, error }: { retry: () => void, error: Error | null }) {

    // processdar el error, y cambiar la forma de mostrar apra cada error
    console.log(error?.message)
    return (
        <div className="flex flex-col items-center justify-center space-y-4 h-full">
            {error && <p className="text-red-500">{error.message}</p>}

            <AlertCircle className="h-20 w-20 text-gray-400" />
            {!error?.message.includes("Esta cancha no tiene horarios habilitados") &&

                <Button onClick={retry} variant="outline">
                    Intentar de nuevo
                </Button>
            }

        </div>


    )
}

