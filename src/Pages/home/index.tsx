import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Grid2,
} from "@mui/material";
import hotelImage from "../../Assets/hotel.jpeg";

interface Room {
  cityName: string;
  description: string;
  discount: number;
  finalPrice: number;
  hotelId: number;
  hotelName: string;
  hotelStarRating: number;
  originalRoomPrice: number;
  roomPhotoUrl: string;
  title: string;
}

// Types for API Data
interface Hotel {
  hotelId: number;
  hotelName: string;
  priceLowerBound: number;
  priceUpperBound: number;
  starRating: number;
  thumbnailUrl: string;
  visitDate: string;
}

interface Destination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}

// Search Bar Component
const SearchBar: React.FC = () => {
  const [checkIn, setCheckIn] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [checkOut, setCheckOut] = useState<string>(
    new Date(Date.now() + 86400000).toISOString().split("T")[0]
  );
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);

  return (
    <Box className="p-4 bg-white shadow-md rounded-lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Search for hotels, cities..."
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Box minWidth="200px">
            <TextField
              fullWidth
              label="Check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label="Adults"
            type="number"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label="Children"
            type="number"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField
            fullWidth
            label="Rooms"
            type="number"
            value={rooms}
            onChange={(e) => setRooms(Number(e.target.value))}
            variant="outlined"
          />
        </Grid>
      </Grid>
      <Button variant="contained" className="mt-4 w-full" color="primary">
        Search
      </Button>
    </Box>
  );
};

const FeaturedDeals: React.FC = () => {
  const [deals, setDeals] = useState<Room[]>([]);

  useEffect(() => {
    fetch(
      "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/featured-deals"
    )
      .then((response) => response.json())
      .then((data) => setDeals(data));
  }, []);

  return (
    <Box className="my-8">
      <Typography variant="h4" gutterBottom>
        Featured Deals
      </Typography>
      <Grid container spacing={4}>
        {deals.map((deal) => (
          <Grid item xs={12} sm={6} md={4} key={deal.hotelId}>
            <Card className="h-full">
              <img
                src={deal.roomPhotoUrl}
                alt={deal.title}
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <CardContent>
                <Typography variant="h6">{deal.title}</Typography>
                <Typography color="textSecondary">{deal.cityName}</Typography>
                <Typography variant="body2" color="textPrimary">
                  <s>${deal.originalRoomPrice}</s> ${deal.finalPrice}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ⭐ {deal.hotelStarRating}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {deal.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const RecentlyVisitedHotels: React.FC<{ userId?: string }> = ({ userId }) => {
  const [recentHotels, setRecentHotels] = useState<Hotel[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/users/${userId}/recent-hotels`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      const data = await response.json();
      setRecentHotels(data);
    } catch (error) {
      console.error("Error fetching recent hotels:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="my-8">
      <Typography variant="h4" gutterBottom>
        Recently Visited Hotels
      </Typography>
      <Grid container spacing={4}>
        {recentHotels.map((hotel) => (
          <Grid item xs={12} sm={6} md={4} key={hotel.hotelId}>
            <Card className="h-full">
              <img
                src={hotel.thumbnailUrl}
                alt={hotel.hotelName}
                className="object-cover w-full h-48 rounded-t-lg"
                onError={(e: any) => {
                  e.currentTarget.src = hotelImage;
                }}
              />
              <CardContent>
                <Typography variant="h6">{hotel.hotelName}</Typography>
                <Typography variant="body2" color="textPrimary">
                  ${hotel.priceLowerBound} - ${hotel.priceUpperBound}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ⭐ {hotel.starRating}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Last Visited: {new Date(hotel.visitDate).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const TrendingDestinations: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);

  useEffect(() => {
    fetch(
      "https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/home/destinations/trending"
    )
      .then((response) => response.json())
      .then((data) => setDestinations(data));
  }, []);

  return (
    <Box className="my-8">
      <Typography variant="h4" gutterBottom>
        Trending Destinations
      </Typography>
      <Grid container spacing={4}>
        {destinations.map((destination) => (
          <Grid item xs={12} sm={6} md={4} key={destination.cityId}>
            <Card className="h-full">
              <img
                src={destination.thumbnailUrl}
                alt={destination.cityName}
                className="object-cover w-full h-48 rounded-t-lg"
              />
              <CardContent>
                <Typography variant="h6">{destination.cityName}</Typography>
                <Typography color="textSecondary">
                  {destination.countryName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {destination.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

const HomePage: React.FC<{ userId?: string }> = ({ userId }) => {
  return (
    <Box className="max-w-7xl mx-auto px-4 py-8">
      <SearchBar />
      <FeaturedDeals />
      <RecentlyVisitedHotels userId={"0"} />
      <TrendingDestinations />
    </Box>
  );
};

export default HomePage;
