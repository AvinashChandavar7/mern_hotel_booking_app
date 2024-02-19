import ReactDatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css"
import { useSearchContext } from "../../../contexts/SearchContext";
import { useAppContext } from "../../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

import { BsCalendarDate } from "react-icons/bs";
type GuestInfoProps = {
  hotelId: string | undefined,
  pricePerNight: number;
}

type GuestInfoFormDataProps = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
}

const GuestInfo = (
  { hotelId, pricePerNight }: GuestInfoProps
) => {

  const navigate = useNavigate();
  const location = useLocation();


  const search = useSearchContext()

  const { isLoggedIn } = useAppContext()

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<GuestInfoFormDataProps>(
    {
      defaultValues: {
        checkIn: search.checkIn,
        checkOut: search.checkOut,
        adultCount: search.adultCount,
        childCount: search.childCount,
      }
    }
  );

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormDataProps) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate("/login", { state: { from: location } })
  };

  const onSubmit = (data: GuestInfoFormDataProps) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.adultCount,
      data.childCount
    );

    navigate(`/hotel/${hotelId}/booking`);
  };

  return (

    <div className="flex flex-col gap-4 p-4 bg-blue-100 rounded-md">
      <h3 className="font-bold text-md">₹{pricePerNight}</h3>

      <form
        onSubmit={
          isLoggedIn
            ? handleSubmit(onSubmit)
            : handleSubmit(onSignInClick)
        }
        className="grid items-center grid-cols-1 gap-4"
      >

        <div>
          <ReactDatePicker
            required
            selected={checkIn}
            onChange={(date) => setValue("checkIn", date as Date)}
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

        <div>
          <ReactDatePicker
            required
            selected={checkOut}
            onChange={(date) => setValue("checkOut", date as Date)}
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

        <div className="flex items-center gap-2 px-2 py-1 bg-white rounded-sm justify-evenly">
          <label className="flex items-center ">
            Adults:
            <input
              className="w-full p-1 font-bold focus:outline-none"
              type="number"
              min={1}
              max={20}
              placeholder="00"
              {...register("adultCount", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "There must be at least one Adult"
                },
                valueAsNumber: true,
              })}
            />
          </label>
          <label className="flex items-center">
            Children:
            <input
              className="w-full p-1 font-bold focus:outline-none"
              type="number"
              min={0}
              max={20}
              placeholder="00"
              {...register("childCount", { valueAsNumber: true, })}
            />
          </label>
          {
            errors.adultCount && (<span className="text-sm font-semibold text-red-500">
              {errors?.adultCount.message}
            </span>)
          }
        </div>

        {
          isLoggedIn
            ? (
              <button className="h-full p-2 text-xl font-bold text-white bg-blue-600 hover:bg-blue-500">
                Book Now
              </button>
            ) : (
              <button className="h-full p-2 text-xl font-bold text-white bg-blue-600 hover:bg-blue-500">
                Sign in to Book
              </button>
            )
        }

      </form>
    </div>

  )
}

export default GuestInfo