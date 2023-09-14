import { toast } from "react-toastify";
import "./showFeedBack.css";

export const showFeedback = (message: string, type: "error" | "success") => {
  toast[type](message, {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    className: "toast",
  });
};
