import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from "../api/api-client"
import GuestInfo from "../components/forms/GuestInfoForm/GuestInfo";

const HotelDetails = () => {
  const { hotelId } = useParams();

  const { data: hotelDetails } = useQuery(
    "fetchMyHotelDetailsById",
    () => apiClient.fetchMyHotelDetailsById(hotelId as string),
    { enabled: !!hotelId }
  );



  if (!hotelDetails) {
    return <>Not Found Details</>
  }

  return (
    <>
      <div className="mx-2 space-y-6 md:mx-0">

        {/* Star and Name */}
        <div>
          {/* StarRating */}
          <span className="flex">
            {Array.from({ length: 5 }).map((_, index) => (
              <h1 key={index}
                className={
                  `text-lg
                  ${index < hotelDetails.starRating
                    ? 'text-yellow-500'
                    : 'text-gray-300'}
                `}
              >
                {index < hotelDetails.starRating ? '★' : '☆'}
              </h1>
            ))}
          </span>

          <h1 className="text-2xl font-bold cursor-pointer">
            {hotelDetails.name}
          </h1>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {
            hotelDetails.imageUrls.map((image) => (
              <div className="h-[300px]" key={hotelDetails.name}>
                <img src={image} alt={hotelDetails.name}
                  className="object-cover object-center w-full h-full rounded-md"
                  loading="lazy"
                />
              </div>
            ))
          }
        </div>

        {/* facilities */}
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
          {hotelDetails.facilities.slice(0, 3).map((facility) => (
            < span className="px-3 py-2 text-xs font-bold text-center text-blue-600 border border-blue-300 rounded-md whitespace-nowrap" key={facility} >
              {facility}
            </span>
          ))}
        </div>

        {/* description &&  GuestInfo */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-1">
          <div className="p-2 whitespace-pre-line border rounded-md">
            {hotelDetails.description}
          </div>

          <div className="p-2 border rounded-md h-fit">
            <GuestInfo
              hotelId={hotelDetails._id}
              pricePerNight={hotelDetails.pricePerNight}
            />
          </div>
        </div>


      </div>
    </>
  )
}

export default HotelDetails