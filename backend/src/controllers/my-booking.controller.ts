import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import Hotel, { HotelType } from "../models/hotel.model";


const getMyBookings = asyncHandler(async (req, res) => {


  const hotels = await Hotel.find({
    bookings: { $elemMatch: { userId: req.userId } },
  });

  if (!hotels) {
    throw new ApiError(400, "Hotel not Found");
  }

  const results = hotels.map((hotel) => {
    const userBookings = hotel.bookings.filter(
      (booking: any) => booking.userId === req.userId
    );

    const hotelWithUserBookings: HotelType = {
      ...hotel.toObject(),
      bookings: userBookings,
    }

    return hotelWithUserBookings
  });

  if (!results) {
    throw new ApiError(400, "Results not Found");
  }

  return res.status(201)
    .json(new ApiResponse(201, results, "Successfully fetched bookings"));
})
export { getMyBookings }