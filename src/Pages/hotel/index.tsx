import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { default as ConfirmationPage } from "../confirmation"; 

interface Room {
  id: string;
  roomNumber: string;
  imageUrl: string;
  roomType: string;
  capacity: {
    adults: number;
    children: number;
  };
  amenities: string[];
  price: number;
  availability: boolean;
}

interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  starRating: number;
  amenities: string[];
  imageUrl: string;
  availableRooms: Room[];
}

const HotelPage: React.FC = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [gallery, setGallery] = useState<string[]>([]);

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await fetch(`https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/hotels/${hotelId}`);
        const data = await response.json();
        setHotel(data);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };

    const fetchGallery = async () => {
      try {
        const response = await fetch(`https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/hotels/${hotelId}/gallery`);
        const data = await response.json();
        setGallery(data);
      } catch (error) {
        console.error("Error fetching hotel gallery:", error);
      }
    };

    fetchHotelDetails();
    fetchGallery();
  }, [hotelId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {hotel && (
        <>
          <h1 className="text-2xl font-bold mb-4">{hotel.name}</h1>
          <p className="mb-4">Location: {hotel.location}</p>
          <p className="mb-4">Rating: {hotel.starRating} Stars</p>
          <p className="mb-4">{hotel.description}</p>
          <h2 className="text-xl font-semibold mb-2">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {gallery.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Hotel Image ${index + 1}`} className="w-full h-32 object-cover rounded" />
            ))}
          </div>
          <h2 className="text-xl font-semibold mb-2">Available Rooms</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotel.availableRooms.map((room) => (
              <div key={room.id} className="border rounded p-4">
                <img src={room.imageUrl} alt={room.roomType} className="w-full h-32 object-cover rounded mb-2" />
                <h3 className="text-lg font-bold">{room.roomType}</h3>
                <p>Price: ${room.price}</p>
                <p>Capacity: {room.capacity.adults} Adults, {room.capacity.children} Children</p>
                <button className="bg-blue-500 text-white rounded p-2 mt-2">Add to Cart</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HotelPage;