import Link from "next/link"
import { Button } from './ui/button'
import Image from 'next/image'
import heroImage from "@/assets/heroImage.png"
const HeroSection = () => {
  return (
    <section className='max-w-[1400px] mx-auto flex items-center h-[80vh] w-full  gap-9'>
      <div className='gap-9 flex flex-col items-start justify-start p-10'>
        <h1 className='text-7xl font-bold'>Unlock Your Reading Universe.</h1>
        <p className=' text-muted-foreground'>Discover, Track, and Share Your Literary Journey</p>
        <Button size={'lg'} className='w-full' asChild>
          <Link href={'/auth/login'}>
            Try Now
          </Link>
        </Button>
      </div>
      <div className='flex items-center justify-center'>
        <Image src={heroImage} alt='hello' height={1000} width={1000} />
      </div>
    </section>
  )
}

export default HeroSection