import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";

import { loadStripe, Stripe } from "@stripe/stripe-js";
import { STRIPE_PUB_KEY } from "../constants/config";

type ToastMessageProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextProps = {
  showToast: (toastMessage: ToastMessageProps) => void;
  isLoggedIn: boolean;
  stripePromise: Promise<Stripe | null>
};

const AppContext = createContext<AppContextProps | undefined>(undefined);


const stripePromise = loadStripe(STRIPE_PUB_KEY);

export const AppContextProvider = (
  { children }: { children: React.ReactNode }
) => {

  const [toast, setToast] = useState<ToastMessageProps | undefined>(undefined);

  const { isError } = useQuery(
    "validateToken",
    apiClient.validateToken,
    { retry: false, }
  );



  const showToast = (toastMessage: ToastMessageProps) => {
    setToast(toastMessage);
  };

  const value: AppContextProps = {
    showToast,
    isLoggedIn: !isError,
    stripePromise
  };

  return (
    <AppContext.Provider value={value}>

      {
        toast && (
          <Toast
            onClose={() => setToast(undefined)}
            message={toast.message}
            type={toast.type}
          />
        )
      }

      {children}
    </AppContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context as AppContextProps;
};
