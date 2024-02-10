import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api/api-client"
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.logOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Logged out!", type: "SUCCESS" })
      navigate("/login")
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" })
    },
  });

  const handleClick = () => {
    mutation.mutate()
  }


  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 text-sm font-bold text-blue-600 bg-white rounded-sm hover:bg-gray-100"
    >
      SignOut
    </button>
  )
}

export default LogOutButton;