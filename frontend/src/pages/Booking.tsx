import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Elements } from "@stripe/react-stripe-js";

import * as apiClient from "../api/api-client";

import { useAppContext } from "../contexts/AppContext";
import { useSearchContext } from "../contexts/SearchContext";

import BookingForm from "../components/forms/BookingForm/BookingForm";
import BookingDetailSummary from "../components/BookingDetailSummary";


const Booking = () => {

  const { stripePromise } = useAppContext();
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


  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    () =>
      apiClient.createPaymentIntent(
        hotelId as string,
        numberOfNights.toString()
      ),
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  );

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

      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
          key={paymentIntentData.clientSecret}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div >
  )
}

export default Booking




