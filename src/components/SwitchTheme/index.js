import earth from "../../assets/transparent-earth.png";
import sleepEarth from "../../assets/night-earth.png";
const SwitchTheme = ({ theme, setTheme }) => {
  const html = document.documentElement;
  return (
    <div
      className="flex items-center font-semibold cursor-pointer"
      onClick={() => {
        if (theme.mode === "dark") {
          setTheme({ mode: "light" });
          html.classList.remove("dark");
        } else {
          setTheme({ mode: "dark" });
          html.classList.add("dark");
        }
        localStorage.setItem("theme", JSON.stringify(theme));
      }}
    >
      <span className="pr-2">
        <img
          className="w-7 h-auto"
          src={theme.mode === "light" ? sleepEarth : earth}
        />
      </span>
      {theme.mode === "dark" ? "Light mode" : "Dark mode"}
    </div>
  );
};

export default SwitchTheme;
