import { generateNews } from "@/lib/ai";
import HeroSection from "./components/navbar/herroSection";

export default async function Home() {
  const object = await generateNews("Gaza");
  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 bg-sky-150">
      <HeroSection />
      <div>
        <h1>{object.title}</h1>
      </div>
    </div>
  );
}
