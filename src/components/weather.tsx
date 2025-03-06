"use client";

import { useState, useEffect } from "react";
import { format, addHours, addDays } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow } from "lucide-react";
import type { WeatherWindow } from "@/lib/types";

export default function WeatherApp() {
  const [dryWindows, setDryWindows] = useState<WeatherWindow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const response = await fetch(
          `/api/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        );

        if (!response.ok) throw new Error("Weather API failed");

        const data = await response.json();

        if (!data?.current || !data?.hourly) {
          throw new Error("Invalid weather data format");
        }

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

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const processDryWindows = (hourly: WeatherWindow[]): WeatherWindow[] => {
    const dailyDryWindows = new Map<string, WeatherWindow>();
    const dailyFallbackWindows = new Map<string, WeatherWindow>();
    const endDate = addDays(new Date(), 5);

    for (const hour of hourly) {
      const date = new Date(hour.date);
      if (date > endDate) break;

      const hours = date.getHours();
      const dayKey = format(date, "yyyy-MM-dd");

      if (hours >= 8 && hours < 18) {
        if (hour.isDry) {
          const currentDryBest = dailyDryWindows.get(dayKey);
          if (
            !currentDryBest ||
            hour.temperature > currentDryBest.temperature
          ) {
            dailyDryWindows.set(dayKey, {
              ...hour,
              date: date,
              startTime: date,
              endTime: addHours(date, 1),
            });
          }
        }

        const currentFallbackBest = dailyFallbackWindows.get(dayKey);
        if (
          !currentFallbackBest ||
          hour.temperature > currentFallbackBest.temperature
        ) {
          dailyFallbackWindows.set(dayKey, {
            ...hour,
            date: date,
            startTime: date,
            endTime: addHours(date, 1),
            isDry: false,
          });
        }
      }
    }

    const results: WeatherWindow[] = [];
    const today = new Date();

    for (let i = 0; i < 5; i++) {
      const currentDay = addDays(today, i);
      const dayKey = format(currentDay, "yyyy-MM-dd");

      const bestWindow =
        dailyDryWindows.get(dayKey) || dailyFallbackWindows.get(dayKey);

      if (bestWindow) {
        results.push(bestWindow);
      }
    }

    return results
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  };

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
    <div className="max-w-sm p-4">
      {" "}
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {dryWindows.map((window, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  {" "}
                  {/* Added flex properties */}
                  <WeatherIcon condition={window.condition} />
                  <h3 className="text-xl font-semibold mb-2">
                    {format(window.startTime, "MMM d")}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {format(window.startTime, "h:mm a")} -{" "}
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
                </CardContent>
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
