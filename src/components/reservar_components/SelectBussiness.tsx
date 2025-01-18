import { bussinessInfo } from "@/actions/book_field/field_actions";
import { Card } from "../ui/card";
import CustomMap from "../georeference/map";


const SelectBussiness = ({ bussiness }: { bussiness: bussinessInfo[] }) => {
    return (
        <CustomMap
            markers={bussiness.map((item) => ({
                lat: item.geoReference.lat,
                lng: item.geoReference.lon,
                text: item.name,
            }))}
            showInfoWindow={true}

        />


    )




}
export default SelectBussiness