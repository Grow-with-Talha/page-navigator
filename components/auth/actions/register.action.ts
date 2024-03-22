"use server";
import * as z from "zod";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";
import { RegisterSchema } from "../schema";
import { getUserByEmail } from "../data/user";
import { generateVerificationToken } from "../data/token";
import { sendVerificationEmail } from "../lib/mail";
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }

  const {name, email, password} = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  // checking the existing user
  const existingUser = await getUserByEmail(email)

  if(existingUser){
    return { error: "email already in use!"}
  }
  
  // Adding user to db
  await db.user.create({
    data: {
      email: email,
      name: name,
      password: hashedPassword
    }
  })
// generating verification token
  const verificationToken = await generateVerificationToken(email)
  // TODO: Send verification token email
  await sendVerificationEmail(verificationToken?.email, verificationToken?.token)
  return { success: "Confirmation email sent succesfully" };
};
