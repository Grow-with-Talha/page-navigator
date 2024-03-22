import * as z from "zod"


export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
        message: "minimum of 6 characters required"
    }),
})
export const ResetSchema = z.object({
    email: z.string().email({
        message: "Email is required. Please enter a valid email."
    }),
})
export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required. Please enter a valid email."
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    code: z.optional(z.string())
})
export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required. Please enter a valid email."
    }),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1, {
        message: "name is required"
    })
})