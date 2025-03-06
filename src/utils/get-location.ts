interface LocationData {
  latitude: number
  longitude: number
  city: string
  country: string
}

export async function getGeoLocation(): Promise<LocationData> {
  try {
    // First try browser geolocation
    const position = await new Promise<GeolocationPosition | null>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        error => {
          if (error.code === error.PERMISSION_DENIED) {
            resolve(null) // Trigger IP fallback
          } else {
            reject(error)
          }
        },
        {
          timeout: 5000,
          maximumAge: 10 * 60 * 1000 // 10 minutes
        }
      )
    })

    let lat: number, lon: number
    
    if (position) {
      // Use browser geolocation data
      lat = position.coords.latitude
      lon = position.coords.longitude
    } else {
      // Fallback to IP geolocation
      const ipResponse = await fetch('https://ipapi.co/json/')
      if (!ipResponse.ok) throw new Error('IP geolocation failed')
      
      const ipData = await ipResponse.json()
      lat = parseFloat(ipData.latitude)
      lon = parseFloat(ipData.longitude)

      if (isNaN(lat) || isNaN(lon)) {
        throw new Error('Invalid IP geolocation coordinates')
      }

    }

    // Get location details from reverse geocode
    const reverseResponse = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
    )
    
    if (!reverseResponse.ok) throw new Error('Reverse geocode failed')
    
    const reverseData = await reverseResponse.json()

    return {
      latitude: lat,
      longitude: lon,
      city: reverseData.city || reverseData.locality,
      country: reverseData.principalSubdivision || reverseData.countryName
    }

  } catch (err) {
    console.error("Location error:", err)
    // Final fallback to London coordinates
    return {
      latitude: 51.5074,
      longitude: -0.1278,
      city: "London",
      country: "England"
    }
  }
}