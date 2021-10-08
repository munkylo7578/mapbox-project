import React, { useState, useEffect, useRef } from "react";
import ReactMapGL, { FullscreenControl, Marker } from "react-map-gl";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import useStyles from "./styles";

import { Restaurant } from "@material-ui/icons";
import { LocationOn } from "@material-ui/icons";
import { Typography, Paper, useMediaQuery } from "@material-ui/core";
import {Rating} from "@material-ui/lab";
const Map = ({ coordinates, setBounds, bounds, setCoordinates, places }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const mapRef = useRef(null);

  // Map config
  const fullscreenControlStyle = {
    right: 10,
    top: 10,
  };
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 470,
    latitude: 10.762622,
    longitude: 106.660172,
    zoom: 13,
  });

  // End map config

  const handleChangePosition = () => {
    const newBound = mapRef.current && mapRef.current.getMap().getBounds();
    setViewport((rest) => {
      return {
        ...rest,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      };
    });
    setBounds({ ...newBound });
  };

  useEffect(() => {
    handleChangePosition();
  }, [coordinates]);
  const handleViewportChange = (e) => {
    setViewport(e);
    setCoordinates({ lng: e.longitude, lat: e.latitude });
  };
  return (
    <div className={classes.mapContainer}>
      {viewport.latitude && (
        <ReactMapGL
        
          ref={mapRef}
          mapStyle={"mapbox://styles/mapbox/streets-v11"}
          mapboxApiAccessToken={process.env.REACT_APP_MAP_API_KEY}
          {...viewport}
          onViewportChange={(nextViewport) =>
            handleViewportChange(nextViewport)
          }
        >
          <FullscreenControl style={fullscreenControlStyle} />
          {places?.map((place, i) => {
            return (
              <Marker   
                className={classes.markerContainer}
                latitude={+place.latitude || 0}
                longitude={+place.longitude || 0}
                key={i}
              
              >
                {!isDesktop ? (
                  <LocationOn color="primary" fontSize="large" />
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
        </ReactMapGL>
      )}
    </div>
  );
};

export default Map;
