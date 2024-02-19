import { hotelTypes } from "../../constants/hotel-options-config";

export type HotelTypesFilterProps = {
  selectedHotelTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HotelTypesFilter = (
  { selectedHotelTypes, onChange }: HotelTypesFilterProps
) => {

  return (
    <>
      <h4 className="mb-2 font-semibold text-md">Hotel Types</h4>
      <div className="grid grid-cols-2 gap-1 pb-5 border-b border-blue-300 sm:grid-cols-3 lg:grid-cols-1">
        {hotelTypes.map((hotelType) => (
          <label className="flex flex-row items-center space-x-1" key={hotelType}>
            <input
              type="checkbox"
              className="rounded"
              value={hotelType}
              checked={selectedHotelTypes.includes(hotelType)}
              onChange={onChange}
            />
            <span>{hotelType}</span>
          </label>
        ))}
      </div>
    </>
  )
}

export default HotelTypesFilter;