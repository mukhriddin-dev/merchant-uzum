import * as yup from "yup"

export const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
})

export const phoneSchema = yup.object({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{9}$/, "Phone number must be 9 digits"),
})

export type LoginFormData = yup.InferType<typeof loginSchema>
export type PhoneFormData = yup.InferType<typeof phoneSchema>
