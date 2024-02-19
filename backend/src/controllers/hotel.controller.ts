import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import Hotel from "../models/hotel.model";
import { HotelSearchResponse } from "../shared/types";

const searchHotel = asyncHandler(async (req, res) => {

  const query = constructorSearchQuery(req.query);

  let sortOptions = {};

  switch (req.query.sortOption) {
    case "starRating":
      sortOptions = { starRating: -1 };
      break;
    case "pricePerNightAsc":
      sortOptions = { pricePerNight: 1 };
      break;
    case "pricePerNightDesc":
      sortOptions = { pricePerNight: -1 };
      break;
  }

  const pageSize = 5;
  const pageNumber = parseInt(
    req.query.page ? req.query.page.toString() : "1"
  );

  if (isNaN(pageNumber) || pageNumber < 1) {
    throw new ApiError(400, "Invalid page number");
  }


  const skip = (pageNumber - 1) * pageSize;

  const hotels = await Hotel
    .find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(pageSize);

  if (!hotels.length) {
    throw new ApiError(400, "Invalid Hotel");
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

const constructorSearchQuery = (queryParams: any) => {

  const {
    destination, adultCount, childCount,
    facilities, types, stars, maxPrice
  } = queryParams;

  let constructedQuery: any = {};

  if (destination) {
    constructedQuery.$or = [
      { city: new RegExp(destination, "i") },
      { country: new RegExp(destination, "i") },
    ];
  }

  if (adultCount) {
    constructedQuery.adultCount = { $gte: parseInt(adultCount) }
  }

  if (childCount) {
    constructedQuery.childCount = { $gte: parseInt(childCount) }
  }

  if (facilities) {
    constructedQuery.facilities = {
      $all: Array.isArray(facilities) ? facilities : [facilities]
    }
  }

  if (types) {
    constructedQuery.type = { $in: Array.isArray(types) ? types : [types] }
  }

  if (stars) {
    const starRatings = stars && Array.isArray(stars)
      ? stars.map((star: string) => parseInt(star))
      : [parseInt(stars)];

    constructedQuery.starRating = { $in: starRatings };
  }

  if (maxPrice) {
    constructedQuery.pricePerNight = { $lte: parseInt(maxPrice).toString() };
  }

  return constructedQuery;
}


export {
  searchHotel
}