import React, { useEffect, useState } from "react";
import FeaturedDeals from '../../Components/Home/FeaturedDeals/index'
import SearchBar from '../../Components/Home/SearchBar/index';
import TrendingDestinations from '../../Components/Home/TrendingDestinations/index'
import RecentlyVisitedHotels from '../../Components/Home/RecentlyVisitedHotels/index'
import {
  Box
 } from "@mui/material";




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
