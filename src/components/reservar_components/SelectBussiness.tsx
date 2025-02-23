"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

import CustomMap from "@/components/georeference/map";
import { bussinessInfo } from "@/actions/book_field/booking_actions";
import { FiltersForm } from "./FiltersForm";
import { useBussinessStore } from "@/store";
import BussinessInfo from "./BussinessInfo";

const SelectBusiness = ({
  initialBusinesses,
}: {
  initialBusinesses: bussinessInfo[];
}) => {
  const [businesses, setBusinesses] =
    useState<bussinessInfo[]>(initialBusinesses);
  const bussinessID = useBussinessStore((state) => state.bussinessID);
  return (
    <Card className="p-4 flex flex-col-reverse md:flex-row gap-8 bg-background w-full relative  ">
      <div className="md:w-2/5  ">
        <CustomMap
          center={{ lat: 4.60971, lng: -74.08175 }}
          markers={businesses.map((item) => ({
            id: item.id,
            lat: parseFloat(item.geoReference.lat),
            lng: parseFloat(item.geoReference.lon),
            text: item.name,
            calification: item.calification,
            priceRange: item.priceRange,
          }))}
          showInfoWindow={true}
          style={{ width: "100%", height: "50vh" }}
          gestureHandling="auto"
        />
      </div>
      <div className="md:w-3/5 md:grow-0 ">
        {bussinessID && <BussinessInfo id={bussinessID} />}
        {!bussinessID && <FiltersForm onSearchResults={setBusinesses} />}
      </div>
    </Card>
  );
};

export default SelectBusiness;
