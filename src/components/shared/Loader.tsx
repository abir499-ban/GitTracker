"use client";

import React from "react";
import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-4">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-gray-700 text-lg font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;