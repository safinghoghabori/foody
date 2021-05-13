import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupSeller } from "../redux/actions/sellerAction";

//Material-ui
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CLEAR_SELLER_ERROR } from "../redux/types";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  textField: {
    width: "40%",
    margin: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "55%",
    },
  },
  card: {
    textAlign: "center",
  },
  small: {
    fontSize: 20,
  },
  mainCard: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

function SellerSignup() {
  const classes = useStyles();
  const [restaurantname, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneNo] = useState("");
  const [tags, setTags] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, sellerLogin } = useSelector((state) => state.seller);

  const handleImage = (e) => {
    const uploadedFile = e.target.files[0]; // CAN ALSO WRITE const [uploadedFile] = e.target.files[0] //Array Destructuring
    setImage(uploadedFile);
  };

  //check seller is loggedin or not
  if (sellerLogin) history.push("/seller/dashboard");

  useEffect(() => {
    dispatch({ type: CLEAR_SELLER_ERROR });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSignup = () => {
    if (
      !restaurantname ||
      !phoneno ||
      !email ||
      !password ||
      !address ||
      !state ||
      !city ||
      !tags
    ) {
      return toast.error("All fields are compulsory...!", { position: "bottom-right" });
    }

    if (!image) return toast.error("Image is required...!", { position: "bottom-right" });

    /* input validations */
    const letters = /^[A-Za-z\s]*$/;
    if (!restaurantname.match(letters))
      return toast.error("Please enter alphabate characters only in restaurant name", {
        position: "bottom-right",
      });

    const mailFormate =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!email.match(mailFormate))
      return toast.error("Please enter valid email address", {
        position: "bottom-right",
      });

    if (!state.match(letters) || !city.match(letters))
      return toast.error("Please enter alphabate characters only in state and city name", {
        position: "bottom-right",
      });

    const nos = /^\d{10}$/;
    if (!phoneno.match(nos))
      return toast.error("Phoneno must contain only 10 digits and numeric value only", {
        position: "bottom-right",
      });

    if (!image) return toast.error("Image is required...!", { position: "bottom-right" });

    if (error) return toast.error(`${error}`, { position: "bottom-right" });

    //Passing image and form data together[otherwise its not working if we pass seperate data with seperate objects]
    const formData = new FormData();
    formData.append("restImage", image);
    formData.append("restaurantname", restaurantname);
    formData.append("phoneno", phoneno);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("state", state);
    formData.append("tags", tags);
    formData.append("city", city);

    dispatch(signupSeller(formData, history));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm className={classes.mainCard}>
        <div className={classes.card}>
          {" "}
          <br />
          <br />
          <Typography variant="h3" className={classes.title}>
            Add a Restaurant{" "}
            <span role="img" aria-label="Pizza Emoji">
              🍽️
            </span>
          </Typography>
          <br />
          <br />
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="restaurantname"
              name="restaurantname"
              label="Restaurant Name"
              placeholder="Your restaurant name"
              value={restaurantname}
              variant="outlined"
              className={classes.textField}
              onChange={(e) => setRestaurantName(e.target.value)}
              required
            />
            <br />
            <TextField
              id="email"
              className={classes.textField}
              name="email"
              label="Business Email"
              placeholder="Your business Email"
              value={email}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              // helperText={!email ? "Email must be entered" : ""}
              required
            />
            <br />
            <TextField
              id="password"
              type="password"
              className={classes.textField}
              name="password"
              label="Password"
              value={password}
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              // helperText={!password ? "Password must be entered" : ""}
              required
            />
            <br />
            <TextField
              id="tags"
              className={classes.textField}
              name="tags"
              label="Tags"
              value={tags}
              placeholder="chilli, spicy, "
              variant="outlined"
              onChange={(e) => setTags(e.target.value)}
              // helperText={!address ? "Address must be entered" : ""}
              required
            />
            <br />
            <TextField
              id="phoneno"
              className={classes.textField}
              name="phoneno"
              label="Phone"
              value={phoneno}
              variant="outlined"
              type="number"
              onChange={(e) => setPhoneNo(e.target.value)}
              // helperText={!address ? "Address must be entered" : ""}
              required
            />
            <br />
            <TextField
              id="address"
              className={classes.textField}
              name="address"
              label="Address"
              value={address}
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
              // helperText={!address ? "Address must be entered" : ""}
              required
            />
            <br />
            <TextField
              id="state"
              className={classes.textField}
              name="state"
              label="State"
              value={state}
              variant="outlined"
              onChange={(e) => setState(e.target.value)}
              // helperText={!state ? "State must be entered" : ""}
              required
            />
            <br />
            <TextField
              id="city"
              className={classes.textField}
              name="city"
              label="City"
              value={city}
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
              // helperText={!lastname ? "City must be entered" : ""}
              required
            />
            <br />
            <Typography>Upload Image:</Typography>
            <input type="file" name="restImage" accept="image/*" onChange={handleImage} />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary" onClick={handleSignup}>
              Register
            </Button>
            <br />
            <small className={classes.small}>
              Already have an account ? Login <Link to="/sellerSignin">here</Link>
            </small>
          </form>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default SellerSignup;
