import { toast } from "react-toastify";
import "./showFeedBack.css";

export const showFeedBack = (text: string) => {
  toast.error(text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    className: "error",
  });
};
