import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelTypes } from "../../../constants/hotel-options-config";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors }
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (
    <div className="my-4">
      <h2 className="mb-3 text-2xl font-bold">Type</h2>

      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {hotelTypes.map((type) => (
          <label
            key={type}
            className={`cursor-pointer ${typeWatch === type
              ? "bg-blue-600 text-white"
              : "border border-blue-300 text-gray-800"
              } rounded-md  px-4 p-2 hover:text-white hover:bg-blue-600 transition-all font-semibold`}
          >
            <input
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
