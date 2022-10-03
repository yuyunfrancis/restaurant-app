import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
  useContext,
} from "react";

const useDataFetching = (url) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);

    try {
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          //   Authorization: "Bearer " + user.token,
        },
      });
      const result = await data.json();

      if (result) {
        setData(result);
        // console.log('result', result);
        setLoading(false);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [url]);

  return [loading, error, data, fetchData];
};

export default useDataFetching;
