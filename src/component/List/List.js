import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./styles";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
const List = ({ places, rating, setRating, type, setType, loading }) => {
  const classes = useStyles();

  return (
    <>
      {places && (
        <div className={classes.container}>
          <Typography variant="h4">
            Restaurants, Hotels & Attractions around you
          </Typography>
          {loading ? (
            <div className={classes.loading}>
              <CircularProgress size="5rem" />
            </div>
          ) : (
            <>
              <FormControl className={classes.formControl}>
                <InputLabel>Type</InputLabel>
                <Select value={type} onChange={(e) => setType(e.target.value)}>
                  <MenuItem value="restaurants">Restaurants</MenuItem>
                  <MenuItem value="hotels">hotels</MenuItem>
                  <MenuItem value="attractions">attractions</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel>Rating</InputLabel>
                <Select
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  <MenuItem value={0}>All</MenuItem>
                  <MenuItem value={3}>Above 3.0</MenuItem>
                  <MenuItem value={4}>Above 4.0</MenuItem>
                  <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
              </FormControl>

              <Grid container spacing={3} className={classes.list}>
                {places?.map((place, i) => {
                  return (
                    <Grid key={`1${i}`} item xs={12}>
                      <PlaceDetails place={place} />
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default List;
