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