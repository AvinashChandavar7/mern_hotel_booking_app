import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api/api-client"
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/filters/Pagination";
import StarRatingFilter from "../components/filters/StarRatingFilter";
import HotelTypesFilter from "../components/filters/HotelTypesFilter";
import FacilitiesFilter from "../components/filters/FacilitiesFilter";
import PriceFilter from "../components/filters/PriceFilter";
import SortOptionsFilter from "../components/filters/SortOptionsFilter";

const Search = () => {
  const search = useSearchContext();

  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();

  const [sortOption, setSortOption] = useState<string | undefined>("");

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption: sortOption,
  };

  const { data: hotelData } = useQuery(
    ["searchHotels", searchParams],
    () => apiClient.searchHotels(searchParams),
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };


  const handleHotelTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hotelType = event.target.value;

    setSelectedHotelTypes((prevHotelTypes) =>
      event.target.checked
        ? [...prevHotelTypes, hotelType]
        : prevHotelTypes.filter((hotel) => hotel !== hotelType)
    );
  };

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((prevFacility) => prevFacility !== facility)
    );
  };

  console.log(hotelData);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5 ">

      {/* Filter */}
      <div className="p-5 m-2 border border-blue-300 rounded-lg lg:sticky md:m-0 h-fit top-10">
        <div className="space-y-5">
          <h3 className="pb-5 text-lg font-semibold border-b border-blue-300">
            Filter by:
          </h3>
          {/*  Filter to add */}

          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />

          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />

          <FacilitiesFilter
            selectedFacilities={selectedFacilities}
            onChange={handleFacilityChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>

      {/* Card */}
      <div className="flex flex-col gap-5">

        <div className="flex items-center justify-between m-2 md:m-0">
          <span className="text-xl font-bold">
            <span className="text-blue-600 ">
              {hotelData?.pagination.total}
            </span>

            &nbsp;Hotels Found&nbsp;
            {/* {search.destination ? ` in ${search.destination} ` : ""} */}

            {search.destination && typeof search.destination === 'string' && (
              <span>
                in
                <span className="text-blue-600"> {search.destination}</span>
              </span>
            )}
          </span>

          <div>
            {/*TODO sort options*/}
            <SortOptionsFilter
              sortOption={sortOption}
              onChange={(event) => setSortOption(event?.target.value)}
            />
          </div>
        </div>

        {
          hotelData?.data.map((hotel) => (
            <SearchResultCard hotel={hotel} key={hotel._id} />
          ))
        }

        {
          hotelData?.pagination.page && (
            <div>
              <Pagination
                page={hotelData?.pagination.page || 1}
                pages={hotelData?.pagination.pages || 1}
                onPageChange={(page) => setPage(page)}
              />
            </div>
          )
        }
      </div>


    </div>
  )
}

export default Search