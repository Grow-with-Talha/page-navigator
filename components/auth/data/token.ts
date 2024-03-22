import crypto from "crypto"
import { getTwoFactorTokenByEmail } from "./two-factor-token"
import { v4 as uuidv4 } from "uuid"
import { getVerificationTokenByEmail } from "./verification-token"
import { db } from "@/lib/db"
import { getPasswordResetTokenByEmail } from "./password-reset-token"


export const generateTwoFactorToken = async (email: string) => {
    const token = crypto.randomInt(100000, 1000000).toString()
    const expires = new Date( new Date().getTime() + 5 * 60 * 1000)


    const existingToken = await getTwoFactorTokenByEmail(email)

    if(existingToken){
        await db.twoFactorToken.delete({
            where: {
                id: existingToken?.id,
            }
        })
    }

    const twoFactorToken = await db.twoFactorToken.create({
        data: {
            token: token,
            email: email,
            expires: expires
        }
    })
    return twoFactorToken;
}


export const genratePasswordResetToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date( new Date().getTime() + 3600 * 1000)

    const existingToken = await getPasswordResetTokenByEmail(email)

    if(existingToken){
        await db.passwordResetToken.delete({
            where: {
                id: existingToken?.id,
            }
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email: email,
            token: token,
            expires: expires
        }
    })

    return passwordResetToken;
}

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4()
    const expires = new Date( new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if(existingToken) {
        await db.verificationToken.delete({
            where: {
                id: existingToken?.id,
            }
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: {
            email: email,
            token: token,
            expires: expires,
        }
    })
    return verificationToken
}