"use server";

import * as z from "zod"

import { ResetSchema } from "../schema";
import { getUserByEmail } from "../data/user";
import { genratePasswordResetToken } from "../data/token";
import { sendPasswordResetEmail } from "../lib/mail";
export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);

    if(!validatedFields.success){
        return { error: "Invalid email"}
    }


    const {email} = validatedFields.data;

    const existingUser = await getUserByEmail(email)

    if(!existingUser) {
        return { error: "email not found"}
    }

    const passwordResetToken = await genratePasswordResetToken(email);
    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token)

    return { success: "Reset email sent"}
}