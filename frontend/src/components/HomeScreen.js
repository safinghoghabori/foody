import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import cover from "../images/food_img.jpg";
import cover2 from "../images/food_img2.png";
import RestaurantCard from "./RestaurantCard";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../styles/header.css";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import { HistorySharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  headerArea: {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    margin: "0 auto",
    marginTop: "50px",
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      margin: 0,
    },
  },
  middleArea: {
    marginTop: "250px",
    [theme.breakpoints.down("md")]: {
      marginTop: "100px",
    },
  },
  presentation: {
    display: "flex",
    width: "90%",
    margin: "0 auto",
    minHeight: "80vh",
    alignItems: "center",
  },
  safeFood: {
    color: "#343434",
    fontSize: 64,
    fontWeight: 400,
    [theme.breakpoints.down("sm")]: {
      lineHeight: "70px",
    },
  },
  delivery: {
    color: "#08085c",
    fontSize: 64,
    fontWeight: "bold",
    marginTop: -30,
    marginBottom: 20,
    [theme.breakpoints.down("md")]: {
      whiteSpace: "normal",
    },
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      lineHeight: "70px",
    },
  },
  introduction: {
    flex: 1,
    paddingLeft: 60,
    height: "340px",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
      marginLeft: "18px",
      marginTop: "20px",
    },
  },
  paragraph: {
    width: 400,
    fontSize: 14.5,
    [theme.breakpoints.down("md")]: {
      marginTop: "35px",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  coverImg: {
    width: "110%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      textAlign: "center",
      marginTop: "30px",
    },
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
  },
  postHeaderText: {
    marginTop: "50px",
    [theme.breakpoints.down("md")]: {
      textAlign: "center",
    },
  },
  ctaOrder: {
    fontSize: 18,
    backgroundColor: "#86b2f3",
    marginTop: 30,
  },
  restCardsArea: {
    width: "90%",
    margin: "0 auto",
  },
}));

function HomeScreen() {
  const classes = useStyles();
  const history = useHistory();

  const { restaurants, sellerLogin } = useSelector((state) => state.seller);

  const [restaurantsState, setRestaurantsState] = useState(restaurants ? [] : null);
  const [filteredRestsState, setFilteredRestsState] = useState(restaurants ? [] : null);

  //redirect seller
  if (sellerLogin) history.push("/seller/dashboard");

  useEffect(() => {
    setRestaurantsState(restaurants);
    setFilteredRestsState(restaurants);
  }, []);

  const handleSearch = (value) => {
    //variable to hold the original value of the list
    let currentList = [];

    //variable to hold the filtered list before putting into state
    let newList = [];

    //if the searchBar isn't empty
    if (value !== "") {
      //assign the original list to the currentList
      currentList = restaurantsState;

      newList = currentList.filter((rest) => {
        const lc = rest.restaurantname.toLowerCase();
        const filter = value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      //if the searchBar is empty, set newList to original restaurants
      newList = restaurantsState;
    }
    //set filtered state based on what we get above
    setFilteredRestsState(newList);
  };
  return (
    <>
      <section className={classes.headerArea}>
        <div className="" className={classes.introduction}>
          <Typography className={classes.safeFood} noWrap>
            SAFE
          </Typography>
          <Typography className={classes.delivery} noWrap>
            FOOD DELIVERY
          </Typography>
          <Typography variant="body2" className={classes.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad aliquip ex ea commodo consequat.
            Lorem ipsum dolor sit amet.
          </Typography>
          <Button variant="outlined" href="#restaurantsArea" className={classes.ctaOrder}>
            ORDER NOW
          </Button>
        </div>
        <div className={classes.coverImg}>
          <img src={cover2} alt="safe-delivery" className={classes.coverImg} />
        </div>
      </section>
      <div style={{ textAlign: "center" }} className={classes.middleArea} id="restaurantsArea">
        <h2>You are one step away to order food!!</h2>
        <br />

        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className={classes.restCardsArea}>
        <Typography
          gutterBottom
          variant="h6"
          color="textPrimary"
          component="p"
          className={classes.postHeaderText}
        >
          Order from your favourite Eatery -
        </Typography>
        <RestaurantCard rests={filteredRestsState} />
      </div>

      <br />
      <br />
    </>
  );
}

export default HomeScreen;
