import { Link } from "react-router-dom";
import { HotelType } from "../types/types";

type LatestDestinationCardProps = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: LatestDestinationCardProps) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative overflow-hidden rounded-md cursor-pointer"
    >
      <div className="h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <div className="absolute bottom-0 w-full p-4 bg-black bg-opacity-50 rounded-b-md">
        <span className="text-3xl font-bold tracking-tight text-white">
          {hotel.name}
        </span>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;
