export async function getGeoLocation() {
  try {
    const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    const { latitude, longitude } = position.coords;

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    const data = await response.json();

    return {
      latitude,
      longitude,
      city: data.city,
      country: data.principalSubdivision,
    };
  } catch (err) {
    console.error("Error fetching location:", err);
    throw err;
  }
}
