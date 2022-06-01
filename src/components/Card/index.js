import React from "react";
import { Link } from "react-router-dom";
const Card = ({ country }) => {
  return (
    <Link
      to={`detail/${country.cca3}`}
      className="bg-white dark:bg-dark-blue rounded-md shadow-md overflow-hidden block cursor-pointer hover:shadow-hover dark:hover:shadow-light-hover"
    >
      <img
        src={country.flags.svg || country.flags.png}
        alt={country.name.common}
        className="w-full aspect-[3/2] object-cover shadow-sm"
      />
      <div className="py-4 px-5">
        <header className="min-w-0">
          <h3 className="font-extrabold text-16 mb-3 truncate">
            {country.name.official}
          </h3>
        </header>
        <ul className="pb-2">
          <li className="py-[2px] flex items-center">
            <h4 className="detail-title">Population:</h4>
            <span className="card-content">
              {country.population.toLocaleString()}
            </span>
          </li>
          <li className="py-[2px] flex items-center">
            <h4 className="detail-title">Region:</h4>
            <span className="card-content">{country.region}</span>
          </li>
          <li className="py-[2px] flex items-center">
            <h4 className="detail-title">Capital:</h4>
            <span className="card-content">{country.capital || ""}</span>
          </li>
        </ul>
      </div>
    </Link>
  );
};

export default Card;
