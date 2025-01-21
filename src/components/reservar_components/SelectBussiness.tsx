"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

import CustomMap from "@/components/georeference/map"
import { bussinessInfo } from "@/actions/book_field/field_actions"
import { FiltersForm } from "./FiltersForm"


const SelectBusiness = ({ initialBusinesses }: { initialBusinesses: bussinessInfo[] }) => {
    const [businesses, setBusinesses] = useState<bussinessInfo[]>(initialBusinesses)

    return (
        

            <Card className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomMap
                    center={{ lat: 4.60971, lng: -74.08175 }}
                    markers={businesses.map((item) => ({
                        id: item.id,
                        lat: item.geoReference.lat,
                        lng: item.geoReference.lon,
                        text: item.name,
                        calification: item.calification,
                        priceRange: item.priceRange,
                    }))}
                    showInfoWindow={true}
                    style={{ width: "60 vh", height: "60vh" }}
                    gestureHandling="auto"
                />
                <FiltersForm onSearchResults={setBusinesses} />
            </Card>
            
       
    )
}

export default SelectBusiness

