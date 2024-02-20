export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  timestamp: Date;

}


export type HotelType = {
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

  bookings: BookingType[];
}

export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
}




export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  maxPrice?: string;
  sortOption?: string;
  types?: string[];
  stars?: string[];
  facilities?: string[];

}

export type HotelSearchResponse = {
  data: HotelType[],
  pagination: {
    total: number,
    page: number,
    pages: number,
  }
}

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
}