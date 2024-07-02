import React from "react";
import { Link } from "react-router-dom";

const MyHotels = () => {
  return (
    <div className="space-y-5">
      <span>
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-700"
        >
          Add hotel
        </Link>
      </span>
    </div>
  );
};

export default MyHotels;
