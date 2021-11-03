import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactMapGL, { GeolocateControl,FullscreenControl, Marker } from "react-map-gl";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import useStyles from "./styles";

import { Restaurant } from "@material-ui/icons";
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { Typography, Paper, useMediaQuery } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
const MAPBOX_TOKEN =`${process.env.REACT_APP_MAPBOX_API_KEY}`;
const Map = ({ coordinates, setBounds, bounds, setCoordinates, places,newLocation }) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");
  const mapRef = useRef(null);

  // Map config
  const fullscreenControlStyle = {
    right: 10,
    top: 10,
  };
  const [viewport, setViewport] = useState({
    
    latitude: coordinates.lat,
    longitude: coordinates.lng,
    zoom: 14,
  });

  // End map config

  useEffect(()=>{
    setViewport((oldViewport)=>{
      return (
        {...oldViewport,longitude:newLocation.lng,latitude:newLocation.lat}
      )
      
    })
    
  },[newLocation])
 
  const handleViewportChange = useCallback((newViewport)=>{
   
    setViewport(newViewport)
    const newBound = mapRef.current && mapRef.current.getMap().getBounds();
    setBounds({ ...newBound });
    setCoordinates({lng:viewport.longitude,lat:viewport.latitude})
  
   
  },[coordinates])
  return (
    <div>
      <ReactMapGL
        ref={mapRef}
        {...viewport}
        mapStyle={"mapbox://styles/mapbox/streets-v11"}
        width="800px"
        height="85vh"
        onViewportChange={handleViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
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
        
      </ReactMapGL>
    </div>
  );
};

export default Map;
