import React, { useState, useEffect } from "react";
// import type { Place } from '../lib/types';
import Image from "next/image";
import { PlacePhotoDisplayProps } from "../lib/types";

function PlacePhotoDisplay({ place, className }: PlacePhotoDisplayProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (place?.photos && place.photos.length > 0) {
        const photo = place.photos[0];

        const stringToFetch = `/api/photo?photoReference=${photo.photo_reference}`;
        console.log("In the PlacePhotoDisplay component. stringToFetch is ");
        console.log(stringToFetch);


        try {
          const response = await fetch(stringToFetch);

          if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPhotoUrl(url);
          } else {
            console.error("Error fetching photo");
          }
        } catch (error) {
          console.error("Error fetching photo:", error);
        }
      } else {
        setPhotoUrl(null);
      }
    };

    fetchPhoto();
  }, [place]);

  const mapsUrl = place
    ? `https://www.google.com/maps/place/?q=place_id:${place.place_id}`
    : "#";

  return (
    <div className={className}>
      {place ? <h3>{place.name}</h3> : <h3>Loading...</h3>}
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt="Place Photo"
          layout="fill"
          objectFit="cover"
        /> //unable to fully manipulate dimensions here, using the containers to constrain size instead in locations
      ) : (
        <p>No photo available.</p>
      )}
      {place && (
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
      )}
    </div>
  );
}

export default PlacePhotoDisplay;
