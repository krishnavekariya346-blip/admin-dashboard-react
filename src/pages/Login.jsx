import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../loginSignup/authSchema";
import { Auth } from "../loginSignup/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const login = Auth((state) => state.login);
  const isAuthenticated = Auth((state) => state.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const onSubmit = (data) => {
    try {
      login(data.email, data.password);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-95">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login to Dashboard
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} 
            noValidate
            className="space-y-5">
          
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full text-black py-3 rounded-lg font-semibold transition duration-200"
          >
            Login
          </button>
        </form>

        {/* SignUp Option */}
        <p className="text-center text-sm text-gray-600 mt-5">
          Don't have an account?
          <span
            className="text-blue-600 cursor-pointer ml-1"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;