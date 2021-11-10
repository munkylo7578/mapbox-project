import React, { useState, useEffect, useRef, useCallback,memo } from "react";
import ReactMapGL, { GeolocateControl,FullscreenControl, Marker } from "react-map-gl";
// eslint-disable-line import/no-webpack-loader-syntax
import useStyles from "./styles";


import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Typography, Paper, useMediaQuery } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";


import MapGL from "react-map-gl";
import Geocoder from "react-map-gl-geocoder";

// Please be a decent human and don't abuse my Mapbox API token.
// If you fork this sandbox, replace my API token with your own.
// Ways to set Mapbox token: https://uber.github.io/react-map-gl/#/Documentation/getting-started/about-mapbox-tokens

const Map = ({places,setBounds}) => {
  const classes = useStyles()
const isDesktop = useMediaQuery("(min-width:600px)");
const fullscreenControlStyle= {
  right: 10,
  top: 10
};
  const [viewport, setViewport] = useState({
    latitude: 20.959902,
    longitude: 107.042542,
    zoom: 15
  });
  const geocoderContainerRef = useRef();
  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );
    useEffect(()=>{
      const newBound = mapRef.current && mapRef.current.getMap().getBounds();
    setBounds({ ...newBound });
    },[viewport.latitude])
  // if you are happy with Geocoder default settings, you can just use handleViewportChange directly
  const handleGeocoderViewportChange = useCallback(
    (newViewport) => {
      const geocoderDefaultOverrides = { transitionDuration: 1000 };

      return handleViewportChange({
        ...newViewport,
        ...geocoderDefaultOverrides
      });
    },
    [handleViewportChange]
  );

  return (
    <div style={{ height: "105vh" }}>
      <div
        ref={geocoderContainerRef}
        style={{ position: "absolute", top: 20, left: 20, zIndex: 1 }}
      />
     
      <MapGL
      mapStyle={"mapbox://styles/mapbox/streets-v11"}
        ref={mapRef}
        {...viewport}
        width="100%"
        height="100%"
    
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
      >
          <FullscreenControl style={fullscreenControlStyle} />
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API_KEY}
          position="top-left"
        />
        
        {places?.map((place, i) => {
          return (
            <Marker
              className={classes.markerContainer}
              latitude={+place.latitude || 0}
              longitude={+place.longitude || 0}
              key={i}
            >
              {!isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography
                    className={classes.typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {place.name}
                  </Typography>
                  <img
                    className={classes.pointer}
                    src={
                      place.photo
                        ? place.photo.images.large.url
                        : "https://image.flaticon.com/icons/png/512/34/34754.png"
                    }
                    alt={place.name}
                  />
                  <Rating size="small" value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </Marker>
          );
        })}
      </MapGL>
    </div>
  );
};

export default Map;
