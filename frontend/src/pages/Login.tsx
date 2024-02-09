import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAppContext } from "../contexts/AppContext";

import * as apiClient from "../api/api-client";

export type SignInFormData = {
  email: string;
  password: string;
}


const Login = () => {
  const navigate = useNavigate();

  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>();


  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      showToast({ message: "Login Success!", type: "SUCCESS" });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    }
  })

  const onSubmit = handleSubmit(
    (data) => {
      console.log(data)
      mutation.mutate(data)
    }
  )

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Login </h2>


      <label className="flex-1 text-sm font-bold text-gray-700">
        Email

        <input type="text"
          className="w-full px-2 py-1 font-normal border rounded "
          {...register("email", { required: "This field is required" })}
        />

        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>


      <label className="flex-1 text-sm font-bold text-gray-700">
        Password

        <input type="password"
          className="w-full px-2 py-1 font-normal border rounded "
          {...register("password",
            {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "password must be at least 6 characters"
              }
            })}
        />

        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>


      <span>
        <button
          type="submit"
          className="p-2 text-xl font-bold text-white bg-blue-600 hover:bg-blue-500">
          Login
        </button>
      </span>




    </form>
  )
}

export default Login;