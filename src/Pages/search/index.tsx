import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const location = useLocation();
  
  const { searchQuery, checkIn, checkOut, adults, children, rooms } = location.state || {};

  useEffect(() => {
    console.log("Location State:", location.state);
  }, [location.state]);

  if (!location.state) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      <p>Check-in: {checkIn}</p>
      <p>Check-out: {checkOut}</p>
      <p>Adults: {adults}</p>
      <p>Children: {children}</p>
      <p>Rooms: {rooms}</p>
    </div>
  );
};

export default SearchPage;
