import { API_BASE_URL } from "../constants/config";
import { RegisterFormData } from "../pages/Register";


const REGISTER_URL = `${API_BASE_URL}/api/v1/users/register`;
const VALIDATE_TOKEN_URL = `${API_BASE_URL}/api/v1/auth/validate-token`;


export const register = async (formData: RegisterFormData) => {
  const response = await fetch(REGISTER_URL, {
    method: 'POST',
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(VALIDATE_TOKEN_URL, {
    credentials: "include",
  });

  // const data = await response.json();

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return response.json();
}