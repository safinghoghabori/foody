import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRestaurants } from "../redux/actions/sellerAction";

import rest1 from "../images/rest1.jpg";

//Material-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 30,
    maxWidth: 250,
    [theme.breakpoints.down("xs")]: {
      maxWidth: "500px",
    },
  },
  rootGrid: {
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  media: {
    width: 250,
    height: 220,
    [theme.breakpoints.down("xs")]: {
      height: "310px",
      width: "325px",
    },
  },
  link: {
    textDecoration: "none",
  },
  // btn: {
  //   width: "160%",
  // },
  capitalize: {
    textTransform: "capitalize",
    fontSize: "2rem",
  },
  cardInfo: {
    fontSize: "1rem",
  },
  cardGrid: {
    [theme.breakpoints.down("md")]: {
      padding: 0,
    },
  },
}));

function RestaurantCard(props) {
  const classes = useStyles();

  const { rests } = props; //get restaurants from props by object destructuring

  const dispatch = useDispatch();
  const { error, loading, restaurants } = useSelector((state) => state.seller);

  useEffect(() => {
    //fetch all restaurants
    dispatch(fetchRestaurants());
  }, []);

  return (
    <Grid container justify="center">
      <Grid
        container
        direction="row"
        justify="flex-start"
        spacing={3}
        className={classes.rootGrid}
        xs={12}
      >
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          rests.map((rest) => (
            <Grid item className={classes.cardGrid}>
              <Card className={classes.root}>
                <img src={rest.image} className={classes.media} />
                {/* <CardMedia className={classes.media} image={rest.image} /> */}
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.capitalize}
                  >
                    {rest.restaurantname}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" className={classes.cardInfo}>
                    {rest.tags}
                  </Typography>
                </CardContent>
                <Divider />
                <CardActions>
                  <Link to={`/restaurant/${rest._id}`} className={classes.link}>
                    <Button
                      variant="contained"
                      style={{ background: "#3f51b5", color: "white" }}
                      className={classes.btn}
                    >
                      ORDER ONLINE
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Grid>
  );
}

export default RestaurantCard;
