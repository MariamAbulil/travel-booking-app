
const BASE_URL = "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net";


export const getAdminNavigation = async () => {
  const response = await fetch(`${BASE_URL}/admin/navigation`);
  if (!response.ok) throw new Error("Failed to fetch navigation data");
  return await response.json();
};

export const searchAdminData = async (query: string) => {
  const response = await fetch(`${BASE_URL}/search?query=${query}`);
  if (!response.ok) throw new Error("Failed to fetch search results");
  return await response.json();
};

export const getCities = async (cityName?: string, country?: string) => {
  const url = new URL(`${BASE_URL}/cities`);
  if (cityName) url.searchParams.append("cityName", cityName);
  
  if (country) url.searchParams.append("country", country);

  const response = await fetch(url.toString());
  if (!response.ok) throw new Error("Failed to fetch cities");
  return await response.json();
};

export const addCity = async (cityData: { name: string; country: string }) => {
  const response = await fetch(`${BASE_URL}/cities`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cityData),
  });
  if (!response.ok) throw new Error("Failed to add city");
  return await response.json();
};
