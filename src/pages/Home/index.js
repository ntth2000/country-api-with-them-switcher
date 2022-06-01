import { useEffect, useRef, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import useHttp from "../../hooks/useHttp";
import Card from "../../components/Card";
import Loading from "../../components/Loading";

const SEARCH_BY_MENU = [
  {
    id: "name",
    content: "Name",
  },
  {
    id: "lang",
    content: "Language",
  },
  {
    id: "currency",
    content: "Currency",
  },
  {
    id: "capital",
    content: "Capital",
  },
  {
    id: "subregion",
    content: "Subregion",
  },
  { id: "region", content: "Region" },
];

const REGIONS = [
  "Asia",
  "Americas",
  "Europe",
  "Oceania",
  "Africa",
  "Antarctic",
];
function Home() {
  const inputRef = useRef();

  const [searchBy, setSearchBy] = useState(SEARCH_BY_MENU[0]);
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [filterOption, setFilterOption] = useState("");
  const [renderArray, setRenderArray] = useState(data);

  useEffect(() => {
    if (!input) {
      const fetchData = async () => {
        setIsLoading(true);
        const res = await fetch("https://restcountries.com/v3.1/all");
        if (res.ok) {
          const result = await res.json();
          setData(result);
        } else {
          setError({
            status: res.status,
            msg: res.statusText,
          });
          return;
        }
        setIsLoading(false);
      };
      fetchData();
    }
  }, [input]);

  useEffect(() => {
    if (filterOption) {
      setRenderArray(data.filter((item) => item.region === filterOption));
    } else {
      setRenderArray(data);
    }
  }, [data, filterOption]);

  const handleFilterOption = (region) => {
    setFilterOption(region);
  };
  const handleSearchByOption = (category) => {
    if (category.id !== searchBy.id) {
      setSearchBy(category);
    }
  };
  const handleSearch = () => {
    if (input) {
      const fetchData = async () => {
        setIsLoading(true);
        const res = await fetch(
          `https://restcountries.com/v3.1/${searchBy.id || "all"}/${
            input || ""
          }`
        );
        if (res.ok) {
          const result = await res.json();
          setData(result);
        } else {
          setError({
            status: res.status,
            msg: res.statusText,
          });
          return;
        }
        setIsLoading(false);
      };
      fetchData();
    }
  };
  const clearInput = () => {
    setInput("");
    setSearchBy(SEARCH_BY_MENU[0]);
    inputRef.current.focus();
  };
  return (
    <div className="text-14 container">
      <div className="mt-8 gap-2 flex flex-col md:flex-row">
        <div
          className="flex items-center text-dark-gray dark:text-white w-full 
            rounded shadow-sm bg-white dark:bg-dark-blue pr-3 py-2 md:py-0 md:max-w-[300px] md:mb-0 lg:max-w-[35%]"
        >
          <button
            onClick={handleSearch}
            className="px-5 text-18 transition-all duration-200 hover:text-dark-blue cursor-pointer"
          >
            <i className="bi bi-search"></i>
          </button>
          <input
            ref={inputRef}
            value={input}
            onInput={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Search for a country..."
            className="flex-1 text-dark-gray outline-none bg-transparent dark:text-white"
          />
          {input && (
            <div
              onClick={clearInput}
              className="px-2 py-2 cursor-pointer hover:opacity-80"
            >
              <i className="bi bi-x-circle-fill"></i>
            </div>
          )}
        </div>
        <div
          className="relative flex justify-between items-center rounded bg-white dark:bg-dark-blue
          shadow-sm px-4 mb-6 py-3 group w-full md:max-w-[200px] z-[2] md:mb-0"
        >
          <span>{`Search By ${searchBy.content}`}</span>
          <span className="ml-6 ">
            <i className="bi bi-chevron-down"></i>
          </span>
          <div className="absolute hidden group-hover:block top-full left-0 right-0">
            <ul className="mt-1 py-2 w-full bg-white rounded dark:bg-dark-blue shadow-md">
              {SEARCH_BY_MENU.map((item) => (
                <li
                  key={item.id}
                  className={`select-option${
                    item.id === searchBy.id ? " active" : ""
                  }`}
                  onClick={() => handleSearchByOption(item)}
                >
                  {item.content}
                </li>
              ))}
            </ul>
          </div>
        </div>

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
                    handleFilterOption("");
                    setRenderArray(data);
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
                  onClick={() => handleFilterOption(item)}
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

        {!isLoading && !error && Array.isArray(data) && (
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
        )}
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
