import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import Hotel from "../models/hotel.model";
import { HotelSearchResponse } from "../shared/types";

const searchHotel = asyncHandler(async (req, res) => {


  const pageSize = 5;
  const pageNumber = parseInt(
    req.query.page ? req.query.page.toString() : "1"
  );

  if (isNaN(pageNumber) || pageNumber < 1) {
    throw new ApiError(400, "Invalid page number");
  }


  const skip = (pageNumber - 1) * pageSize;

  const hotels = await Hotel.find()
    .skip(skip).limit(pageSize);

  if (!hotels) {
    throw new ApiError(400, "Invalid Hotel")
  }


  const total = await Hotel.countDocuments();

  if (!total) {
    throw new ApiError(400, "Invalid total")
  }

  const response: HotelSearchResponse = {
    data: hotels,
    pagination: {
      total,
      page: pageNumber,
      pages: Math.ceil(total / pageSize),
    }
  }

  return res.status(201)
    .json(new ApiResponse(201, response, "User successfully Search"));
});


export {
  searchHotel
}