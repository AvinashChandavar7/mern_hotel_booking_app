import { API_BASE_URL } from "../constants/config";
import { RegisterFormData } from "../pages/Register";


const REGISTER_URL = `${API_BASE_URL}/api/v1/users/register`;


export const register = async (formData: RegisterFormData) => {
  const response = await fetch(REGISTER_URL, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  // console.log(data)

  // return data;
}