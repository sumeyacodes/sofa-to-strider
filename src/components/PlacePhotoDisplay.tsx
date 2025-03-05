import React, { useState, useEffect } from "react";
import type { Place } from '../lib/types';
import Image from 'next/image'



function PlacePhotoDisplay({ place }: { place: Place }) {
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

  return (
    <div>
      {place ? (
        <h3>{place.name}</h3>
      ) : (<h3>Loading...</h3>
      )}
      
      {photoUrl ? (
        <Image src={photoUrl} width={200} height={200} alt="Place Photo" /> //feel free to change dimensions - this was just ot make it somewhat fit
      ) : (
        <p>No photo available.</p>
      )}
    </div>
  );
}

export default PlacePhotoDisplay;