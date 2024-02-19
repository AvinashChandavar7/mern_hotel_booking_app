
import { hotelFacilities } from "../../constants/hotel-options-config";

export type FacilitiesFilterProps = {
  selectedFacilities: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FacilitiesFilter = (
  { selectedFacilities, onChange }: FacilitiesFilterProps
) => {

  return (
    <>
      <h4 className="mb-2 font-semibold text-md">Facilities</h4>
      <div className="grid grid-cols-2 gap-1 pb-5 border-b border-blue-300 sm:grid-cols-3 lg:grid-cols-1">
        {hotelFacilities.map((facility) => (
          <label className="flex flex-row items-center space-x-1">
            <input
              type="checkbox"
              className="rounded"
              value={facility}
              checked={selectedFacilities.includes(facility)}
              onChange={onChange}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
    </>
  )
}

export default FacilitiesFilter;