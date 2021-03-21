import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, fetchRestaurant } from "../redux/actions/sellerAction";
import SearchBar from "./SearchBar";
import ItemDialog from "./ItemDialog";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Material-ui
import Grid from "@material-ui/core/Grid";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Icons
import ItemCard from "./ItemCard";
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
    width: "100%",
  },
  link: {
    textDecoration: "none",
  },
  button: {
    marginTop: 50,
    width: "50%",
  },
}));

function SellerDashboard() {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState({});
  const [editItemData, setEditItemData] = useState({
    title: "",
    price: "",
    description: "",
  });

  const dispatch = useDispatch();
  const { error, restaurant, loading, items } = useSelector((state) => state.seller);
  // const { items } = restaurant; //destructuring object(to get items array)
  const restId = restaurant._id;

  useEffect(() => {
    dispatch(fetchRestaurant(restId));
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

    if (error) {
      console.log("inside error condition...");
      dispatch({ type: CLEAR_SELLER_ERROR });
      return toast.error(`${error}...!`, { position: "bottom-right" });
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

  // console.log("filteredItemsState...", filteredItemsState);
  // console.log("handleSearch...", handleSearch);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        restaurant && (
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
                  {restaurant.restaurantname}
                </Typography>
                <Typography variant="h6" color="textPrimary">
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
              <Grid item xs={12} sm={4} style={{ marginTop: 34 }}>
                <img src={`/${restaurant.image}`} style={{ height: 500, width: 500 }} />
              </Grid>
              <Grid item xs={false} sm={1} />
            </Grid>
            <Grid container>
              <div className={classes.search}>
                <SearchBar handleSearch={handleSearch} />
              </div>
            </Grid>
            <Grid container spacing={2} style={{ maarginTop: 100 }}>
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
          </>
        )
      )}
      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}

export default SellerDashboard;
