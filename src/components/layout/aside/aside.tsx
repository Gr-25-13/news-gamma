import * as React from "react";
import MostPopular from "@/components/layout/aside/MostPopular";
import SubscribeNow from "@/components/layout/aside/SubscribeNow";
import WeatherAside from "@/components/layout/aside/WeatherAside";
import ElectricityPrices from "@/components/layout/aside/ElectricityPrices";

interface WeatherTimeseriesItem {
  temp: number | null;
  summary?: string;
}

interface WeatherData {
  tempC?: number;
  location?: string;
  condition?: string;
  timeseries?: WeatherTimeseriesItem[];
}

interface AsideProps {
  weather?: WeatherData;
  onSubscribeClick?: () => void;
  popular?: Array<{ title: string; href?: string }>;
}

export default function Aside({
  weather,
  onSubscribeClick,
  popular = [],
}: AsideProps) {
  return (
    <aside className="space-y-8">
      <MostPopular popular={popular} />
      <SubscribeNow onSubscribeClick={onSubscribeClick} />
      <WeatherAside weather={weather} />
      <ElectricityPrices />
    </aside>
  );
}

//jag har problem med att visa "Mest populära" i sidofältet (Aside). Felet uppstod eftersom en server-komponent 
// (MostPopularServer) krockar när Aside används på sidor som är client-komponenter.
// Jag kan lösa det på två sätt och undrar vilket du rekommenderar: