import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import { uploadImages, } from "../utils/cloudinary";
import Hotel, { HotelType } from "../models/hotel.model";

const myHotels = asyncHandler(async (req, res) => {

  if (!req.userId) {
    throw new ApiError(400, "Invalid user");
  }


  const imagesFiles = req.files as Express.Multer.File[];
  const newHotel: HotelType = req.body;


  // console.log(imagesFiles, newHotel)

  const imageUrls = await uploadImages(imagesFiles)

  newHotel.imageUrls = imageUrls;
  newHotel.lastUpdated = new Date();
  newHotel.userId = req.userId;

  const hotel = new Hotel(newHotel);

  await hotel.save();


  return res.status(201)
    .json(new ApiResponse(201, { hotel }, "User successfully create"));


  //1. upload the images to Cloudinary

  //2. if upload is successful, add the URLS to the new hotel
  //3. save the new hotel our database
  //4. return a 201 status code

})

const getAllHotels = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const hotels = await Hotel.find({ userId })

  return res.status(201)
    .json(new ApiResponse(201, { hotels }, "User successfully getting Hotels"));
})


const getHotelById = asyncHandler(async (req, res) => {
  const userId = req.userId;
  const id = req.params.id.toString();

  const hotel = await Hotel.findOne({ _id: id, userId })

  if (!hotel) {
    throw new ApiError(400, "Hotel not Found");
  }


  return res.status(201)
    .json(new ApiResponse(201, { hotel }, "User successfully getting Hotel By Id"));
})

const updateMyHotel = asyncHandler(async (req, res) => {

  const hotelId = req.params.hotelId.toString();

  const updateHotel: HotelType = req.body;
  updateHotel.lastUpdated = new Date();

  const imagesFiles = req.files as Express.Multer.File[];

  const hotel = await Hotel.findOneAndUpdate(
    { _id: hotelId, userId: req.userId },
    updateHotel,
    { new: true }
  )

  const uploadImageUrls = await uploadImages(imagesFiles)

  hotel.imageUrls = [
    ...uploadImageUrls,
    ...(updateHotel.imageUrls || [])
  ];

  await hotel.save();

  return res.status(201)
    .json(new ApiResponse(201, { hotel }, "User successfully getting Hotel By Id"));
})



export {
  myHotels,
  getAllHotels,
  getHotelById,
  updateMyHotel
}

