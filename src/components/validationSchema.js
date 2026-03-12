import * as yup from 'yup';

const emailValidation = yup.string()
    .required("Email is required")
    .email("Invalid email format");

const passwordValidation = yup.string()
    .required("Password is required");


export const loginSchema = yup.object({
    email: emailValidation,
    password: passwordValidation,
});


export const signupSchema = yup.object({
    firstname: yup.string().required("First name is required"),
    lastname: yup.string().required("Last name is required"),
    email: emailValidation
        .required("Email is required")
        .email("Invalid email format")
        .min(5, "Email is too short")
        .max(50, "Email is too long"),

    password: passwordValidation
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(20, "Password can't exceed 20 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/\d/, "Password must contain at least one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
});