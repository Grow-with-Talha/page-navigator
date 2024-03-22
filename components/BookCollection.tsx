import { IBook, IBooksData } from "@/types/books"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import BookCard from "./BookCard"


const BookCollection = (books: IBooksData) => {
  return (
    <div className="bg-[#DEE1E6] w-[95%] mx-auto h-[376px] flex justify-center items-center">
      <Carousel className="w-[90%] ">
        <CarouselContent className=" ">
          {books.books.map((book: IBook) => (
            <CarouselItem key={book?.id} className="text-3xl md:basis-1/2 lg:basis-1/5 pl-5">
              <BookCard
                category={book.volumeInfo.categories[0]}
                img={book.volumeInfo.imageLinks.thumbnail} 
                id={book.id} 
                title={book.volumeInfo.title} 
                rating="5" 
                totalPages={book.volumeInfo.pageCount}
                description={book.volumeInfo.description}
                author={book.volumeInfo.authors[0]}
                />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default BookCollection