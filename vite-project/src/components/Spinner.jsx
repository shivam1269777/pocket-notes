
import React from "react";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center mt-10">
      <div className="w-12 h-12 border-4 border-teal-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
