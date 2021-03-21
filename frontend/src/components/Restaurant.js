import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurant } from "../redux/actions/sellerAction";
import { addToCart } from "../redux/actions/userActions";
import SearchBar from "./SearchBar";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Material-ui
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import Button from "@material-ui/core/Button";

//react-spinner
import BounceLoader from "react-spinners/BounceLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
  },

  cardRoot: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
    height: 200,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  search: {
    margin: "50px",
    marginLeft: "100px",
    width: "100%",
  },
  link: {
    textDecoration: "none",
  },
  spinnerStyles: {
    color: "red",
    fontSize: 40,
  },
}));

function Restaurant() {
  const classes = useStyles();
  const theme = useTheme();

  const { id } = useParams();
  const dispatch = useDispatch();

  const { error, restaurantUser, loading } = useSelector((state) => state.seller);
  const { items } = restaurantUser; //object destructuring

  const { userLogin, userId, addCartSuccess, addCartFail } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchRestaurant(id));

    setItemsState(items);
    setFilteredItemsState(items);
  }, []);
  const [itemsState, setItemsState] = useState(items ? [] : null);
  const [filteredItemsState, setFilteredItemsState] = useState(items ? [] : null);

  const handleAddToCart = (itemId) => {
    dispatch(addToCart(userId, itemId));
    handleToast();
  };

  const handleToast = () => {
    toast.info("Item added to cart successfully...!", { position: "bottom-right" });
  };

  const handleSearch = (value) => {
    let currentList = [];
    let newList = [];

    if (value !== "") {
      currentList = itemsState;

      newList = currentList.filter((item) => {
        const lc = item.title.toLowerCase();
        const filter = value.toLowerCase();

        return lc.includes(filter);
      });
    } else {
      newList = itemsState;
    }
    setFilteredItemsState(newList);
  };

  return (
    <>
      {loading ? (
        <BounceLoader />
      ) : (
        restaurantUser && (
          <>
            <Grid container>
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={6} style={{ marginTop: 120 }}>
                <Typography
                  variant="h3"
                  component="h2"
                  style={{ fontStyle: "bold" }}
                  color="textPrimary"
                >
                  {restaurantUser.restaurantname}
                </Typography>

                <Typography variant="h6" color="textPrimary">
                  {restaurantUser.tags}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Adress: {restaurantUser.address}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  State: {restaurantUser.state}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  City: {restaurantUser.city}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Email: {restaurantUser.email}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Phone: {restaurantUser.phoneno}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} style={{ marginTop: 34 }}>
                <img src={`/${restaurantUser.image}`} style={{ height: 500, width: 500 }} />
              </Grid>
              <Grid item xs={false} sm={1} />
            </Grid>
            <Grid container>
              <div className={classes.search}>
                <SearchBar handleSearch={handleSearch} />
              </div>
            </Grid>

            <Grid container spacing={2} style={{ maarginTop: 100 }}>
              {filteredItemsState &&
                filteredItemsState.map((item) => (
                  <Grid item container xs={12} sm={6} md={4} justify="center">
                    <Card className={classes.cardRoot}>
                      <div className={classes.details}>
                        <CardContent className={classes.content}>
                          <Typography component="h5" variant="h5">
                            {item.title}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            Rs. {item.price}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            {item.description}
                          </Typography>
                        </CardContent>
                        <div className={classes.controls}>
                          {userLogin ? (
                            <Button
                              variant="contained"
                              style={{ background: "#3f51b5", color: "white" }}
                              onClick={() => {
                                handleAddToCart(item._id);
                              }}
                            >
                              Add to Cart
                            </Button>
                          ) : (
                            <Link to="/userSignin" className={classes.link}>
                              <Button
                                variant="contained"
                                style={{ background: "#3f51b5", color: "white" }}
                              >
                                Add to Cart
                              </Button>
                            </Link>
                          )}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                      </div>
                      <img
                        src={`http://localhost:5000/${item.image.replace(/\\/g, "/")}`}
                        className={classes.cover}
                      />
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </>
        )
      )}
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}

export default Restaurant;
