import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<HotelFormData>();



  return (
    <div className="my-2 ">
      <h2 className="mb-3 text-2xl font-bold">Guests</h2>

      <div className="grid grid-cols-2 gap-5 p-3 bg-blue-700 rounded-md md:p-6">

        <label className="font-semibold text-white text-md">
          Adults Count

          <input type="number" min={1}
            className="w-full px-4 py-2 font-normal text-black border rounded "
            {...register("adultCount", { required: "This field is required" })}
          />

          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>

        <label className="font-semibold text-white text-md">
          Children Count

          <input type="number" min={0}
            className="w-full px-4 py-2 font-normal text-black border rounded "
            {...register("childCount", { required: "This field is required" })}
          />

          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>


      </div>
    </div>
  )
}


export default GuestsSection;