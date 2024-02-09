import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

import cloudinary from 'cloudinary';

import { processImageUpload, } from "../utils/cloudinary";
import Hotel, { HotelType } from "../models/hotel.model";

const myHotels = asyncHandler(async (req, res) => {

  if (!req.userId) {
    throw new ApiError(400, "Invalid user");
  }


  const imagesFiles = req.files as Express.Multer.File[];
  const newHotel: HotelType = req.body;


  console.log(imagesFiles, newHotel)

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




export {
  myHotels
}


// const myHotels = asyncHandler(async (req, res) => {
//   const imagesFiles = req.files as Express.Multer.File[];
//   const newHotel: HotelType = req.body;

//   console.log(imagesFiles, newHotel)

//   const uploadPromises = imagesFiles.map(async (image) => {
//     const b64 = Buffer.from(image.buffer).toString("base64");

//     let dataURI = "data:" + image.mimetype + ";base64," + b64;

//     // const res = await uploadOnCloudinary(dataURI);
//     const res = await cloudinary.v2.uploader.upload(dataURI);

//     return res.url;
//   });

//   const imageUrls = await Promise.all(uploadPromises);

//   newHotel.imageUrls = imageUrls;
//   newHotel.lastUpdated = new Date();
//   newHotel.userId = req.userId;


//   const hotel = new Hotel(newHotel);

//   await hotel.save();


//   return res.status(201)
//     .json(new ApiResponse(201, { hotel }, "User successfully create"));


//   //1. upload the images to Cloudinary

//   //2. if upload is successful, add the URLS to the new hotel
//   //3. save the new hotel our database
//   //4. return a 201 status code

// })
