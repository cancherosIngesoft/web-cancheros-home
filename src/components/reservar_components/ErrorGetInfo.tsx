import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"


export function ErrorGetInfo({ retry }: { retry: () => void }) {
    return (
        <div>
            <h1>Ha sucedido un error</h1>
            <AlertCircle className="h-12 w-12 text-muted-foreground" />
            <Button onClick={retry} variant="outline">
                Intentar de nuevo
            </Button>
        </div>


    )
}

