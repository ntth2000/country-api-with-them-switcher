import { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Detail from "./pages/Detail";
import Home from "./pages/Home";
import SwitchTheme from "./components/SwitchTheme";
import NotFound from "./pages/NotFound";
import Map from "./components/Map";

function App() {
  const [theme, setTheme] = useState(
    JSON.parse(localStorage.getItem("theme")) || {
      mode: "light",
    }
  );
  const [showToTopBtn, setShowToTopBtn] = useState(false);

  const title = document.querySelector("title");
  title.innerText = "Country Flags";

  useEffect(() => {
    const handleScrolling = () => {
      var top = window.pageYOffset || document.documentElement.scrollTop;
      if (top > 600) {
        setShowToTopBtn(true);
      } else {
        setShowToTopBtn(false);
      }
    };
    window.addEventListener("scroll", handleScrolling);
  }, []);

  const handleToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="scroll-smooth text-dark-blue-text box-border bg-light-gray w-full overflow-x-hidden leading-normal dark:text-white dark:bg-dark-bg">
      <header className="h-24 z-[3] bg-white shadow-md fixed top-0 left-0 w-full dark:bg-dark-blue">
        <div className="flex justify-between items-center h-full container">
          <h1
            className="font-extrabold text-20 md:text-22 lg:text-24"
            onClick={() => {}}
          >
            <Link to="/">Where in the world</Link>
          </h1>
          <SwitchTheme theme={theme} setTheme={setTheme} />
        </div>
      </header>

      {showToTopBtn && (
        <div
          className="fixed shadow-md rounded-full flex justify-center items-center z-10 bottom-[5%] right-[5%] text-[36px] 
text-dark-blue bg-white hover:shadow-hover dark:text-white dark:bg-dark-blue dark:hover:shadow-light-hover 
md:text-[42px] lg:right-[20px] cursor-pointer"
          onClick={handleToTop}
        >
          <i className="bi bi-arrow-up-circle-fill flex"></i>
        </div>
      )}

      <div className="pt-24 pb-24 min-h-screen relative">
        <Routes>
          <Route end path="/" element={<Home />} />
          <Route end path="detail/:id" element={<Detail />} />
          <Route path="/map" element={<Map />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <div className="container pb-2 absolute h-[72px] flex items-center bottom-0 left-0 right-0">
          <div className="row -mx-2 w-full">
            <p className="basis-full px-2 mb-1 md:basis-1/2 text-center md:text-left">
              Challenge by{" "}
              <a
                className="underline underline-offset-1 font-semibold"
                href="https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca"
              >
                Frontend Mentor
              </a>
            </p>
            <p className="basis-full px-2 md:basis-1/2 text-center md:text-right">
              Built by{" "}
              <a
                className="underline underline-offset-1 font-semibold"
                href="https://github.com/ntth2000/country-api"
              >
                Huyen Nguyen
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
