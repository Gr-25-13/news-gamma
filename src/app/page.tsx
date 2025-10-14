import HeroSection from "./components/navbar/herroSection";
import { getSpotPrices } from "@/lib/spotprices";
import SpotChart from "./components/spotchart";

export default async function Home() {
  const today = new Date().toISOString().split("T")[0];
  const data = await getSpotPrices(today);
  const areas = ["SE1", "SE2", "SE3", "SE4"];

  return (
    <div className="font-sans min-h-screen p-8 sm:p-20 bg-sky-50">
      <HeroSection />

      <main className="flex flex-col items-center mx-auto w-full max-w-7xl border rounded-lg p-6 bg-white shadow">
        <h1 className="text-3xl font-bold text-blue-700 mb-8">
          💡 Sweden Electricity Spot Prices ({today})
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {areas.map((area) => (
            <SpotChart
              key={area}
              data={data[area]}
              title={`Spot Prices ${area}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
