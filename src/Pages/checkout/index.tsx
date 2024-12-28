import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Hotel {
  hotelName: string;
  roomPrice: number;
}

const CheckoutPage: React.FC = () => {
  const { cart } = useLocation().state || {};
  const [paymentDetails, setPaymentDetails] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: ""
  });
  const [specialRequest, setSpecialRequest] = useState("");
  const navigate = useNavigate();

  // Validate Inputs
  const validateInputs = () => {
    if (!userInfo.name || !userInfo.email || !userInfo.phone || !paymentDetails) {
      alert("Please fill in all fields.");
      return false;
    }
    return true;
  };

  // Handle payment process
  const handlePayment = async () => {
    if (!validateInputs()) return;

    // Construct request data for booking
    const bookingData = {
      userInfo,
      paymentDetails,
      cart,
      specialRequest
    };

    try {
      // Make POST request to create booking
      const response = await fetch("https://app-hotel-reservation-webapi-uae-dev-001.azurewebsites.net/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Error processing payment.");
      }

      // Get booking confirmation details
      const bookingDetails = await response.json();
      console.log("Booking Details:", bookingDetails);

      // Navigate to confirmation page
      navigate("/confirmation", { state: { cart, paymentDetails, userInfo, bookingDetails } });
    } catch (error) {
      console.error("Payment error:", error);
      alert("An error occurred while processing your payment. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Cart */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Cart</h2>
        <ul>
          {cart?.map((hotel: Hotel, index: number) => (
            <li key={index} className="border-b py-2">
              {hotel.hotelName} - ${hotel.roomPrice} per night
            </li>
          ))}
        </ul>
      </div>

      {/* User Information */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">User Information</h2>
        <label className="block mb-1">Name</label>
        <input
          type="text"
          className="border rounded p-2 w-full"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
        <label className="block mb-1 mt-2">Email</label>
        <input
          type="email"
          className="border rounded p-2 w-full"
          value={userInfo.email}
          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
        />
        <label className="block mb-1 mt-2">Phone</label>
        <input
          type="tel"
          className="border rounded p-2 w-full"
          value={userInfo.phone}
          onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
        />
      </div>

      {/* Special Request */}
      <div className="mt-4">
        <label className="block mb-1">Special Requests/Remarks</label>
        <textarea
          className="border rounded p-2 w-full"
          rows={4}
          value={specialRequest}
          onChange={(e) => setSpecialRequest(e.target.value)}
        />
      </div>

      {/* Payment Details */}
      <div className="mt-4">
        <label className="block mb-1">Payment Details</label>
        <input
          type="text"
          className="border rounded p-2 w-full"
          value={paymentDetails}
          onChange={(e) => setPaymentDetails(e.target.value)}
        />
      </div>

      {/* Confirm Payment Button */}
      <button
        onClick={handlePayment}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Confirm Payment
      </button>
    </div>
  );
};

export default CheckoutPage;
