
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  // type CarouselApi,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Sun, Cloud, CloudRain, CloudSnow } from "lucide-react";
import type { WeatherWindow } from "@/lib/types";
import { useLocationContext } from "@/context/location-provider";
import { processDryWindows } from "@/utils/get-weather";

export default function WeatherApp() {
  const [dryWindows, setDryWindows] = useState<WeatherWindow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [api, setApi] = useState<CarouselApi>();
  // const [current, setCurrent] = useState(0);
  // const [count, setCount] = useState(0);
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
  }, [location.latitude, location.longitude]);

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

   const PerkyMessage = ({ condition }: { condition: string }) => {
  
    switch (condition) {
      case "sunny":
        return `It's lovely and sunny!`;
      case "cloudy":
        return `A few clouds won't kill you`;
      case "rainy":
        return `Go dance in the rain!`;
      case "snowy":
        return `Go throw some snowballs `;
      default:
        return `Perfect for walking!`;
    }
  };

  

  if (loading)
    return <div className="text-center p-8">Loading weather data...</div>;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <div className="max-w-sm p-4">
      {" "}
      <Carousel /*setApi={setApi}*/ className="w-full">
        <CarouselContent>
          {dryWindows.map((window, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4 text-center">
                  {" "}
                  {/* Added flex properties */}
                  <WeatherIcon condition={window.condition} />
                  <h3 className="text-xl font-semibold mb-2">Go at&nbsp; 
                  {format(window.startTime, "h:mm a")} on{" "}
                    {/* {format(window.endTime, "h:mm a")} */}
                    {format(window.startTime, "d MMM")}
                    
                  </h3>
                  <p className="text-sm text-bold-foreground mb-4">
                     <PerkyMessage condition={window.condition} />
                    
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Sun size={16} />
                    {/* <span className="text-sm font-medium">
                      {window.isDry
                        ? "Perfect for Walking!"
                        : "Not ideal but best of the rest!"}
                    </span> */}
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
