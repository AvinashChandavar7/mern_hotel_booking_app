import { Link } from "react-router-dom"
import { HotelType } from "../types/types"


type SearchResultCardProps = {
  hotel: HotelType
}


const SearchResultCard = ({ hotel }: SearchResultCardProps) => {
  return (
    <div
      className={
        `grid grid-cols-1 xl:grid-cols-[2fr_3fr]
        border border-slate-300 m-2 md:m-0 rounded-lg p-4 gap-8 shadow-md shadow-blue-200 hover:border hover:border-blue-400
      `}
    >
      <div className="w-full h-[300px]">
        <img src={hotel.imageUrls[0]} alt="first image"
          className="object-cover object-center w-full h-full"
          loading="lazy"
        />
      </div>

      <div className="grid grid-rows-[1fr_2fr_1fr] ">


        {/* row 1 */}
        <div>
          <div className="flex items-center gap-2">
            {/* StarRating */}
            <span className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <h1
                  key={index}
                  className={`
                  text-lg
                  ${index < hotel.starRating ? 'text-yellow-500' : 'text-gray-300'}
                  `}
                >
                  {index < hotel.starRating ? '★' : '☆'}
                </h1>
              ))}
            </span>

            {/* Type */}
            <span className="text-sm">
              {hotel?.type}
            </span>
          </div>


          <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">
            {hotel.name}
          </Link>


        </div>


        {/* row 2 */}
        <div>
          <div className="line-clamp-4">
            {hotel.description}
          </div>
        </div>

        {/* row 3 */}

        <div className="grid items-end grid-cols-2 whitespace-nowrap ">
          {/* Chips */}
          <div className="flex flex-wrap items-center gap-1 lg:flex-nowrap">
            {hotel.facilities.slice(0, 3).map((facility) => (
              < span className="px-3 py-2 text-xs font-bold text-blue-600 rounded-md bg-blue-50 whitespace-nowrap" >
                {facility}
              </span>
            ))}
            <span className="text-sm font-semibold text-gray-400">
              {hotel.facilities.length > 3 && `+${hotel.facilities.length - 3} more`}
            </span>
          </div>

          {/*  */}
          <div className="flex flex-col items-end gap-1">
            <span>₹{hotel.pricePerNight} per night</span>

            <Link to={`/detail/${hotel._id}`}
              className="h-full p-2 text-sm font-bold text-white bg-blue-600 rounded-md md:px-3 md:py-2 md:text-xl hover:bg-blue-500 max-w-fit">
              View More
            </Link>
          </div>

        </div>

      </div>
    </div>
  )
}

export default SearchResultCard