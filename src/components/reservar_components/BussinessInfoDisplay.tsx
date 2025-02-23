import Image from "next/image"
import FieldCard from "./FieldCard"
import { bussinessID } from "@/actions/book_field/booking_actions";

interface BusinessInfoDisplayProps {
  business: bussinessID
  selectedField: { id_field: string; price: number } | null
  setSelectedField: (field: { id_field: string; price: number } | null) => void
}

const BusinessInfoDisplay: React.FC<BusinessInfoDisplayProps> = ({ business, selectedField, setSelectedField }) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-row items-center gap-4">
        <Image src="/icons/soccer_ball.svg" alt="icon"  className="w-12 h-12 md:w-16 md:h-16" width={50} height={50} />
        <h2 className="text-2xl md:text-3xl font-bold">{business.name}</h2>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-primary-50">Canchas disponibles</h3>
          <p className="text-xs text-gray-500">
            Seleccione la cancha que desea. Observa mas detalles dando click sobre las imagenes
          </p>
        </div>

        <div className="flex flex-row overflow-x-scroll h-64 gap-4 py-2">
          {business.canchas.map((cancha) => (
            <FieldCard
              key={cancha.id_cancha}
              field={cancha}
              setSelectedField={setSelectedField}
              selectedField={selectedField}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BusinessInfoDisplay

