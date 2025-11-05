import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wrench, User, Lock } from "lucide-react";
import useAuthStore from "../store/authStore";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(username, password)) {
      navigate("/", { state: { showSuccessModal: true } });
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-50 to-indigo-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements removed */}

      <div className="max-w-md w-full space-y-8 relative">
        {/* Main card */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-gray-100 transform transition-all duration-300 hover:shadow-indigo-100">
          {/* Header section */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <div className="h-16 w-16 bg-indigo-600 rounded-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-indigo-300">
                  <Wrench className="h-8 w-8 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-1 tracking-tight">
              MaintenancePro
            </h2>
            <p className="text-gray-600 font-medium">
              Maintenance Management System
            </p>
          </div>

          {/* Form section */}
          <div className="mt-4 space-y-2">
            {/* Username field */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User
                    className={`h-5 w-5 transition-all duration-200 ${
                      focusedField === "username"
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock
                    className={`h-5 w-5 transition-all duration-200 ${
                      focusedField === "password"
                        ? "text-indigo-600"
                        : "text-gray-400"
                    }`}
                  />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  className="block w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Submit button */}
            <div className="">
              <button
                onClick={handleSubmit}
                className="w-full flex justify-center py-3 px-4 border border-transparent text-base font-semibold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Sign in
              </button>
            </div>

            {/* Demo credentials */}
            <div className="mt-2 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-sm font-bold text-gray-800 mb-2 text-center">
                Demo Credentials
              </p>
              <div className="space-y-1 text-sm">
                <div
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 shadow-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setUsername("admin");
                    setPassword("admin123");
                  }}
                >
                  <span className="font-semibold text-gray-700">Admin:</span>
                  <span className="text-gray-600">admin / admin123</span>
                </div>
                <div
                  className="flex items-center justify-between bg-white rounded-lg px-4 py-2.5 shadow-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => {
                    setUsername("user");
                    setPassword("user123");
                  }}
                >
                  <span className="font-semibold text-gray-700">User:</span>
                  <span className="text-gray-600">user / user123</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-1">
              <p className="text-sm text-gray-500">
                Powered by{" "}
                <span className="font-bold text-gray-700">Botivate</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
