import React, { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

type ToastMessageProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextProps = {
  showToast: (toastMessage: ToastMessageProps) => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppContextProvider = (
  { children }: { children: React.ReactNode }
) => {

  const [toast, setToast] = useState<ToastMessageProps | undefined>(undefined);

  const showToast = (toastMessage: ToastMessageProps) => {
    setToast(toastMessage);
  };

  const value: AppContextProps = {
    showToast,
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
