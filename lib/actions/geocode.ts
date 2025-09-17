interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

export async function getCountryFromCoordinates(
  lat: number,
  lng: number
): Promise<GeocodeResult> {
  const apiKey = process.env.GEO_API_KEY!;

  const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error("Error al conectarse con OpenCage API");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("No se encontraron resultados");
  }

  const result = data.results[0];

  return {
    country: result.components.country || "Unknown",
    formattedAddress: result.formatted || "Unknown address",
  };
}
