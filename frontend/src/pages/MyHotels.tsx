import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { BsBuilding, BsMap } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";

import { useQuery } from "react-query"
import { Link } from "react-router-dom"

import * as apiClient from "../api/api-client"
import { useAppContext } from "../contexts/AppContext"

interface HotelDetailsProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
}

const HotelDetails = ({ icon, label, value, className }: HotelDetailsProps) => {
  return (
    <div className={`flex flex-col items-center justify-start gap-1 px-4 py-2 text-center border border-blue-300 rounded-md md:flex-row
      ${className} `}
    >
      {icon}
      <span className="font-semibold text-blue-700">{label}</span>{value}
    </div>
  );
};

const MyHotels = () => {
  const { showToast } = useAppContext();

  const { data: hotelData } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      }
    }
  );

  if (!hotelData || !Array.isArray(hotelData)) {
    return <span>No Hotels found</span>;
  }

  return (
    <div className="p-2 space-y-5 md:0 ">
      <div className="flex items-center justify-between mb-4">
        <h1 className="p-2 text-4xl font-bold text-blue-600 rounded-md">
          My Hotels
        </h1>

        <Link to="/add-hotel" className="flex px-8 py-3 font-bold text-blue-500 bg-white border border-blue-500 rounded-md text-md hover:text-white hover:bg-blue-500">
          <span className="hidden md:inline">Add Hotel</span>
          <FaHotel className="md:hidden" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 ">
        {hotelData.map((hotel) => (
          <div key={hotel._id} className="p-6 bg-white border border-blue-200 rounded-md card">


            <div className="flex items-center justify-between mb-4">

              <h1 className="text-2xl font-bold md:text-3xl">
                {hotel.name}
              </h1>

              <Link to={`/edit-hotel/${hotel._id}`} className="flex px-4 py-2 font-bold text-white bg-blue-600 rounded-md text-md hover:bg-blue-600">
                <span className="hidden md:inline">View Details</span>
                <FaExternalLinkAlt className="md:hidden" />
              </Link>
            </div>

            <span className="font-semibold">
              <label className="text-blue-700">
                Description:
              </label>
              <div
                className="p-4 mb-2 overflow-y-scroll whitespace-pre-line border rounded-md max-h-[200px] line-clamp-6"
                style={{
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgb(45, 45, 194) transparent',
                }}
              >
                {hotel.description}
              </div>
            </span>


            <div className="grid grid-cols-2 gap-2 ">
              <HotelDetails icon={<BsMap />} label="Location:" value={`${hotel.city}, ${hotel.country}`} />
              <HotelDetails icon={<BiMoney />} label=" Price per night & Type:" value={`₹${hotel.pricePerNight} & ${hotel.type}`} />
              <HotelDetails icon={<BiHotel />} label="Guests:" value={`${hotel.adultCount} adults, ${hotel.childCount} children`} />
              <HotelDetails icon={<BiStar />} label="Star Rating:" value={`${hotel.starRating} Star rating`} />
              <HotelDetails icon={<BsBuilding />} label="Facilities:" value={hotel.facilities.join(", ")} className="col-span-2 " />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyHotels