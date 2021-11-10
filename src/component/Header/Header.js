import React, { useState, useEffect,memo,useMemo } from "react";
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
          
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default memo(Header);
