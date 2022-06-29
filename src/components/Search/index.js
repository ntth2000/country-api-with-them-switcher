import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
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
];
const Search = ({ querySearchBy, searchText }) => {
  let searchByIndex = 0;

  SEARCH_BY_MENU.forEach((option, index) => {
    if (option.id === querySearchBy) {
      searchByIndex = index;
    }
  });

  const navigate = useNavigate();
  const [searchBy, setSearchBy] = useState(SEARCH_BY_MENU[searchByIndex]);
  const [input, setInput] = useState(searchText || "");
  const inputRef = useRef();

  const debouncedValue = useDebounce(input, 500);

  useEffect(() => {
    if (!!debouncedValue) {
      navigate(`/?q=${debouncedValue}&option=${searchBy.id}`);
    }
  }, [debouncedValue, searchBy]);

  const handleSearchByOption = (category) => {
    if (category.id !== searchBy.id) {
      setSearchBy(category);
    }
  };

  const clearInput = () => {
    setInput("");
    inputRef.current.focus();
    navigate("/");
  };
  return (
    <>
      <div
        className="flex items-center text-dark-gray dark:text-white w-full 
            rounded shadow-sm bg-white dark:bg-dark-blue pr-3 py-2 md:py-0 md:max-w-[300px] md:mb-0 lg:max-w-[35%]"
      >
        <div className="px-5 text-18 transition-all duration-200 ">
          <i className="bi bi-search"></i>
        </div>
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
    </>
  );
};

export default Search;
