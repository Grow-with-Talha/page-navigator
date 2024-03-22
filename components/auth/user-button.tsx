import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { FaUser } from "react-icons/fa"
import { useCurrentUser } from "./hooks/use-current-user"
import SignOutButton from "./signout-button"
import { ExitIcon } from "@radix-ui/react-icons"
const UserButton = () => {
    const user = useCurrentUser();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image || ""} />
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white" />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 " align="end">
                <SignOutButton>
                    <DropdownMenuItem>
                        <ExitIcon className="h-4 w-4 mr-2"/>
                        Logout
                    </DropdownMenuItem>
                </SignOutButton>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton