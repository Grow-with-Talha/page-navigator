"use server"
import { getUserById } from "@/components/auth/data/user";
import { IBooksData, addBooktoDBProps } from "@/types/books";
import axios from "axios"



export const getPopularBooks = async () => {
    try {
        let books;
        const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
            params: {
                q: "New York Times Best Seller",
                key: process.env.GOOGLE_BOOK_API_KEY,
            },
        }).then((data) => {
            books = data.data.items
        })

        return books

    } catch (error) {
        console.error("Error fetching popular books:", error);
        // Optionally throw the error to propagate it if needed
        // throw error;
    }
};


export const addBooktoDb = async ({
    bookId,
    totalPages,
    userId,
    author,
    category,
    coverImgUrl,
    description, 
    title,
}: addBooktoDBProps) => {
    if(!userId){
        throw new Error("userid not found")
    }
    const user = await getUserById(userId)

    if (!user) {
        throw new Error("User not found")
    }

    const book = await prisma?.book.create({
        data: {
            author: author,
            bookId: bookId,
            description: description,
            coverImgUrl: coverImgUrl,
            category: category,
            title: title,
            totalPages: totalPages,
            userId: userId,
        }
    })
    return book
    try {

    } catch (error) {
        console.log(error)
    }
}