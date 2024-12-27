import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Hotel {
  hotelName: string;
  roomPrice: number;
}

const CheckoutPage: React.FC = () => {
  const { cart } = useLocation().state || {};
  const [paymentDetails, setPaymentDetails] = useState("");
  const navigate = useNavigate(); // تم استبدال useHistory بـ useNavigate

  const handlePayment = () => {
    navigate('/confirm', { state: { cart, paymentDetails } });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
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
      <div className="mt-4">
        <label className="block mb-1">Payment Details</label>
        <input
          type="text"
          className="border rounded p-2 w-full"
          value={paymentDetails}
          onChange={(e) => setPaymentDetails(e.target.value)}
        />
      </div>
      <button onClick={handlePayment} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Confirm Payment
      </button>
    </div>
  );
};

export default CheckoutPage;
