import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { useAppContext } from "../contexts/AppContext";

import * as apiClient from "../api/api-client";

export type SignInFormData = {
  email: string;
  password: string;
}


const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "aaaa@gmail.com",
      password: "123456",
    }
  });


  const mutation = useMutation(apiClient.login, {
    onSuccess: async () => {
      showToast({ message: "Login Success!", type: "SUCCESS" });
      await queryClient.invalidateQueries("validateToken")
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
    <>
      <div className="flex items-center justify-center p-3 lg:px-16 lg:py-5">


        <form className="flex flex-col w-full gap-5" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold">Login </h2>


          <label className="flex-1 text-sm font-bold text-gray-700">
            Email

            <input type="email"
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


          <span className="flex flex-col items-center justify-between gap-5 md:flex-row ">
            <span className="items-start text-sm">
              Not Registered?&nbsp;
              <Link to="/register" className="text-blue-600 underline hover:text-purple-500">Create an account here</Link>
            </span>


            <button
              type="submit"
              className="w-full px-4 py-2 text-xl font-bold text-white bg-blue-600 rounded-md md:w-fit hover:bg-blue-500">
              Login
            </button>
          </span>




        </form>
      </div>

    </>
  )
}

export default Login;