import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import RestaurantCard from "../RestaurantCard";
import SearchBar from "../SearchBar";

//material-ui
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    width: "90%",
    margin: "0 auto",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  middleArea: {
    marginTop: "50px",
  },
}));

function AllRestaurants() {
  const classes = useStyles();
  const history = useHistory();

  const { allRestaurants, adminLogin } = useSelector((state) => state.admin);

  const [restaurantsState, setRestaurantsState] = useState(allRestaurants ? [] : null);
  const [filteredRestsState, setFilteredRestsState] = useState(allRestaurants ? [] : null);

  //check admin is login or not
  if (!adminLogin) {
    history.push("/admin/login");
  }

  useEffect(() => {
    setRestaurantsState(allRestaurants);
    setFilteredRestsState(allRestaurants);
  }, [allRestaurants]);

  const handleSearch = (value) => {
    let currentList = [];
    let newList = [];

    if (value !== "") {
      currentList = restaurantsState;
      newList = currentList.filter((rest) => {
        const lc = rest.restaurantname.toLowerCase();
        const filter = value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = restaurantsState;
    }
    setFilteredRestsState(newList);
  };

  return (
    <div className={classes.mainDiv}>
      <div className={classes.middleArea}>
        <h2>All available restaurants:</h2>
        <br />

        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className={classes.restCardsArea}>
        <RestaurantCard rests={filteredRestsState} />
      </div>
    </div>
  );
}

export default AllRestaurants;
