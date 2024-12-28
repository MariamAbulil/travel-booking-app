import React from "react";
import { useLocation } from "react-router-dom";

interface Hotel {
  hotelName: string;
  roomPrice: number;
}

interface BookingDetails {
  confirmationNumber: string;
  hotelAddress: string;
  roomDetails: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
}

const ConfirmationPage: React.FC = () => {
  const { cart, paymentDetails, userInfo, bookingDetails } = useLocation().state || {};

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Booking Confirmation</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Confirmation Number: {bookingDetails?.confirmationNumber}</h2>
        <p><strong>Hotel Address:</strong> {bookingDetails?.hotelAddress}</p>
        <p><strong>Room Details:</strong> {bookingDetails?.roomDetails}</p>
        <p><strong>Dates:</strong> {bookingDetails?.startDate} to {bookingDetails?.endDate}</p>
        <p><strong>Total Price:</strong> ${bookingDetails?.totalPrice}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">User Information</h2>
        <p><strong>Name:</strong> {userInfo?.name}</p>
        <p><strong>Email:</strong> {userInfo?.email}</p>
        <p><strong>Phone:</strong> {userInfo?.phone}</p>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <p>{paymentDetails}</p>
      </div>

      <h2 className="text-xl font-semibold">Your Cart</h2>
      <ul>
        {cart?.map((hotel: Hotel, index: number) => (
          <li key={index} className="border-b py-2">
            {hotel.hotelName} - ${hotel.roomPrice} per night
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ConfirmationPage;
