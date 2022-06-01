import earth from "../../assets/transparent-earth.png";

const Loading = () => {
  return (
    <div className="w-full flex items-center justify-center min-h-[20vh]">
      <img className="animate-bounce w-6 h-auto mr-2" src={earth} />
      <span className="text-16">Loading...</span>
    </div>
  );
};
export default Loading;
