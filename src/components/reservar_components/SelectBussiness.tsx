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
                    markers={businesses.map((item) => ({
                        lat: item.geoReference.lat,
                        lng: item.geoReference.lon,
                        text: item.name,
                    }))}
                    showInfoWindow={true}
                    style={{ width: "60vh", height: "60vh" }}
                />
                <FiltersForm onSearchResults={setBusinesses} />
            </Card>
            
       
    )
}

export default SelectBusiness

