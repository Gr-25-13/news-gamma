import HeroSection from "./components/navbar/herroSection";
import { getSpotPrices } from "@/lib/spotprices";
import { FaClock, FaEuroSign, FaSign } from "react-icons/fa"; // icons

export default async function Home() {
  const today = new Date().toISOString().split("T")[0];
  const data = await getSpotPrices(today);
  const areas = ["SE1", "SE2", "SE3", "SE4"];

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20">
      <HeroSection />

      <main className="space-y-12">
        {areas.map((area) => (
          <div key={area}>
            <h2 className="text-2xl font-bold text-center mb-6">
              Spot Prices {area}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data[area].map((price) => (
                <div
                  key={price.hour}
                  className="p-4 border rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold mb-2 text-center">
                    <FaClock className="inline mr-1 text-gray-600" />
                    Hour {price.hour}
                  </h3>
                  <p>
                    <FaEuroSign className="inline mr-1 text-green-600" />
                    {price.price_eur} EUR
                  </p>
                  <p>
                    <FaSign className="inline mr-1 text-blue-600" />
                    {price.price_sek} SEK
                  </p>
                  <p>Kmeans: {price.kmeans}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
