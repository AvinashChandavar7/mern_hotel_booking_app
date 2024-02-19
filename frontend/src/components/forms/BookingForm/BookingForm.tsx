import { useForm } from "react-hook-form";
import { UserType } from "../../../types/types"

type BookingFormProps = {
  currentUser: UserType;
}

type BookingFormDataProps = {
  firstName: string;
  lastName: string;
  email: string;
}

const BookingForm = ({ currentUser }: BookingFormProps) => {

  const {
    register,
    handleSubmit
  } = useForm<BookingFormDataProps>({
    defaultValues: {
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      email: currentUser.email || "",
    }
  });

  const onSubmit = async () => { }

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
    </form>
  )
}

export default BookingForm