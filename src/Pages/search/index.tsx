import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

interface Hotel {
  id: string;
  hotelName: string;
  location: string;
  roomPrice: number;
  starRating: number;
  description: string;
  roomPhotoUrl: string;
}

interface Amenity {
  name: string;
  description: string;
}

const SearchPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city, checkIn, checkOut, adults, children, rooms } = location.state || {};
  const [results, setResults] = useState<Hotel[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [starRating, setStarRating] = useState<number | "">(0);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [availableAmenities, setAvailableAmenities] = useState<Amenity[]>([]);
  const [cart, setCart] = useState<Hotel[]>([]);

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const response = await fetch("https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/search-results/amenities");
        const data = await response.json();
        setAvailableAmenities(data);
      } catch (error) {
        console.error("Error fetching amenities:", error);
      }
    };

    fetchAmenities();
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/search?city=${city}&${checkIn ? `checkInDate=${checkIn}` : ""}&${checkOut ? `checkOutDate=${checkOut}` : ""}&adults=${adults}&children=${children}&rooms=${rooms}&priceMin=${minPrice}&priceMax=${maxPrice}&starRate=${starRating}&amenities=${amenities.join(",")}`);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error fetching search results:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchResults();
  }, [checkIn, checkOut, adults, children, rooms, minPrice, maxPrice, starRating, amenities]);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    if (type === "starRating") {
      setStarRating(Number(event.target.value));
    } else if (type === "amenities") {
      const value = Array.from(event.target.selectedOptions, option => option.value);
      setAmenities(value);
    }
  };

  const addToCart = (hotel: Hotel) => {
    setCart((prevCart) => [...prevCart, hotel]);
  };

  const goToCheckout = () => {
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Cart Button */}
      <div className="absolute top-4 right-4">
        <button onClick={goToCheckout} className="bg-blue-500 text-white px-4 py-2 rounded-full">
          Cart ({cart.length})
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Search Results for "{city}"</h1>
      <p className="mb-4">
        Check-in: {checkIn} - Check-out: {checkOut} | Adults: {adults} | Children: {children} | Rooms: {rooms}
      </p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="flex-none w-full lg:w-1/4">
          <h2 className="text-xl font-semibold mb-2">Filters</h2>
          <div className="mb-4">
            <label className="block mb-1">Star Rating</label>
            <select className="border rounded p-2 w-full" value={starRating} onChange={(e) => handleFilterChange(e, "starRating")}>
              <option value={0}>All</option>
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Min Price</label>
            <input
              type="number"
              className="border rounded p-2 w-full"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Max Price</label>
            <input
              type="number"
              className="border rounded p-2 w-full"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <select multiple className="border rounded p-2 w-full" onChange={(e) => handleFilterChange(e as React.ChangeEvent<HTMLSelectElement>, "amenities")}>
              {availableAmenities.map((amenity) => (
                <option key={amenity.name} value={amenity.name}>
                  {amenity.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hotel Listings */}
        <div className="flex-grow w-full lg:w-3/4">
          <h2 className="text-xl font-semibold mb-2">Hotels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((hotel) => (
              <div key={hotel.id} className="border rounded p-4">
                <img src={hotel.roomPhotoUrl} alt={hotel.hotelName} className="w-full h-32 object-cover rounded mb-2" />
                <h3 className="text-lg font-bold">
                  <Link to={`/hotel/${hotel.id}`} className="text-blue-500 hover:underline">
                    {hotel.hotelName}
                  </Link>
                </h3>
                <p className="text-sm">{hotel.description}</p>
                <p className="text-md font-semibold">Price: ${hotel.roomPrice} per night</p>
                <p className="text-sm">Rating: {hotel.starRating} Stars</p>
                <button
                  onClick={() => addToCart(hotel)}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
