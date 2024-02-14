import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"

import * as apiClient from "../api/api-client"
import ManageHotelForm from "../components/forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  const { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => apiClient.fetchMyHotelById(hotelId || ""),
    { enabled: !!hotelId }
  );

  const {
    mutate,
    isLoading
  } = useMutation(
    apiClient.updateMyHotel,
    {
      onSuccess: async () => {
        showToast({ message: "Updated Success!", type: "SUCCESS" });
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      }
    }
  )

  const handleSave = async (hotelFromData: FormData) => {
    mutate(hotelFromData)
  }

  return (
    <ManageHotelForm
      hotel={hotel}
      onSave={handleSave}
      isLoading={isLoading}
    />
  )
}

export default EditHotel;