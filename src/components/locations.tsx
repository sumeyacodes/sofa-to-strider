"use client";

import type { Place } from "../lib/types";
import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import PlacePhotoDisplay from "./PlacePhotoDisplay";
import { useLocationContext } from "@/context/location-provider";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function Locations() {
  const [places, setPlaces] = useState<Place[]>([]);
  const { location } = useLocationContext();

  useEffect(() => {
    const fetchPlaces = async () => {
      const res = await fetch(
        `/api/places?lat=${location.latitude}&lng=${location.longitude}`
      );
      const data: Place[] = await res.json();
      setPlaces(data);
    };

    fetchPlaces();
  }, [location]);

  const googleMapsApiKey =
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_DEFAULT_API_KEY";

  return (
    <section className="flex flex-col items-center justify-center w-full">
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <Carousel className="w-full max-w-md mx-auto p-4">
          <CarouselContent>
            {places.map((place, index) => {
              const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                place.name
              )}&destination_place_id=${place.place_id}`;
              return (
                <CarouselItem key={index} className="basis-full">
                  <Card className="shadow-lg rounded-lg overflow-hidden">
                    <div className="w-full h-48 relative mb-0">
                      <PlacePhotoDisplay
                        place={place}
                        className="rounded-lg object-cover w-full h-full"
                      />
                    </div>
                    <CardContent className="flex flex-row items-center justify-between p-6 text-center relative">
                      <div className="flex flex-col items-start">
                        <h3 className="text-xl font-semibold mb-2">
                          {place.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {place.vicinity || place.formatted_address}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          {/* <Star size={16} className="text-yellow-500" /> */}
                          <span className="text-sm font-medium">
                            {place.rating} ({place.user_ratings_total} reviews)
                          </span>
                        </div>
                        <a
                          href={directionsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-300 hover:underline"
                        >
                          <img
                            src="/logo_15465700.png"
                            alt="Google Maps Pin"
                            className="w-8 h-8" // Increase size
                          />
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="-left-4" />
          <CarouselNext className="-right-4" />
        </Carousel>
      </LoadScript>
    </section>
  );
}
