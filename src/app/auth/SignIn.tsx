"use client"


// pages/auth/signin.tsx

import { signIn } from "next-auth/react";
import React, { useState } from "react";

export default function SignIn() {
  const [username, setUsername] = useState("");

  const handleSignIn = async () => {
    if (username.trim() !== "") {
      await signIn("credentials", {
        username,
        redirect: false, // Prevent automatic redirect after sign-in
      });
    } else {
      // Show an error message or prevent sign-in if the username is empty
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-2 border border-gray-300 rounded mb-4"
      />
      <button onClick={handleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Sign In
      </button>
    </div>
  );
}
