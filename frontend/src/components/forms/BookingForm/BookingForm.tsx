import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { StripeCardElement } from "@stripe/stripe-js";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";


import * as apiClient from "../../../api/api-client";

import { useAppContext } from "../../../contexts/AppContext";
import { useSearchContext } from "../../../contexts/SearchContext";

import { PaymentIntentResponse, UserType } from "../../../types/types"

export type BookingFormProps = {
  currentUser: UserType;
  paymentIntent: PaymentIntentResponse;

}

export type BookingFormDataProps = {
  firstName: string;
  lastName: string;
  email: string;

  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  totalCost: number;
}

const BookingForm = (
  { currentUser, paymentIntent }: BookingFormProps
) => {

  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { showToast } = useAppContext();
  const { hotelId } = useParams();


  console.log(paymentIntent)

  // const { mutate: bookRoom, isLoading } = useMutation(
  //   apiClient.createRoomBooking,
  //   {
  //     onSuccess: () => {
  //       console.log("Booking Saved!");
  //       showToast({ message: "Booking Saved!", type: "SUCCESS" });
  //     },
  //     onError: () => {
  //       console.log("Error saving booking");
  //       showToast({ message: "Error saving booking", type: "ERROR" });
  //     },
  //   }
  // );

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    }
  );


  const { register, handleSubmit } = useForm<BookingFormDataProps>({
    defaultValues: {
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      email: currentUser.email || "",

      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      paymentIntentId: paymentIntent.paymentIntentId,
      totalCost: paymentIntent.totalCost
    }
  });

  const onSubmit = async (formData: BookingFormDataProps) => {
    if (!stripe || !elements) {
      console.error("Stripe or elements is not initialized.");
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    console.log("result", result);
    console.log("result", result.paymentIntent);
    console.log("result", result.paymentIntent?.status);
    console.log("result", result.paymentIntent?.id);


    if (result.paymentIntent?.status === "succeeded") {
      console.log("paymentIntentId", result.paymentIntent.id)
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }

    // console.log(formData)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 p-5 border border-blue-300 rounded-lg"
    >
      <span className="text-3xl font-bold">
        Confirm Your Details
      </span>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <label className="flex-1 text-sm font-bold text-gray-700">
          First Name

          <input type="text" readOnly disabled
            className="w-full px-3 py-2 mt-1 font-bold text-gray-700 bg-blue-100 border rounded"
            {...register("firstName")}
          />
        </label>

        <label className="flex-1 text-sm font-bold text-gray-700">
          Last Name

          <input type="text" readOnly disabled
            className="w-full px-3 py-2 mt-1 font-bold text-gray-700 bg-blue-100 border rounded"
            {...register("lastName")}
          />
        </label>

        <label className="flex-1 text-sm font-bold text-gray-700">
          Email

          <input type="email" readOnly disabled
            className="w-full px-3 py-2 mt-1 font-bold text-gray-700 bg-blue-100 border rounded"
            {...register("email")}
          />
        </label>
      </div>

      <div className="space-y-2">

        <h2 className="text-xl font-semibold">
          Your Price Summary
        </h2>

        <div className="p-4 bg-blue-100 rounded-md">
          <div>
            Total Cost : ₹{paymentIntent?.totalCost?.toFixed(2)}
          </div>

          <div className="text-xs">
            Includes taxes and Charges
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">
          Payment Details
        </h2>

        <CardElement
          id="payment-element"
          className="p-2 text-sm border rounded-md"
        />
      </div>

      <div className="flex justify-end">
        <button
          disabled={isLoading}
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500 text-md disabled:bg-gray-500"
        >
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>


    </form>
  )
}

export default BookingForm

