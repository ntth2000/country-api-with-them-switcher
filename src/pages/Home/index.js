import { useEffect, useState } from "react";

import Card from "../../components/Card";
import Loading from "../../components/Loading";
import { useLocation } from "react-router-dom";
import Search from "../../components/Search";
import Error from "../../components/Error";
const REGIONS = [
  "Asia",
  "Americas",
  "Europe",
  "Oceania",
  "Africa",
  "Antarctic",
];
function Home() {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const querySearchText = searchParams.get("q");
  const querySearchBy = searchParams.get("option");

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filterOption, setFilterOption] = useState("");
  const [renderArray, setRenderArray] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setIsLoading(true);

      const URL = querySearchText
        ? `https://restcountries.com/v3.1/${querySearchBy}/${querySearchText}`
        : `https://restcountries.com/v3.1/all`;
      const res = await fetch(URL);
      if (res.ok) {
        const result = await res.json();
        setData(result);
      } else {
        setError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, [querySearchText, querySearchBy]);

  useEffect(() => {
    if (filterOption) {
      setRenderArray(data.filter((item) => item.region === filterOption));
    } else {
      setRenderArray(data);
    }
  }, [data, filterOption]);

  const handleClickOption = ({ region, all }) => {
    setFilterOption(region);
    if (all) {
      setRenderArray(data);
    }
  };
  let renderedCountryList;
  if (renderArray.length > 0) {
    renderedCountryList = (
      <div className="row md:-mx-6">
        {renderArray.map((country, index) => (
          <div
            key={index}
            className="px-6 mb-12 basis-full min-w-0 md:basis-2/4 lg:basis-1/3 xl:basis-1/4"
          >
            <Card country={country} />
          </div>
        ))}
      </div>
    );
  } else {
    renderedCountryList = (
      <p className="font-semibold text-20 text-center">
        Not Found Any Countries
      </p>
    );
  }
  return (
    <div className="text-14 container">
      <div className="mt-8 gap-2 flex flex-col md:flex-row">
        <Search searchText={querySearchText} querySearchBy={querySearchBy} />
        <div
          className="relative flex justify-between items-center rounded bg-white dark:bg-dark-blue
          shadow-sm px-4 py-3 w-fit group min-w-[180px] md:ml-auto"
        >
          <span>{filterOption || "Filter by Region"}</span>
          <span className="ml-8 ">
            <i className="bi bi-chevron-down"></i>
          </span>
          <div className="absolute hidden group-hover:block shadow-sm top-full left-0 right-0 ">
            <ul className="mt-1 py-2 w-full bg-white rounded dark:bg-dark-blue">
              {filterOption && (
                <li
                  className="select-option"
                  onClick={() => {
                    handleClickOption({ region: "", all: true });
                  }}
                >
                  All
                </li>
              )}
              {REGIONS.map((item) => (
                <li
                  key={item}
                  className={`select-option${
                    item === filterOption ? " active" : ""
                  }`}
                  onClick={() =>
                    handleClickOption({ region: item, all: false })
                  }
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        {isLoading && <Loading />}

        {!isLoading && !error && renderedCountryList}
        {!isLoading && error && (
          <p className="font-semibold text-20 text-center">
            Not Found Any Countries
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
