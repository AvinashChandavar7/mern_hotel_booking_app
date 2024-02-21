import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import { validateAndHandleErrors } from "../validation/auth.validation";

import Hotel from "../models/hotel.model";

import { BookingType, HotelSearchResponse, PaymentIntentResponse } from "../shared/types";
import stripe from "../utils/stripe";

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


const getHotelDetailsById = asyncHandler(async (req, res) => {

  validateAndHandleErrors(req, res);
  const id = req.params.id.toString();

  const hotel = await Hotel.findById(id);

  if (!hotel) {
    throw new ApiError(400, "Hotel not Found");
  }

  return res.status(201)
    .json(new ApiResponse(201, { hotel }, "User successfully getting Hotel By Id"));
});


const getAllHotel = asyncHandler(async (req, res) => {

  ;

  const hotel = await Hotel.find().sort("-lastUpdated");

  if (!hotel) {
    throw new ApiError(400, "Hotel not Found");
  }

  return res.status(201)
    .json(new ApiResponse(201, { hotel }, "User successfully getting Hotel By Id"));
});





// 1. total Cost  2. hotelId  3.userId
const handlePaymentIntent = asyncHandler(async (req, res) => {

  const { numberOfNights } = req.body;

  // const hotelId = req.params.hotelId.toString();
  const hotelId = req.params.hotelId;

  const hotel = await Hotel.findById(hotelId);

  if (!hotel) {
    throw new ApiError(400, "Hotel not Found");
  }

  const totalCost = hotel.pricePerNight * numberOfNights;



  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCost,
    currency: "INR",
    metadata: {
      hotelId,
      userId: req.userId
    }
  });

  if (!paymentIntent.client_secret) {
    throw new ApiError(500, "Error creating payment intent");
  }

  const response: PaymentIntentResponse = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalCost
  }

  return res.status(201)
    .json(new ApiResponse(
      201, response, "Payment intent created successfully"
    ));

});


const handleBookings = asyncHandler(async (req, res) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;

    console.log("paymentIntentId", paymentIntentId)

    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    )

    if (!paymentIntent) {
      // throw new ApiError(400, "payment intent not found");
      return res.status(400).json({ message: "payment intent not found" });
    }

    console.log("paymentIntent", paymentIntent)
    console.log("paymentIntent hotelId", paymentIntent.metadata.hotelId, req.params.hotelId)
    console.log("paymentIntent userId", paymentIntent.metadata.userId, req.userId)


    if (
      paymentIntent.metadata.hotelId !== req.params.hotelId ||
      paymentIntent.metadata.userId !== req.userId
    ) {
      // throw new ApiError(400, "payment intent mismatch");
      return res.status(400).json({ message: "payment intent mismatch" });
    }

    if (paymentIntent.status !== "succeeded") {
      // throw new ApiError(400, `Payment intent not succeeded. Status: ${paymentIntent.status}`);
      return res.status(400).json({
        message: `payment intent not succeeded. Status: ${paymentIntent.status}`,
      });
    }

    console.log("paymentIntent.status", paymentIntent.status !== "succeeded")

    const newBooking: BookingType = {
      ...req.body,
      userId: req.userId
    }

    console.log("newBooking", newBooking)

    const hotel = await Hotel.findOneAndUpdate(
      { _id: req.params.hotelId },
      { $push: { bookings: newBooking } }
    );

    if (!hotel) {
      throw new ApiError(400, "Hotel not Found");
    }

    await hotel.save();

    console.log(hotel)

    // return res.status(201)
    //   .json(new ApiResponse(
    //     201, hotel, "handleBookings successfully"
    //   ));



    res.status(200).json({ message: "handle payment" });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Something went wrong" });
  }
});




export {
  searchHotel,
  getHotelDetailsById,
  handlePaymentIntent,
  handleBookings,
  getAllHotel
}