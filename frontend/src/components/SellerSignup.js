import React, { useState } from "react";
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
  const { loading, error } = useSelector((state) => state.seller);

  const handleImage = (e) => {
    const uploadedFile = e.target.files[0]; // CAN ALSO WRITE const [uploadedFile] = e.target.files[0] //Array Destructuring
    setImage(uploadedFile);
  };

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
      return toast.error("All fields are compulsory...!", { position: "bottom-center" });
    }
    if (!image) return toast.error("Image is required...!", { position: "bottom-center" });

    if (error) return toast.error(`${error.error}`, { position: "bottom-center" });

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
