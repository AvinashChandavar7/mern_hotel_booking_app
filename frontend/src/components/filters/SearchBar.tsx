import { FormEvent, useState } from "react";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker"
import { useSearchContext } from "../../contexts/SearchContext"
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom";
import { BsCalendarDate } from "react-icons/bs";

const SearchBar = () => {
  const navigate = useNavigate();

  const search = useSearchContext();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    search.saveSearchValues(
      destination, checkIn, checkOut, adultCount, childCount,
    );

    navigate("/search");


  }

  const handleClear = () => {
    // Clear all form fields
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);
  };

  const minDate = new Date();
  const maxDate = new Date();

  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="grid items-center grid-cols-2 gap-2  p-2 -mt-6 bg-[#1640D6] rounded shadow-md lg:grid-cols-3 2xl:grid-cols-5"
    >
      <div className="flex flex-row items-center flex-1 p-2 bg-white rounded-sm">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="w-full text-md focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex items-center flex-1 gap-2 px-2 py-1 bg-white rounded-sm">
        <label className="flex items-center">
          Adults:
          <input
            className="w-full p-1 font-bold focus:outline-none"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="flex items-center">
          Children:
          <input
            className="w-full p-1 font-bold focus:outline-none"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div >

        <DatePicker
          selected={checkIn}
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="py-2 bg-white w-[100px] text-center rounded-sm min-w-full focus:outline-none"
          wrapperClassName="min-w-full"
          isClearable
          showIcon
          icon={<BsCalendarDate />}

        />
      </div>

      <div >

        <DatePicker
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText="Check-out Date"
          className="py-2 bg-white w-[100px] text-center rounded-sm min-w-full focus:outline-none"
          wrapperClassName="min-w-full"
          isClearable
          showIcon
          icon={<BsCalendarDate />}

        />
      </div>


      <div className="flex gap-1">
        <button className="h-full w-full md:min-w-[55%] px-2 py-1.5 text-xl font-bold text-white bg-blue-600 rounded-sm hover:bg-blue-500">
          Search
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="h-full w-full md:min-w-[40%] px-2 py-1.5 text-xl font-bold text-blue-600  bg-white hover:opacity-90 rounded-sm">
          Clear
        </button>
      </div>
    </form>
  );
}

export default SearchBar
