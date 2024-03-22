import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <main className="h-screen w-full">
      <Navbar />
      <HeroSection />
    </main>
  );
}