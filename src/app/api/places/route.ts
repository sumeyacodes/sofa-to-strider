import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import type { Place } from "../../../lib/types";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  if (!lat || !lng) {
    return NextResponse.json({ error: "Latitude and longitude are required" }, { status: 400 });
  }

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
      
      {
        params: {
          location: `${lat},${lng}`,
          //location: `51.5902, 0.0173`, //hard code for now
          radius: 5000, // 5km radius
          type: "park", // Change this for other place types
          key: process.env.GOOGLE_PLACES_API_KEY, // Store your API key in .env.local
        },
      }
    );
    console.log("got places:");

    console.log("going through and removing entries with no photo")
  
    const filtered: Place[] = response.data.results.filter(hasPhotosAndEnoughRatings);
    
          function hasPhotosAndEnoughRatings(aPlace: Place): boolean {
            
            return aPlace.user_ratings_total > 40 && Boolean(aPlace.photos);
    
          }
          // console.log(`The filtered array contains:`);
          // console.log(filtered);
    
    return NextResponse.json(filtered);
  } catch (error) {
      console.log(error);
    return NextResponse.json({ error: "Failed to fetch places" }, { status: 500 });
  }
}
