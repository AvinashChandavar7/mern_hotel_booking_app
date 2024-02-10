import { API_BASE_URL } from "../constants/config";
import { SignInFormData } from "../pages/Login";
import { RegisterFormData } from "../pages/Register";


const REGISTER_URL = `${API_BASE_URL}/api/v1/users/register`;
const LOGIN_URL = `${API_BASE_URL}/api/v1/auth/login`;
const LOGOUT_URL = `${API_BASE_URL}/api/v1/auth/logout`;
const VALIDATE_TOKEN_URL = `${API_BASE_URL}/api/v1/auth/validate-token`;

const ADD_HOTEL_URL = `${API_BASE_URL}/api/v1/my-hotels`;


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

export const login = async (formData: SignInFormData) => {
  const response = await fetch(LOGIN_URL, {
    method: 'POST',
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const validateToken = async () => {
  const response = await fetch(VALIDATE_TOKEN_URL, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token Invalid");
  }

  return response.json();
}

export const logOut = async () => {
  const response = await fetch(LOGOUT_URL, {
    method: 'POST',
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error during LogOut");
  }

  return response.json();
}


export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(ADD_HOTEL_URL, {
    method: 'POST',
    credentials: "include",
    body: (hotelFormData),
  });


  if (!response.ok) {
    throw new Error("Failed to add my hotel");
  }

  return response.json();
}