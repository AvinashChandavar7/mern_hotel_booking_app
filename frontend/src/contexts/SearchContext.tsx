import React, { createContext, useContext, useState } from "react";



type SearchContextProps = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  hotelId: string;

  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
  ) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);


export const SearchContextProvider = (
  { children }: { children: React.ReactNode }
) => {


  const [destination, setDestination] = useState<string>("");
  const [checkIn, setCheckIn] = useState<Date>(new Date());
  const [checkOut, setCheckOut] = useState<Date>(new Date());
  const [adultCount, setAdultCount] = useState<number>(1);
  const [childCount, setChildCount] = useState<number>(0);
  const [hotelId, setHotelId] = useState<string>("");

  const saveSearchValues = async (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId?: string,
  ) => {

    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    setAdultCount(adultCount);
    setChildCount(childCount);

    if (hotelId) {
      setHotelId(hotelId)
    }
  }

  const value = {
    destination,
    checkIn,
    checkOut,
    adultCount,
    childCount,
    hotelId,
    saveSearchValues
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSearchContext = () => {
  const context = useContext(SearchContext);

  if (!context) {
    throw new Error("useSearchContext must be used within an SearchContextProvider");
  }

  return context as SearchContextProps;
};
