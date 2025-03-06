"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getGeoLocation } from "@/utils/get-location";
import type { LocationType, LocationContextType } from "@/lib/types";

// Create a Context object that will be used to share location data
const LocationContext = createContext<LocationContextType>(null);

export function LocationProvider({ children }): React.ReactNode {
  const [location, setLocation] = useState<LocationType>({
    latitude: 0,
    longitude: 0,
  });

  async function fetchLocation() {
    try {
      const locationInfo = await getGeoLocation();
      setLocation(locationInfo);
      console.log("Location fetched:", locationInfo);
      console.log("location info object from utils", locationInfo);
    } catch (err) {
      console.error("Error fetching location:", err);
    }
  }

  useEffect(() => {
    fetchLocation();
  }, []);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocationContext = () => useContext(LocationContext);
