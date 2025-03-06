"use client";
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow } from "lucide-react"; // deleted Umbrella
import type { WeatherWindow } from "@/lib/types"; // deleted WeatherData, ProcessedHour
import { useLocationContext } from "@/context/location-provider";
import { processDryWindows } from "@/utils/get-weather";

export default function WeatherApp() {
  // const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [dryWindows, setDryWindows] = useState<WeatherWindow[]>([]);

  // const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { location } = useLocationContext();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `/api/weather?lat=${location.latitude}&lon=${location.longitude}`
        );

        if (!response.ok) throw new Error("Weather API failed");

        const data = await response.json();

        if (!response.ok) throw new Error("Weather API failed");

        if (!data?.current || !data?.hourly) {
          throw new Error("Invalid weather data format");
        }

        // setWeatherData(data.current)
        setDryWindows(processDryWindows(data.hourly));
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load weather data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  const WeatherIcon = ({ condition }: { condition: string }) => {
    const iconProps = { size: 48, className: "mb-4" };

    switch (condition) {
      case "sunny":
        return <Sun {...iconProps} />;
      case "cloudy":
        return <Cloud {...iconProps} />;
      case "rainy":
        return <CloudRain {...iconProps} />;
      case "snowy":
        return <CloudSnow {...iconProps} />;
      default:
        return <Cloud {...iconProps} />;
    }
  };

  if (loading)
    return <div className="text-center p-8">Loading weather data...</div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <Carousel opts={{ align: "start", slidesToScroll: 1 }} className="w-full">
        <CarouselContent>
          {dryWindows.map((window, index) => (
            <CarouselItem key={index} className="basis-1/3">
              <Card className="p-6 text-center">
                <WeatherIcon condition={window.condition} />
                <h3 className="text-xl font-semibold mb-2">
                  {format(window.startTime, "MMM d")}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {format(window.endTime, "h:mm a")}
                </p>
                <div className="flex items-center justify-center gap-2">
                  <Sun size={16} />
                  <span className="text-sm font-medium">
                    {window.isDry
                      ? "Perfect for Walking!"
                      : "Not ideal but best of the rest!"}
                  </span>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
