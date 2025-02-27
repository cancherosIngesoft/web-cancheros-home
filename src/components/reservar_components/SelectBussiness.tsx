"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import CustomMap from "@/components/georeference/map";
import { bussinessInfo, getBussiness } from "@/actions/book_field/booking_actions";
import { FiltersForm } from "./FiltersForm";
import { useBussinessStore } from "@/store";
import BussinessInfo from "./BussinessInfo";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

const SelectBusiness = () => {
  const [filteredBusinesses, setFilteredBusinesses] = useState<bussinessInfo[]>([]);
  const bussinessID = useBussinessStore((state) => state.bussinessID);

  const { data, isLoading, error, isSuccess, failureReason } = useQuery({
    queryKey: ["bussiness"],
    queryFn: getBussiness,

    
  });

  useEffect(() => {isSuccess && setFilteredBusinesses(data)}, [isSuccess]);

  const handleSearchResults = (results: bussinessInfo[]) => {
    setFilteredBusinesses(results);
  };

  if (isLoading) {
    return (
      <Card className="p-4 flex flex-col-reverse md:flex-row gap-8 bg-background w-full relative">
        <div className="md:w-2/5">
          <Skeleton className="w-full h-[50vh]" />
        </div>
        <div className="md:w-3/5 space-y-4">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center border-2 border-red-500 text-destructive">
        <h1>Error</h1>
        <p>Hubo un problema al cargar los negocios.</p>
        <p>{failureReason?.toString()}</p>
      </div>
    );
  }

  return (
    <Card className="p-4 flex flex-col-reverse md:flex-row gap-8 bg-background w-full relative">
      <div className="md:w-2/5">
        <CustomMap
          center={{ lat: 4.60971, lng: -74.08175 }}
          markers={filteredBusinesses.map((item) => ({
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
      
      <div className="md:w-3/5 md:grow-0">
        {bussinessID ? (
          <BussinessInfo id={bussinessID} />
        ) : (
          <FiltersForm 
            onSearchResults={handleSearchResults}
            
          />
        )}
      </div>
    </Card>
  );
};

export default SelectBusiness;