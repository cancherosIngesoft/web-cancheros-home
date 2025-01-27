
import { Cancha } from "@/actions/book_field/field_actions"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


interface FieldCardProps {
    field: Cancha
    setSelectedField: (id: string) => void
    selectedField: string | null
}
const FieldCard = ({ field, setSelectedField,selectedField }: FieldCardProps) => {
    return (
        <Card
            key={field.id_cancha}
            className={`cursor-pointer transition-colors ${selectedField === field.id_cancha ? "border-primary bg-green-100" : "hover:border-muted"
                }`}
            onClick={() => setSelectedField(field.id_cancha)}
        >
            <CardContent className="flex flex-col h-52 aspect-square p-4">
                <div className="h-24 aspect-video ">
                    <img
                        src={
                            field.imagen1 ||
                            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-cgeK59vZ1ldbKWIHopaz1ChtZ6MiOx.png"
                        }
                        alt={field.nombre}
                        className="h-full w-full rounded-md object-cover"
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div>
                        <CardTitle className="text-lg">{field.nombre}</CardTitle>
                        <CardDescription>Capacidad: {field.capacidad} personas</CardDescription>
                    </div>
                    <p className="font-semibold text-primary-50">${field.precio.toLocaleString()} / hora</p>
                </div>
            </CardContent>
        </Card>
    )
}
export default FieldCard