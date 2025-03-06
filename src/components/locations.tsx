"use client";

import type { Place } from "../lib/types";

import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import PlacePhotoDisplay from "./PlacePhotoDisplay";
import { useLocationContext } from "@/context/location-provider";
// import WhereSubheading from "@/components/ui/where-subheading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react";


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
      {places.map((place, index) => (
        <CarouselItem key={index} className="basis-full">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className="w-full h-48 relative mb-4">
                <PlacePhotoDisplay 
                  place={place} 
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">
                {place.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-2">
                {place.vicinity || place.formatted_address}
              </p>
              
              <div className="flex items-center justify-center gap-2">
                <Star size={16} className="text-yellow-500" />
                <span className="text-sm font-medium">
                  {place.rating} ({place.user_ratings_total} reviews)
                </span>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </CarouselContent>
    <CarouselPrevious className="-left-4" />
    <CarouselNext className="-right-4" />
  </Carousel>
</LoadScript>
    </section>
  );
}

      // <LoadScript googleMapsApiKey={googleMapsApiKey}>
      //   <WhereSubheading />
      //   <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 max-w-4xl">
      //     {[0, 1, 2].map((index) => (
      //       <div
      //         key={index}
      //         className="relative overflow-hidden rounded-lg border-4 border-[#4A7C59] shadow-lg"
      //       >

      //         <div className="top-0 left-0 right-0 h-40 bg-[#4A7C59] flex items-center px-4">
      //           <div className="flex space-x-2">
      //             <div className="w-3 h-3 rounded-full bg-[#FAF3DD]"></div>
      //             <div className="w-3 h-3 rounded-full bg-[#C8D5B9]"></div>
      //             <div className="w-3 h-3 rounded-full bg-[#8FC0A9]"></div>
      //           </div>
      //         </div>
      //         <div className="pt-8">
      //           <PlacePhotoDisplay place={places[index]} />
      //         </div>
      //       </div>
      //     ))}
      //   </div>
      // </LoadScript>