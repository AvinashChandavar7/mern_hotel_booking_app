import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImageSection from "./ImageSection";
import { useEffect } from "react";
import { HotelType } from "../../../types/types";


export type HotelFormData = {
  name: string;
  city: string;
  type: string;
  country: string;
  description: string;

  adultCount: number;
  childCount: number;
  starRating: number;
  pricePerNight: number;

  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
}

type ManageHotelFormProps = {
  onSave: (hotelFormData: FormData) => void;
  isLoading: boolean;
  hotel?: HotelType;
}

const ManageHotelForm = (
  { hotel, onSave, isLoading }: ManageHotelFormProps
) => {

  const fromMethods = useForm<HotelFormData>(
    {
      defaultValues: {
        name: "Hotel Raj",
        city: "Bangalore",
        country: "India",
        description: "World Biggest hotel",
        adultCount: 1,
        childCount: 0,
        starRating: 5,
        pricePerNight: 5000,
        facilities: ["Family Rooms", "Free WiFi",],
        type: "Motel"
      }
    }
  )

  const { handleSubmit, reset } = fromMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    // console.log(formDataJson);

    const formData = new FormData();

    if (hotel) {
      formData.append("hotelId", hotel._id);
    }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("type", formDataJson.type);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("adultCount", String(formDataJson.adultCount));
    formData.append("childCount", String(formDataJson.childCount));
    formData.append("starRating", String(formDataJson.starRating));
    formData.append("pricePerNight", String(formDataJson.pricePerNight));

    // Append facilities as an array
    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls && Array.isArray(formDataJson.imageUrls)) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }


    Array
      .from(formDataJson.imageFiles)
      .forEach((imageFile) => {
        formData.append("imageFiles", imageFile);
      });


    onSave(formData);

  });


  return (
    <FormProvider {...fromMethods}>
      <form className="p-3 md:p-0" onSubmit={onSubmit}>
        <DetailsSection />
        <TypeSection />
        <FacilitiesSection />
        <GuestsSection />
        <ImageSection />


        <span className="flex justify-end w-full my-5">
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-2 w-[100%] md:w-[150px] font-semibold text-white bg-blue-600 rounded-md disabled:bg-gray-500 "
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </span>


      </form>
    </FormProvider>
  )
}

export default ManageHotelForm