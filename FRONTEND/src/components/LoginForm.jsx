import React, { use, useState } from "react";
import axios from "axios";
import { loginUSer } from "../api/user.api";
import { useDispatch, useSelector } from "react-redux";
import {login} from "../store/slice/authSlice.js" 
import { useNavigate } from "@tanstack/react-router";

const LoginForm = ({state}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault();
      setloading(true);
    setErrorMsg("");

    try {
      const data = await loginUSer(email,password);
      dispatch(login(data.user))
      navigate({to:"/dashboard"})
      setloading(false)
      
    } catch (err) {
      setloading(false)
      setErrorMsg(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-8 bg-white rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-1 text-gray-600">Email</label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-600">Password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Don't have an account? <span onClick={() => state(false)} className="text-blue-600 hover:underline cursor-pointer">Register</span>
      </p>
    </div>
  );
};

export default LoginForm;
