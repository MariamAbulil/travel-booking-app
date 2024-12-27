import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAuth } from "../../Services/LoginServices";
import { FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import backgroundImage from '../../Assets/background.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error, userType } = await loginAuth(username, password);
    if (error) {
      setError(error);
    } else {
      navigate(userType === "user" ? "/home" : "/admin");//userType in localStorage 
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-no-repeat"style={{ backgroundImage: `url(${backgroundImage})` }}>
      <form onSubmit={handleSubmit} className="w-[420px] bg-white bg-opacity-35 backdrop-blur-sm text-white shadow-md p-8 border-2 border-white/20 rounded-2xl">
        <div className="relative w-full h-12 mb-8">
          <input
            required
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full h-full border-2 border-white/20 rounded-xl bg-white text-orange-300 placeholder-orange-300 text-base p-2 pl-10 focus:outline-none"
          />
          <FaUserAlt className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300 text-xl" />
        </div>
        <div className="relative w-full h-12 mb-8">
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-full border-2 border-white/20 rounded-xl bg-white text-orange-300 placeholder-orange-300 text-base p-2 pl-10 focus:outline-none"
          />
          <RiLockPasswordFill  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-orange-300 text-xl" />
        </div>
        <button type="submit" className="w-full h-12 bg-orange-300 text-white font-bold rounded-xl shadow-lg hover:bg-gray-100">
          Login
        </button>
        {error && <p className="mt-4 text-center text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
