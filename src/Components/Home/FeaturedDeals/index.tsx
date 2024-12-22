
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from "@mui/material";

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
  export default FeaturedDeals;