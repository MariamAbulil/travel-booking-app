import React from "react";
import { useNavigate } from "react-router-dom";
import FeaturedDeals from "../../Components/Home/FeaturedDeals/index";
import SearchBar from "../../Components/Home/SearchBar/index";
import TrendingDestinations from "../../Components/Home/TrendingDestinations/index";
import RecentlyVisitedHotels from "../../Components/Home/RecentlyVisitedHotels/index";
import { Box, Button } from "@mui/material";

const HomePage: React.FC<{ userId?: string }> = ({ userId }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Box className="max-w-7xl mx-auto px-4 py-8">
    
      <SearchBar />
     
      <FeaturedDeals />
     
      <RecentlyVisitedHotels userId={"0"} />

      <TrendingDestinations />
    
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
