import React, { useEffect, useState } from "react";
import './style.css'
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

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
export default RecentlyVisitedHotels;