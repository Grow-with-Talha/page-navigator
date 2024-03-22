"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import * as z from "zod";
import { LoginSchema } from "../schema";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { getUserByEmail } from "../data/user";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "../data/token";
import { sendVerificationEmail, sendTwoFactorEmail } from "../lib/mail";
import { getTwoFactorTokenByEmail } from "../data/two-factor-token";
import { db } from "@/lib/db";
import { getTwoFactorConfirmationByUserId } from "../data/two-factor-confirmation";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, code } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.name || !existingUser.password) {
    return { error: "Invalid Credientials" };
  }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken?.email,
      verificationToken?.token
    );

    return {
      success: "Email not verified. New verification token is sent via email.",
    };
  }
  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if(!twoFactorToken){
        return { error: "Invalid code"}
      }
      if(twoFactorToken.token !== code){
        return { error: "Invalid code"}
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if(hasExpired){
        return { error: "Code expired"}
      }

      await db.twoFactorToken.delete({
        where: {id: twoFactorToken.id}
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      if(existingConfirmation){
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id}
        })
      }

      await db.twoFactorConfirmation.create({
        data: { userId: existingUser.id}
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);
      await sendTwoFactorEmail(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "something went wrong!!" };
      }
    }
    throw error;
  }
};
