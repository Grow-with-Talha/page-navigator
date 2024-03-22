"use client"
import { CardWrapper } from "./card-wrapper"
import { useSearchParams } from "next/navigation"
import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "./actions/new-verification.action"
import { FormError } from "./form-components/form-error"
import { FormSuccess } from "./form-components/form-success"
const NewVerificationform = () => {
    const [error, setError] = useState<string | undefined>()
    const [success, setSuccess] = useState<string | undefined>()
    const searchParams = useSearchParams();
    const token = searchParams.get("token")
    const onSubmit = useCallback(() => {
        if(success || error) return;
        if(!token) {
            setError("Token is missing!")
        };

        newVerification(token!)
            .then((data) => {
                setError(data.error)
                 setSuccess(data.success)
            })
            .catch(() => {
                setError("Something went wrong!")
            })
    }, [token, success, error])
    useEffect(() => {
        onSubmit()
    }, [onSubmit])
    
  return (
        <CardWrapper headerLabel="Confirming your email" backButtonHref="/auth/login" backButtonLabel="Back to login.">
            <div className="flex items-center justify-center w-full">
            {!success && !error && (
                <BeatLoader />
            )}
                <FormSuccess message={success} />
                {!success && (
                    <FormError message={error} />
                )}
            </div>
        </CardWrapper>
    )
}

export default NewVerificationform