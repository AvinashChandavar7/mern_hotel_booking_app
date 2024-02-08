import { useEffect } from "react";


type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose: () => void;
}


const Toast = ({ message, type, onClose }: ToastProps) => {


  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearInterval(timer);
  }, [onClose]);

  const styles = type === "SUCCESS"
    ? "fixed z-50 max-w-md p-4 text-white bg-green-600 rounded-md top-4 right-4"
    : "fixed z-50 max-w-md p-4 text-white bg-red-600 rounded-md top-4 right-4"



  return (
    <div className={styles}>
      <div className="flex items-center justify-center">
        <span className="text-lg font-semibold">
          {message}
        </span>
      </div>
    </div>
  )
}

export default Toast;