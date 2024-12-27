import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ConfirmationPage: React.FC = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await fetch(`https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/booking/${bookingId}`);
        const data = await response.json();
        setBookingDetails(data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {bookingDetails ? (
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Booking Confirmation</h1>
          <p className="mt-4">Booking ID: {bookingDetails.bookingId}</p>
          <p className="mt-4">Hotel: {bookingDetails.hotelName}</p>
          <p className="mt-2">Check-in: {bookingDetails.checkInDate}</p>
          <p className="mt-2">Check-out: {bookingDetails.checkOutDate}</p>
          <p className="mt-2">Price: ${bookingDetails.totalPrice}</p>
          <p className="mt-4">Thank you for your booking!</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ConfirmationPage;
