import { toast } from "react-toastify";
import "./showFeedBack.css";

export const showFeedback = (message: string, type: "error" | "success") => {
  toast[type](message, {
    position: "top-center",
    autoClose: 2500,
    theme: "dark",
    className: "toast",
  });
};
