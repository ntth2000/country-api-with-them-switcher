import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Back from "../../components/BackBtn";
import Error from "../../components/Error";
import ListItem from "../../components/ListItem";
import Loading from "../../components/Loading";
import Map from "../../components/Map";

const Detail = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [borders, setBorders] = useState({});
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      setIsLoading(true);
      let result = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
      if (result.ok) {
        const res = await result.json();
        setData(res[0]);
        if (!!res[0].borders) {
          res[0].borders?.forEach((border) => {
            console.log(border);
            const fetchCountryBorder = async () => {
              const result = await fetch(
                `https://restcountries.com/v3.1/alpha/${border}`
              );
              if (result.ok) {
                const res = await result.json();
                setBorders((prev) => {
                  return {
                    ...prev,
                    [border]: res[0].name?.common || res[0].name?.official,
                  };
                });
              } else {
                setError({ status: result.status, msg: result.statusText });
                return;
              }
            };
            fetchCountryBorder();
          });
        }
      } else {
        setError({ status: result.status, msg: result.statusText });
        return;
      }
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  return (
    <div className="container pt-12 pb-12 text-16">
      <Back />
      {isLoading ? (
        <Loading />
      ) : (
        data && (
          <>
            {showMap && (
              <Map
                position={data?.latlng}
                markerPosition={data?.capitalInfo?.latlng || null}
                hideMap={() => setShowMap(false)}
              />
            )}
            <div className="mt-16 row lg:flex-row lg:-mx-10 items-center">
              <div className="flex items-center basis-full mb-8 lg:basis-2/5 lg:mb-0 lg:px-10">
                <img
                  src={data.flags?.svg || data.flags?.png}
                  alt={data.name?.official}
                  className="w-full h-auto bg-white shadow-md"
                />
              </div>
              <div className="basis-full lg:basis-3/5 lg:px-10">
                <div className="row -mx-4">
                  <div className="basis-full px-4 mb-3 ">
                    <h3 className="font-extrabold text-24">
                      {data.name?.official}
                    </h3>
                  </div>
                  <div className="basis-full px-4 mb-3 ">
                    <button className="button" onClick={() => setShowMap(true)}>
                      See {data.name.common || data.name.official} on map
                    </button>
                  </div>
                  <ul className="py-2 basis-full lg:basis-1/2 px-4">
                    {data.name.nativeName && (
                      <li className="py-1">
                        <span className="detail-title">Native Name:</span>
                        {Object.keys(data.name?.nativeName).map(
                          (item, index) => {
                            return (
                              <ListItem
                                key={index}
                                index={index}
                                length={
                                  Object.keys(data.name?.nativeName).length
                                }
                              >
                                {data.name?.nativeName[item].official}
                              </ListItem>
                            );
                          }
                        )}
                      </li>
                    )}
                    <li className="py-1">
                      <span className="detail-title">Population:</span>
                      <span>{data.population?.toLocaleString() || 0}</span>
                    </li>
                    {data.region && (
                      <li className="py-1">
                        <span className="detail-title">Region:</span>
                        <span>{data.region}</span>
                      </li>
                    )}
                    {data.subregion && (
                      <li className="py-1">
                        <span className="detail-title">Subregion:</span>
                        <span>{data.subregion}</span>
                      </li>
                    )}
                    {data.capital && (
                      <li className="py-1">
                        <span className="detail-title">Capital:</span>
                        <span>{data.capital || ""}</span>
                      </li>
                    )}
                  </ul>
                  <ul className="py-2 basis-full lg:basis-1/2 px-4">
                    {!!data.tld && (
                      <li className="py-1">
                        <span className="detail-title">Top Level Domain:</span>
                        {data.tld.map((item, index) => (
                          <ListItem
                            key={index}
                            index={index}
                            length={data.tld.length}
                          >
                            {item}
                          </ListItem>
                        ))}
                      </li>
                    )}
                    {data.currencies && (
                      <li className="py-1">
                        <span className="detail-title">Currencies:</span>
                        {Object.keys(data.currencies).map((item, index) => {
                          return (
                            <ListItem
                              key={index}
                              index={index}
                              length={Object.keys(data.currencies).length}
                            >
                              {`${data.currencies[item].name} (${data.currencies[item].symbol})`}
                            </ListItem>
                          );
                        })}
                      </li>
                    )}
                    {data.languages && (
                      <li className="py-1">
                        <span className="detail-title">Languages:</span>
                        {Object.keys(data.languages).map((item, index) => {
                          return (
                            <ListItem
                              index={index}
                              key={index}
                              length={Object.keys(data.languages).length}
                            >
                              {data.languages[item]}
                            </ListItem>
                          );
                        })}
                      </li>
                    )}
                  </ul>
                  {data.borders && (
                    <div className="basis-full px-4">
                      <ul className="row -mx-2 items-center">
                        <h4 className="font-semibold text-18 mb-3 w-fit px-2 py-[2.5px]">
                          Border Countries:
                        </h4>
                        {borders &&
                          data.borders.map((item, index) => {
                            return (
                              <li key={index} className="px-2 mb-3">
                                <Link to={`/detail/${item}`} className="button">
                                  {borders[item]}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )
      )}
      {!isLoading && error && <Error msg={error.msg} status={error.status} />}
    </div>
  );
};

export default Detail;
