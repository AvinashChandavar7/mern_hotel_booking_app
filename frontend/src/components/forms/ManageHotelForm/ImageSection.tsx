import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext<HotelFormData>();


  return (
    <div className="my-2 ">
      <h2 className="mb-3 text-2xl font-bold">Images</h2>

      <div className="flex flex-col gap-4 p-4 border rounded">
        <input type="file" multiple accept="image/*"

          className="w-full text-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"


          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "At least one image should be added"
              }

              if (totalLength > 6) {
                return "Total number of images cannot be more than 6"
              }

              return true;
            }
          })}

        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500">{errors.imageFiles.message}</span>
      )}
    </div>
  )
}

export default ImageSection;