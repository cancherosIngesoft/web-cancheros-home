"use client"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useQuery } from "@tanstack/react-query"

import { Button } from "@/components/ui/button"
import { useBussinessStore } from "@/store"
import { getBussinessByID } from "@/actions/book_field/booking_actions"
import { LoadingState } from "./LoadingState"
import { ErrorGetInfo } from "./ErrorGetInfo"
import BookingForm from "./BookingForm"
import Image from "next/image"
import BusinessInfoDisplay from "./BussinessInfoDisplay"

const BussinessInfo = ({ id }: { id: string }) => {
    const [selectedField, setSelectedField] = useState<{ id_field: string; price: number } | null>(null)
    const clearBussinessID = useBussinessStore((state) => state.clearBussinessID)

    const {
        data: business,
        isLoading,
        isError,
        failureReason,
        refetch,
    } = useQuery({
        queryKey: ["business", id],
        queryFn: () => getBussinessByID(id),
        staleTime: 1000 * 60 * 5,
    })

    if (isLoading) return <LoadingState />


    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="relative w-full h-full p-0 md:p-4"
            >
                <Button
                    onClick={clearBussinessID}
                    size="icon"
                    variant="default"
                    className="absolute w-20 bg-tertiary-40 hover:bg-tertiary-70 p-0 max-h-10 right-0 top-0"
                >
                    Volver
                </Button>
                {isError && <ErrorGetInfo retry={() => refetch()} error={failureReason} />}

                {business &&
                    <>
                        <BusinessInfoDisplay business={business} selectedField={selectedField} setSelectedField={setSelectedField} />
                        {selectedField && <BookingForm selectedField={selectedField}  />}
                    </>

                }




            </motion.div>
        </AnimatePresence>
    )
}

export default BussinessInfo

