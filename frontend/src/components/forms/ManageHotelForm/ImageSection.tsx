import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImageSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();

    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    )
  }

  return (
    <div className="my-2 ">
      <h2 className="mb-3 text-2xl font-bold">Images</h2>

      <div className="flex flex-col w-full gap-4 p-2 border border-red-500 rounded">

        {
          existingImageUrls && (
            <div className="grid w-full grid-cols-6 gap-2">
              {
                existingImageUrls.map((url) => (
                  <div className="relative rounded-md group">
                    <img
                      src={url} alt="url image"
                      className="object-cover min-h-[150px] rounded-md"
                      loading="lazy"
                    />
                    <button
                      onClick={(event) => handleDelete(event, url)}
                      className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-md opacity-0 group-hover:opacity-100">
                      Delete
                    </button>
                  </div>
                ))
              }
            </div>
          )
        }


        <input type="file" multiple accept="image/*"

          className="w-full text-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-md file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"


          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length + (existingImageUrls?.length || 0);

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