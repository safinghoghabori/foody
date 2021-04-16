import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addItem, fetchRestaurant, fetchRestaurantSeller } from "../redux/actions/sellerAction";
import SearchBar from "../components/SearchBar";
import ItemDialog from "../components/ItemDialog";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//react-spinner
import HashLoader from "react-spinners/HashLoader";

//Material-ui
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Icons
import ItemCard from "../components/ItemCard";
import { CLEAR_SELLER_ERROR } from "../redux/types";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "left",
    color: theme.palette.text.secondary,
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
  button: {
    marginTop: 50,
    width: "50%",
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
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
}));

function SellerDashboard() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [editItemData, setEditItemData] = useState({
    title: "",
    price: "",
    description: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const { error, restaurant, loading, items, sellerLogin } = useSelector((state) => state.seller);

  //check seller is loggedin or not
  if (!sellerLogin) history.push("/");

  // const { items } = restaurant; //destructuring object(to get items array)
  const restId = restaurant._id;

  useEffect(() => {
    dispatch(fetchRestaurantSeller(restId));
  }, []);

  useEffect(() => {
    if (items) {
      setItemsState(items);
      setFilteredItemsState(items);
    }
  }, [items]);
  const [itemsState, setItemsState] = useState(items ? [] : null);
  const [filteredItemsState, setFilteredItemsState] = useState(items ? [] : null);

  const handleInputChange = (e) => {
    setEditItemData({
      ...editItemData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditItemData({
      title: "",
      price: "",
      description: "",
    });
    setImage(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    //check for error
    if (!editItemData.title || !editItemData.description || !editItemData.price) {
      return toast.error(`All fields are required...!`, { position: "bottom-right" });
    }

    if (!image) {
      return toast.error(`Image is required...!`, { position: "bottom-right" });
    }

    const itemData = new FormData();
    itemData.append("itemImage", image);
    itemData.append("title", editItemData.title);
    itemData.append("price", editItemData.price);
    itemData.append("description", editItemData.description);

    //dispatch an action to add item(with itemData and sellerId)
    dispatch(addItem(itemData, restId));

    handleClose();
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
        restaurant && (
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
                  {restaurant.restaurantname}
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ textTransform: "capitalize" }}
                >
                  {restaurant.tags}
                </Typography>{" "}
                <br />
                <Typography variant="body2" color="textPrimary">
                  Adress: {restaurant.address}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  State: {restaurant.state}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  City: {restaurant.city}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Email: {restaurant.email}
                </Typography>
                <Typography variant="body2" color="textPrimary">
                  Phone: {restaurant.phoneno}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.imageArea}>
                <img src={`/${restaurant.image}`} className={classes.headerImg} />
              </Grid>
              <Grid item xs={false} sm={1} />
            </Grid>
            <div className={classes.search}>
              <SearchBar handleSearch={handleSearch} />
            </div>

            <div className={classes.cardItemsArea}>
              <Grid container spacing={2} style={{ marginTop: 40 }}>
                {items && items.length === 0 && <p className={classes.para}>No Items present.</p>}
                {filteredItemsState && filteredItemsState.map((item) => <ItemCard {...item} />)}
              </Grid>
              {/* Edit item dialog */}
              <ItemDialog
                open={open}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                handleImage={handleImage}
                editItemData={editItemData}
                handleInputChange={handleInputChange}
              />
              <div style={{ textAlign: "center" }}>
                <Button
                  fullWidth
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                >
                  Add Item
                </Button>
              </div>
            </div>
          </>
        )
      )}
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}

export default SellerDashboard;
