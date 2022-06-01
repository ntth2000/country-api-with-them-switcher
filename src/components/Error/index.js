import React from "react";
import badRequestImg from "../../assets/400 Error Bad Request-rafiki.svg";
const Error = ({ msg, status }) => {
  return (
    <div className="flex mt-5">
      {status === 400 && (
        <img
          src={badRequestImg}
          alt="400"
          className="w-[80%] mx-auto md:max-w-[500px]"
        />
      )}
    </div>
  );
};

export default Error;
