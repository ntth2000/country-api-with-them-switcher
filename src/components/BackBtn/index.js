import React from "react";
import { useNavigate } from "react-router-dom";
const Back = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <button className="button" onClick={handleBack}>
      <span className="mr-2 text-16">
        <i class="bi bi-arrow-left"></i>
      </span>
      Back
    </button>
  );
};

export default Back;
