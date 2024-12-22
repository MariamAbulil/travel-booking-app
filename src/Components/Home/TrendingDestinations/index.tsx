
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box
} from "@mui/material";



interface Destination {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}
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
                  <Typography color="textSecondary">{destination.countryName}</Typography>
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
export default TrendingDestinations;