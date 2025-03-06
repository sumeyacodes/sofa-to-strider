"use client";
import type { Place } from "../lib/types";

import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
//import { GoogleMap, Marker } from "@react-google-maps/api";
import PlacePhotoDisplay from "./PlacePhotoDisplay";
//import { MapPin } from "lucide-react";
import { useLocationContext } from "@/context/location-provider";

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

  // function displayPlace(aPlace: Place) {
  //   const myName = aPlace.name;
  //   console.log('ref for photo is ' + aPlace.photos[0].photo_reference);
  //   alert(myName);
  // }

  return (
    <section className="flex flex-col items-center justify-center w-full h-full border">
      <h1>Where?</h1>
      <h2>Top three spots for a lovely walk</h2>
      <LoadScript googleMapsApiKey={googleMapsApiKey}>
        <PlacePhotoDisplay place={places[0]} />
        <PlacePhotoDisplay place={places[1]} />
        <PlacePhotoDisplay place={places[2]} />
        {/* <GoogleMap mapContainerStyle={{ width: "100%", height: "500px" }} zoom={13} center={location}>
          {places.map((place, index) => (
            <Marker key={index} onClick={()=>displayPlace(place)} position={{ lat: place.geometry.location.lat, lng: place.geometry.location.lng }} />
          ))}
        </GoogleMap> */}
      </LoadScript>
    </section>
  );
}
