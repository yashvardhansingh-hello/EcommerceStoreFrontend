import React from "react";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Rating = ({ value = 0, count = 0, size = 16, className = "" }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (value >= i) {
      stars.push(
        <BsStarFill key={i} size={size} className="text-yellow-400" />
      );
    } else if (value >= i - 0.5) {
      stars.push(
        <BsStarHalf key={i} size={size} className="text-yellow-400" />
      );
    } else {
      stars.push(<BsStar key={i} size={size} className="text-gray-300" />);
    }
  }

  return (
    <div className={`flex items-center space-x-1 justify-start  ${className}`}>
      <div className="flex items-center">{stars}</div>
      {count > 0 && (
        <span className="text-sm text-gray-500 ml-1">({count})</span>
      )}
    </div>
  );
};

export default Rating;
