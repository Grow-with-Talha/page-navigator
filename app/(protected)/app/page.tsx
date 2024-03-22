import { getPopularBooks } from '@/actions/books'
import BookCollection from '@/components/BookCollection';
import { Button } from '@/components/ui/button';

const Home = async () => {
  const bestSellers = await getPopularBooks();
  return (
    <main>
      <div>
      <h1 className='text-4xl m-2 font-bold'>Best Sellers</h1>
      <BookCollection 
        books={bestSellers!}
        />
        </div>
    </main>
  )
}

export default Home 