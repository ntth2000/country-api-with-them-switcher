import React from "react";
import Error from "../../components/Error";
import Back from "../../components/BackBtn";
const NotFound = () => {
  return (
    <div className="container pt-12">
      <Back />
      <Error status={400} />
    </div>
  );
};

export default NotFound;
