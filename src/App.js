import React, { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { CssBaseline, Grid } from "@material-ui/core";
import { getPlacesData,getWeatherData } from "./api/index";
import { Header, Map, List, PlaceDetails } from "./component";
const App = () => {
  
 
  const [places, setPlaces] = useState([]);
  const [filteredPlaces,setFilteredPlaces] = useState([])
  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState(0);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [loading,setLoading] = useState(false)
 
  useEffect(()=>{
    const filterPlaces = places?.filter((place)=>place.rating >= rating)
    setFilteredPlaces(filterPlaces)
  },[rating])

  useEffect(()=>{
    setLoading(true)
    const timer = setTimeout(()=>{
    
      getPlacesData(type,bounds._sw,bounds._ne).then((data) => {
        
        setPlaces(data);
        setFilteredPlaces([])
        setLoading(false)
      });
    },500)
    return ()=>{clearTimeout(timer)}
  
  },[type,coordinates,bounds])
  
  return (
    <>
      <CssBaseline />
      <Header   />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List loading={loading} type={type} setType={setType} rating={rating} setRating={setRating} places={filteredPlaces.length ? filteredPlaces : places}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Map   setBounds={setBounds}  places={filteredPlaces.length ? filteredPlaces : places} />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
