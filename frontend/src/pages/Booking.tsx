import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";
import BookingForm from "../components/forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailSummary from "../components/BookingDetailSummary";


const Booking = () => {

  const search = useSearchContext();
  const { hotelId } = useParams();

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 60 * 60 * 24);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId as string),
    { enabled: !!hotelId }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    () => apiClient.fetchCurrentUser()
  );

  if (!hotel) {
    return <>No Hotel</>;
  }


  return (
    <div className="grid gap-2 lg:grid-cols-[1fr_2fr] m-2 md:m-0">
      <BookingDetailSummary
        checkIn={search.checkIn}
        checkOut={search.checkOut}
        adultCount={search.adultCount}
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />

      {currentUser && <BookingForm currentUser={currentUser} />}
    </div >
  )
}

export default Booking