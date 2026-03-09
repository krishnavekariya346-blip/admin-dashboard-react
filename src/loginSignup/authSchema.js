import * as yup from "yup";

export const signupSchema = yup.object({
    name: yup.string().required("Name is Required"),

    email: yup
        .string()
        .email("Enter Valid Email")
        .required("Email is Required"),

    password: yup
        .string()
        .min(6, "Password must be at least 6 Characters")
        .required("Password is Required"),
});

export const loginSchema = yup.object({
    email: yup.string().email("Enter Valid Email").required("Email is Required"),
    password: yup.string().required("Password is Required"),
});