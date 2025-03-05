"use client";
import type { Place } from '../lib/types';

import { useState, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
//import { GoogleMap, Marker } from "@react-google-maps/api";
import PlacePhotoDisplay from "./PlacePhotoDisplay";
//import { MapPin } from "lucide-react";



export function Locations() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [location, setLocation] = useState({ lat: 51.5902, lng: 0.0173 }); // Default to Walthamstow

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateLocation = () => {
    // Example usage of setLocation
    setLocation({ lat: 40.7128, lng: -74.0060 }); // New York City coordinates
  };

  useEffect(() => {
    const fetchPlaces = async () => {
      const res = await fetch(`/api/places?lat=${location.lat}&lng=${location.lng}`);
      const data: Place[] = await res.json();
      setPlaces(data);
    };

    fetchPlaces();
  }, [location]);

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_DEFAULT_API_KEY";

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