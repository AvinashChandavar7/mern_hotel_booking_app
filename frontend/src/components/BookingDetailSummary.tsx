import { HotelType } from "../types/types";

type BookingDetailSummaryProps = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
}

const BookingDetailSummary = (
  {
    checkIn, checkOut, adultCount,
    childCount, numberOfNights, hotel,
  }: BookingDetailSummaryProps
) => {


  return (
    <div className="grid gap-4 p-5 border border-blue-300 rounded-lg h-fit">
      <h2 className="text-3xl font-bold">Your Booking Details</h2>
      <div className="py-2 font-semibold border-b">
        Location :
        <div className="font-bold text-blue-600">
          {`${hotel.name}, ${hotel.city}, ${hotel.country}`}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-2 sm:flex-row" >

        <div className="font-semibold ">
          Check-In
          <div className="font-bold text-blue-600">
            {checkIn.toDateString()}
          </div>
        </div>
        <div className="font-semibold ">
          Check-Out
          <div className="font-bold text-blue-600">
            {checkOut.toDateString()}
          </div>
        </div>

      </div>


      <div className="py-2 font-semibold border-t border-b">
        Total Length of Stay:
        <div className="font-bold text-blue-600">
          {numberOfNights} nights
        </div>
      </div>


      <div className="py-2 font-semibold">
        Guests
        <div className="font-bold text-blue-600">
          {adultCount} adults & {childCount} children
        </div>
      </div>

    </div>
  )
}

export default BookingDetailSummary
