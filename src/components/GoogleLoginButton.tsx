"use client";

import React, { useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import Spinner from "./Spinner";

export default function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    setError(null); // Clear previous error
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-10 mx-auto p-4">
      <p className="mb-4 text-center font-semibold md:text-lg text-red-900">
        Please sign in to fill the form for Blood Heroes Society
      </p>
      <button
        onClick={handleLogin}
        disabled={loading}
        className="flex items-center justify-center gap-2 mt-5 px-4 py-2 bg-white hover:bg-red-900 hover:text-white border-red-800 border-2 text-red-800 cursor-pointer rounded shadow font-semibold transition-all text-sm md:text-base"
      >
        <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_17_40)">
            <path d="M47.532 24.552c0-1.636-.146-3.2-.418-4.704H24.48v9.02h13.02c-.56 3.02-2.24 5.58-4.76 7.3v6.06h7.7c4.5-4.14 7.09-10.24 7.09-17.68z" fill="#4285F4"/>
            <path d="M24.48 48c6.48 0 11.92-2.14 15.89-5.82l-7.7-6.06c-2.14 1.44-4.88 2.3-8.19 2.3-6.3 0-11.64-4.26-13.56-9.98H2.67v6.24C6.62 43.98 14.8 48 24.48 48z" fill="#34A853"/>
            <path d="M10.92 28.44c-.5-1.44-.78-2.98-.78-4.44s.28-3 .78-4.44v-6.24H2.67A23.97 23.97 0 0 0 0 24c0 3.98.96 7.76 2.67 11.24l8.25-6.8z" fill="#FBBC05"/>
            <path d="M24.48 9.5c3.54 0 6.68 1.22 9.17 3.62l6.87-6.87C36.4 2.14 30.96 0 24.48 0 14.8 0 6.62 4.02 2.67 10.76l8.25 6.24c1.92-5.72 7.26-9.98 13.56-9.98z" fill="#EA4335"/>
          </g>
          <defs>
            <clipPath id="clip0_17_40">
              <rect width="48" height="48" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        {loading ? <Spinner /> : "Sign in with Google"}
      </button>
      {error && (
        <div className="mt-6 w-full max-w-xs bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-center text-sm font-medium shadow">
          {error}
        </div>
      )}
    </div>
  );
}
