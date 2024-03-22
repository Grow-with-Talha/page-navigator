import { CardWrapper } from "./card-wrapper"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
const ErrorCard = () => {
  return (
    <CardWrapper headerLabel="oops something went wrong" backButtonLabel="back to login" backButtonHref="/auth/login" >
        <div className="w-full justify-center items-center flex">
            <ExclamationTriangleIcon className="w-16 h-16 text-destructive" />
        </div>
    </CardWrapper>
  )
}

export default ErrorCard