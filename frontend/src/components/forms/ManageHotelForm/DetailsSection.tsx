import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="mb-3 text-3xl font-bold">Add Hotel</h1>



      <label className="flex-1 font-bold text-gray-700 text-md">
        Name

        <input type="text"
          className="w-full px-4 py-2 font-normal border rounded "
          {...register("name", { required: "This field is required" })}
        />

        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>


      <div className="flex flex-col gap-5 md:flex-row">
        <label className="flex-1 font-bold text-gray-700 text-md">
          City

          <input type="text"
            className="w-full px-4 py-2 font-normal border rounded "
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>

        <label className="flex-1 font-bold text-gray-700 text-md">
          Country

          <input type="text"
            className="w-full px-4 py-2 font-normal border rounded "
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>



      </div>



      <label className="flex-1 font-bold text-gray-700 text-md">
        Description

        <textarea rows={10}
          className="w-full px-4 py-2 font-normal border rounded "
          {...register("description", { required: "This field is required" })}
        ></textarea>

        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>


      <label className="max-w-[50%] text-md font-bold text-gray-700  ">
        Price Per Night

        <input type="number" min={1}
          className="w-full px-4 py-2 font-normal border rounded "
          {...register("pricePerNight", { required: "This field is required" })}
        />

        {errors.pricePerNight && (
          <span className="text-red-500">{errors.pricePerNight.message}</span>
        )}
      </label>


      <label className="max-w-[50%] text-md font-bold text-gray-700  ">
        Star Rating

        <select
          {...register("starRating", { required: "This field is required" })}
          className="w-full p-2 font-normal text-gray-700 border rounded"
        >
          <option value="" className="font-bold text-md">Select As Rating</option>
          {
            [1, 2, 3, 4, 5].map((num) => (
              <option value={num} key={num} className="font-bold text-md">{num}</option>
            ))
          }
        </select>

        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>




    </div >
  )
}

export default DetailsSection