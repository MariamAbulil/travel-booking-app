const BASE_URL =
  "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api";
export interface City {
  id?: number;
  name: string;
  description: string;
}

export interface Hotel {
  id?: number;
  name: string;
  description: string;
  hotelType: number;
  latitude: number;
  longitude: number;
  starRating: number;
}

export const getCities = async (pageNumber = 0, pageSize = 10) => {
  const response = await fetch(
    `${BASE_URL}/cities?pageSize=${pageSize}&pageNumber=${pageNumber + 1}`
  );
  const data: City[] = await response.json();

  if (!response.ok) throw new Error("Failed to fetch cities");
  return data;
};

export const removeCity = async (cityId: number) => {
  const response = await fetch(`${BASE_URL}/cities/${cityId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch cities");
  return true;
};

export const addCity = async (cityData: City) => {
  const response = await fetch(
    `${BASE_URL}/cities`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(cityData),
    }
  );
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to add city");
  return result;
};

export const getHotels = async (pageNumber = 0, pageSize = 10) => {
  const response = await fetch(
    `${BASE_URL}/hotels?pageSize=${pageSize}&pageNumber=${pageNumber + 1}`
  );
  const data: Hotel[] = await response.json();

  if (!response.ok) throw new Error("Failed to fetch hotels");
  return data;
};

export const removeHotel = async (hotelId: number) => {
  const response = await fetch(`${BASE_URL}/hotels/${hotelId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch hotels");
  return true;
};

export const addHotel = async (hotelData: Hotel) => {
  const response = await fetch(
    `${BASE_URL}/hotels`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(hotelData),
    }
  );
  const result = await response.json();
  if (!response.ok) throw new Error("Failed to add city");
  return result;
};
