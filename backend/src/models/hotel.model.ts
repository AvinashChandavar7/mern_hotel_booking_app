import { Schema, models, model, Document } from "mongoose";

export interface HotelType extends Document {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  facilities: string[];
  imageUrls: string[];
  adultCount: number;
  childCount: number;
  pricePerNight: number;
  starRating: number;
  lastUpdated: Date;
  timestamp: Date;
}

const hotelSchema = new Schema<HotelType>(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    adultCount: { type: Number, required: true },
    childCount: { type: Number, required: true },
    pricePerNight: { type: Number, required: true },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    facilities: [{ type: String, required: true }],
    imageUrls: [{ type: String, required: true }],
    lastUpdated: { type: Date, required: true }
  },
  { timestamps: true }
);

const Hotel = models.Hotel || model<HotelType>("Hotel", hotelSchema);

export default Hotel;