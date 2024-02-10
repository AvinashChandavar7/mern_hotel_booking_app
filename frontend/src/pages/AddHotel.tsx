import { useMutation } from "react-query"
import ManageHotelForm from "../components/forms/ManageHotelForm/ManageHotelForm"
import * as apiClient from "../api/api-client"
import { useAppContext } from "../contexts/AppContext"

const AddHotel = () => {
  const { showToast } = useAppContext();

  const {
    mutate,
    isLoading
  } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" })
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" })

    }
  })

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  }

  return (
    <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
  )
}

export default AddHotel