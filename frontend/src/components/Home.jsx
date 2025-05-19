import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-5xl font-bold mb-4">Welcome to TaskTracker</h1>
      <p className="text-lg text-gray-600 mb-8">
        Keep track of your projects and tasks effortlessly.
      </p>
      <div className="space-x-4">
        <Link to="/login" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Login
        </Link>
        <Link to="/signup" className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50">
          Sign Up
        </Link>
      </div>
    </div>
  );
}