import { useCallback, useState } from "react";

const useHttp = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestConfig, applyDataFunc) => {
    setIsFetching(true);
    setError(null);
    const res = fetch(requestConfig.url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error({ msg: "Something went wrong" });
        }
      })
      .then((data) => {
        setIsFetching(false);
        applyDataFunc(data);
      })
      .catch((error) => {
        setIsFetching(false);
        setError(error.message || "Something went wrong!");
      });
  }, []);
  return { isFetching, error, sendRequest };
};
export default useHttp;
