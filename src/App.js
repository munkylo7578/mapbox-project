import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData } from "./api/index";
import { Header, Map, List, PlaceDetails } from "./component";
const App = () => {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
        
        setCoordinates({lat:latitude,lng:longitude})
    })
  },[])
  useEffect(()=>{
    const timer = setTimeout(()=>{
      getPlacesData(bounds._sw,bounds._ne).then((data) => {
      
        setPlaces(data);
      });
    },500)
    return ()=>clearTimeout(timer)
  
  },[coordinates,bounds])
  
  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} bounds={bounds} places={places} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
