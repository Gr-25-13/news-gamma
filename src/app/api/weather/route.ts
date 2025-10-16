import { NextResponse } from "next/server";
import { getWeatherByLocation } from "@/app/actions/weather";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { lat, lon, location } = body ?? {};

    let locParam: string | undefined;
    if (location && typeof location === "string") {
      locParam = location;
    } else if (typeof lat === "number" && typeof lon === "number") {
      // assume lexlink accepts "lat,lon" as a location identifier
      locParam = `${lat},${lon}`;
    }

    if (!locParam) return NextResponse.json({ error: "Missing location" }, { status: 400 });

    const data = await getWeatherByLocation(locParam);
    if (!data) return NextResponse.json({ error: "No data" }, { status: 502 });
    return NextResponse.json(data);
  } catch (err) {
    console.error("/api/weather error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
