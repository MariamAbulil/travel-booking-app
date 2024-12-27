const API_URL = 'https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/';

export const searchHotels = async (searchParams: Record<string, string | number>) => {
  try {
    const queryParams = new URLSearchParams(searchParams as Record<string, string>).toString();
    const response = await fetch(`${API_URL}search?${queryParams}`);
    if (!response.ok) {
      throw new Error('Failed to fetch hotels');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel search results:', error);
    throw error;
  }
};

export const getHotelDetails = async (hotelId: string | number) => {
  try {
    const response = await fetch(`${API_URL}hotels/${hotelId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch hotel details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel details:', error);
    throw error;
  }
};
