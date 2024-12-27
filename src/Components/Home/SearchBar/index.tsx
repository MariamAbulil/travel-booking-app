import React, { useState } from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [checkIn, setCheckIn] = useState<string>();
  const [checkOut, setCheckOut] = useState<string>();
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [rooms, setRooms] = useState<number>(1);
  const [city, setCity] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate('/search', {
      state: {
        city,
        checkIn,
        checkOut,
        adults,
        children,
        rooms,
      }
    });
  };
  
  return (
    <Box className="p-4 bg-white shadow-md rounded-lg">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Search for cities..."
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
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
      <Button variant="contained" className="mt-4 w-full" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;
