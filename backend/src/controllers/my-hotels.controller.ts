import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import { processImageUpload, } from "../utils/cloudinary";
import Hotel, { HotelType } from "../models/hotel.model";

const myHotels = asyncHandler(async (req, res) => {

  if (!req.userId) {
    throw new ApiError(400, "Invalid user");
  }


  const imagesFiles = req.files as Express.Multer.File[];
  const newHotel: HotelType = req.body;


  // console.log(imagesFiles, newHotel)

  const uploadPromises = imagesFiles.map(processImageUpload);
  const imageUrls = await Promise.all(uploadPromises);

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



export {
  myHotels,
  getAllHotels
}

