import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "../../../constants/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<HotelFormData>();

  const facilitiesWatch = watch("facilities");

  return (
    <div className="my-4">
      <h2 className="mb-3 text-2xl font-bold">Facilities</h2>

      {/* <div className="grid grid-cols-4 gap-2 md:grid-cols-5"> */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {hotelFacilities.map((facility) => (
          <label
            key={facility}
            className={`flex  justify-start items-center gap-1 px-3 py-2 rounded-md border  text-sm cursor-pointer
            ${facilitiesWatch && facilitiesWatch.includes(facility) ? " border-blue-500" : ""}
        `}



          >
            <input
              type="checkbox"
              value={facility}
              {...register("facilities", {
                validate: (facilities) => {
                  if (facilities && facilities.length > 0) {
                    return true;
                  } else {
                    return "At least one facility is required"
                  }
                }
              })}
              className="w-4 h-4"
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500">{errors.facilities.message}</span>
      )}

    </div>
  )
}

export default FacilitiesSection
