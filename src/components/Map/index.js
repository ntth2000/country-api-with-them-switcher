import { useEffect, useState, useRef } from "react";

import mapboxgl from "mapbox-gl";
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;
// mapboxgl.mapboxApiAccessToken =
//   "pk.eyJ1IjoiaHV5ZW5uZ3V5ZW4yMDAwIiwiYSI6ImNsM3VoMHN1MDA2MW8zZHFmdWhqemN4cGgifQ.sqWSPmYACdkU8mO3hhLDwA";
mapboxgl.accessToken =
  "pk.eyJ1IjoiaHV5ZW5uZ3V5ZW4yMDAwIiwiYSI6ImNsM3VoMHN1MDA2MW8zZHFmdWhqemN4cGgifQ.sqWSPmYACdkU8mO3hhLDwA";
const Map = ({ position, markerPosition = null, hideMap }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(position[1]);
  const [lat, setLat] = useState(position[0]);
  const [zoom, setZoom] = useState(4);
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    if (!!markerPosition) {
      new mapboxgl.Marker({
        scale: 0.5,
      })
        .setLngLat([markerPosition[1], markerPosition[0]])
        .addTo(map.current);
    }
  });
  //map
  return (
    <div className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-[4]">
      <div
        className="absolute left-0 top-0 right-0 bottom-0 bg-modal-bg"
        onClick={hideMap}
      ></div>
      <div
        ref={mapContainer}
        className="w-[90vw] h-[80vh] max-h-[600px] max-w-[800px]"
      />
    </div>
  );
};

export default Map;
