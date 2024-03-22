"use client"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "./ui/card"
import Link from "next/link";
import { Button } from "./ui/button";
import { currentUser } from "./auth/lib/auth";
import { useCurrentUser } from "./auth/hooks/use-current-user";
import { addBooktoDb } from "@/actions/books";
import { toast } from "sonner";
interface BookCardProps {
    id: string;
    category: string;
    img: string;
    title: string;
    rating: string;
    description: string,
    totalPages: number,
    author: string,

}
const BookCard = ({ category, img, rating, title, id, description, totalPages, author }: BookCardProps) => {
    const user = useCurrentUser()
    const onAddToCollection = async () => {
        await addBooktoDb({
            bookId: id,
            userId: user?.id,
            title: title,
            description: description,
            totalPages: totalPages,
            category: category,
            coverImgUrl: img,
            author: author,
        }).then(() => {
            toast.success("Book added to collection")
        })
    }

    return (
        <Card className="relative h-[350px] w-[247px]">
            <CardContent>
                <Link href={`/book/${id}`}>

                    <CardHeader>
                        <Badge className="absolute top-0 right-0 m-3 line-clamp-1 text-xs" variant={"category"}>
                            {category}
                        </Badge>
                        <Image priority src={img} alt={title} width={300} height={302} objectFit="cover" className="object-cover w-full h-full pointer-events-none " />
                    </CardHeader>
                </Link>
                <CardFooter className="absolute bottom-0 left-0">
                    <CardTitle className="">
                        <p className="line-clamp-1">{title}</p>
                        <Button onClick={onAddToCollection} size={"sm"}>Add To Collection</Button>
                    </CardTitle>
                </CardFooter>
            </CardContent>
        </Card>
    )
}

export default BookCard