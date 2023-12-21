import { toast } from "react-toastify";
import * as Yup from "yup";
export const header = localStorage.getItem("_tokenCode");
export const userSchema = Yup.object({
  name: Yup.string().min(2).max(20).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(8).required("Please enter your password"),
});

export const forGotSchema = Yup.object({
  email: Yup.string().email().required("Please enter your email"),
});

export const passwordSchema = Yup.object({
  password: Yup.string().min(8).required("Please enter your password"),
  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

// ? TOTAL APLICATION SUCCESS AND ERROR MESSAGE
export const MESSAGE = (data, status) => {
  toast(data, {
    position: "top-right",
    autoClose: 5000,
    type: status === 1 ? "success" : "error",
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
