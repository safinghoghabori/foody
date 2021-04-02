import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "./CartItem";
import { addDeliveryAddress, getCart } from "../redux/actions/userActions";

//Material-ui
import Grid from "@material-ui/core/Grid";
import { Paper, Typography } from "@material-ui/core";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//react-spinner
import HashLoader from "react-spinners/HashLoader";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  title: {
    margin: "40px 0px 20px 128px",
    display: "inline-block",
    marginRight: "40%",

    [theme.breakpoints.down("sm")]: {
      display: "block",
      width: "100%",
      margin: "20px auto",
      textAlign: "center",
    },
  },
  spaceTypo: {
    display: "flex",
    justifyContent: "space-between",
  },
  address: {
    "& > *": {
      margin: theme.spacing(4),
      width: "25ch",
    },
  },
  checkoutButton: {
    backgroundColor: "#1266f1",
    color: "white",
    marginBottom: 20,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
    "&:disabled": {
      color: "#bfbfbf",
    },
  },
  summaryInfo: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
      margin: "0 auto",
    },
  },
  cardItems: {
    display: "block",
    marginRight: "30px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
    },
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "15%",
  },
}));

function Cart() {
  const classes = useStyles();
  const [step, setStep] = useState(1);
  const [deliveryData, setDeliveryData] = useState({
    aptName: "",
    locality: "",
    street: "",
    zip: "",
    phoneNo: "",
  });

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, cart, price, error, userId } = useSelector((state) => state.user);

  console.log("cart...", cart);
  console.log("price...", price);
  console.log("id...", userId);

  let deliveryCharge = 0;
  let cartPresent = Array.isArray(cart) && cart.length > 0;
  let cartItems = cartPresent ? cart.length : 0;

  if (price !== 0) deliveryCharge = 20;

  useEffect(() => {
    dispatch(getCart(userId));
  }, []);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  //updates the state of each input field. We have added a name attribute to each input field which matches exactly with the name of the state variables
  const handleInputChange = (e) => {
    setDeliveryData({
      ...deliveryData,
      [e.target.name]: e.target.value,
    });
  };

  console.log("deliveryData...", deliveryData.aptName);
  const handlePlaceOrder = () => {
    if (!deliveryData.aptName) {
      return toast.error("All fiedls are compulsory...!", { position: "bottom-center" });
    } else {
      dispatch(addDeliveryAddress(deliveryData, userId, history));
    }
  };

  return (
    <>
      {loading ? (
        <div className={classes.spinner}>
          <HashLoader size={80} color="#3f51b5" />
        </div>
      ) : (
        <>
          <Typography variant="h5" className={classes.title}>
            {step === 1 && `Cart (${cartItems} Items)`}
            {step === 2 && "Delivery Details"}
          </Typography>
          {step === 2 && (
            <IconButton>
              <KeyboardBackspaceIcon onClick={prevStep} />
            </IconButton>
          )}
          <Grid container direction="row">
            <Grid item sm={1} />
            <Grid item sm={7} className={classes.cardItems}>
              {cartPresent &&
                step === 1 &&
                cart.map((item) => <CartItem {...item} key={item.item._id} />)}
              {step === 2 && (
                <form>
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ margin: "10px 10px 2px 10px" }}
                  >
                    Address:
                  </Typography>
                  <div className={classes.address}>
                    <TextField
                      id="aptName"
                      name="aptName"
                      label="Flat/Apartment Name"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={deliveryData.aptName || ""}
                      // helperText={deliveryData.aptName ? "" : "Flat/Apartment Name is required"}
                      // error={deliveryData.aptName ? false : true}
                      fullWidth
                      required
                    />
                    <TextField
                      id="locality"
                      name="locality"
                      label="Locality"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={deliveryData.locality || ""}
                      fullWidth
                      required
                    />
                    <TextField
                      id="street"
                      name="street"
                      label="Street"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={deliveryData.street || ""}
                      fullWidth
                      required
                    />
                    <TextField
                      id="zipCode"
                      name="zip"
                      label="Zip Code"
                      className={classes.textField}
                      onChange={handleInputChange}
                      value={deliveryData.zip || ""}
                      type="number"
                      fullWidth
                      required
                    />
                    <TextField
                      id="phoneNo"
                      name="phoneNo"
                      label="Contact Number"
                      className={classes.textField}
                      type="number"
                      onChange={handleInputChange}
                      value={deliveryData.phoneNo || ""}
                      fullWidth
                      required
                    />
                  </div>
                </form>
              )}
            </Grid>
            <Grid item sm={3} className={classes.summaryInfo}>
              <Paper className={classes.paper} style={{ backgroundColor: "#faf7f7" }} elevation={4}>
                <div style={{ marginLeft: 20, marginRight: 20 }}>
                  <br />
                  <Typography gutterBottom variant="h5">
                    {step === 1 && "Total Amount"}
                    {step === 2 && "Order Summary"}

                    <br />
                    <br />
                  </Typography>
                  {step === 1 && (
                    <Typography variant="body2" color="textPrimary">
                      <div className={classes.spaceTypo}>
                        <span>Intital Amount</span>
                        <span>Rs. {price}</span>
                      </div>
                      <br />
                      <br />
                      <div className={classes.spaceTypo}>
                        <span>Delivery Charge</span>
                        <span>Rs. {deliveryCharge}</span>
                      </div>
                      <br />
                    </Typography>
                  )}
                  {step === 2 &&
                    cart.map((item) => {
                      return (
                        <Typography variant="body2" color="textPrimary" key={item.item._id}>
                          <div className={classes.spaceTypo}>
                            <span>{item.item.title}</span>
                            <span>
                              Rs.
                              {item.item.price} x {item.qty}
                            </span>
                          </div>
                          <br />
                        </Typography>
                      );
                    })}
                  <hr />
                  <Typography gutterBottom variant="h5">
                    <div className={classes.spaceTypo}>
                      <span>Grand Total</span>
                      <span>Rs. {price + deliveryCharge}</span>
                    </div>
                    <br />
                  </Typography>
                  {step === 1 && (
                    <Button
                      fullWidth
                      className={classes.checkoutButton}
                      disabled={price === 0}
                      onClick={nextStep}
                    >
                      Proceed to Checkout
                    </Button>
                  )}
                  {step === 2 && (
                    <Button fullWidth className={classes.checkoutButton} onClick={handlePlaceOrder}>
                      Place Order
                    </Button>
                  )}
                </div>
              </Paper>
            </Grid>
            <Grid item sm={1} />
          </Grid>

          {/* Toast Container */}
          <ToastContainer />
        </>
      )}
    </>
  );
}

export default Cart;
