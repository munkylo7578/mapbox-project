import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Toolbar,
  AppBar,
  InputBase,
  Box,
  FormControl,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useStyles from "./styles";
const Header = ({ setNewLocation }) => {
  const classes = useStyles();
  const [address, setAddress] = useState("Los Angeles");
  const [newCoordinates,setNewCoordinates] = useState({})
  const handleSubmit = (e) => {
    e.preventDefault();
    setNewLocation({
      ...newCoordinates
    });
   
  };
  useEffect(() => {
    const handleGetAddress = async () => {
      try {
        const res = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoibXVua3lsbyIsImEiOiJja3VkZGg1ZHUxOTVqMnFxNmx2Y25iZWNvIn0.fB9Am-BD5IJ4gTNdmjZNkg`
        );

        // handle success
        setNewCoordinates({
         
          lng:res.data.features[0].center[0],
          lat:res.data.features[0].center[1]
        })
      } catch (error) {
        console.log(error);
      }
    };
    handleGetAddress();
  }, [address]);
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h5" className={classes.title}>
          Travel Advisor
        </Typography>
        <Box display="flex">
          <Typography variant="h6" className={classes.title}>
            Explore new places
          </Typography>
          <form onSubmit={handleSubmit}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>

              <InputBase
                placeholder="Search..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                classes={{ root: classes.inputRoot, input: classes.inputInput }}
              />
            </div>
          </form>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
