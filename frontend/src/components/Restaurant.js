import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchRestaurant } from "../redux/actions/sellerAction";
import { addToCart } from "../redux/actions/userActions";
import SearchBar from "./SearchBar";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//react-spinner
import HashLoader from "react-spinners/HashLoader";

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
    width: 328,
    height: 200,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: "100%",
    height: 200,
  },
  controls: {
    marginBottom: "20px",
  },
  playIcon: {
    height: 38,
    width: 38,
  },
  search: {
    margin: "50px",
    marginLeft: "100px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginBottom: "50px",
      textAlign: "center",
      width: "100%",
      transform: "translateX(-103px)",
    },
  },
  link: {
    textDecoration: "none",
  },
  spinnerStyles: {
    color: "red",
    fontSize: 40,
  },

  imageArea: {
    marginTop: "35px",
    height: "100%",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "50%",
      textAlign: "center",
    },
  },
  restDetails: {
    marginTop: "100px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  cardImg: {
    height: "100%",
    width: "50%",
  },
  cardItemsArea: {
    width: "90%",
    margin: "0 auto",
  },
  headerImg: {
    height: "475px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "15%",
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
        <div className={classes.spinner}>
          <HashLoader size={80} color="#3f51b5" />
        </div>
      ) : (
        restaurantUser && (
          <>
            <Grid container>
              <Grid item xs={false} sm={1} />
              <Grid item xs={12} sm={6} className={classes.restDetails}>
                <Typography
                  variant="h3"
                  component="h2"
                  style={{ fontStyle: "bold", textTransform: "capitalize" }}
                  color="textPrimary"
                >
                  {restaurantUser.restaurantname}
                </Typography>

                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ textTransform: "capitalize" }}
                >
                  {restaurantUser.tags}
                </Typography>
                <br />
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
              <Grid item xs={12} sm={4} className={classes.imageArea}>
                <img src={`/${restaurantUser.image}`} className={classes.headerImg} />
              </Grid>
              <Grid item xs={false} sm={1} />
            </Grid>
            <div className={classes.search}>
              <SearchBar handleSearch={handleSearch} />
            </div>

            <div className={classes.cardItemsArea}>
              <Grid container spacing={2} style={{ marginTop: 40 }}>
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
                          </div>
                        </div>
                        <div className={classes.cardImg}>
                          <img
                            src={`http://localhost:5000/${item.image.replace(/\\/g, "/")}`}
                            className={classes.cover}
                          />
                        </div>
                      </Card>
                    </Grid>
                  ))}
              </Grid>
            </div>
          </>
        )
      )}
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}

export default Restaurant;
