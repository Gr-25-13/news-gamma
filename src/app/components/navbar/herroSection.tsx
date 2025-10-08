import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Välkommen till Dagens Dos
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Svenskaste nyheterna — levererade med minimal smärta och maximal
          insikt.
        </p>
        <Button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800">
          Läs de senaste nyheterna
        </Button>
      </div>
    </section>
  );
}
