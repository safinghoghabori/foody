import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

//Material-ui
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { Paper } from "@material-ui/core";

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

function UserSignup() {
  const classes = useStyles();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    // console.log("app user state...", userState);
    e.preventDefault();
  };

  const handleSignup = () => {
    // var firstNameError = null;
    // var lastNameError = null;
    // let emailError = null;
    // let passwordError = null;
    // //validate data
    // console.log("error", firstNameError);
    // console.log("firstname...", firstname);
    if (!firstname || !lastname || !email || !password || !address || !state || !city) {
      return toast.error("All fields are compulsory...!", { position: "bottom-center" });
    }
    //pass obj to the actions so that we can directly pass it to API requests
    const newUserData = {
      firstname,
      lastname,
      email,
      password,
      address,
      state,
      city,
    };
    dispatch(signupUser(newUserData, history));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm className={classes.mainCard}>
        <div className={classes.card}>
          {" "}
          <br />
          <br />
          <Typography variant="h3" className={classes.title}>
            Register{" "}
            <span role="img" aria-label="Pizza Emoji">
              🍕
            </span>
          </Typography>
          {loading && <div>Loading...</div>}
          <br />
          <br />
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="firstname"
              name="firstname"
              label="Firstname"
              variant="outlined"
              className={classes.textField}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
            <br />
            <TextField
              id="lastname"
              className={classes.textField}
              name="lastname"
              label="Lirstname"
              variant="outlined"
              onChange={(e) => setLastname(e.target.value)}
              // helperText={!lastname ? "Lastname must be entered" : ""}
              required
            />
            <br />
            <TextField
              id="email"
              className={classes.textField}
              name="email"
              label="Email"
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
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              // helperText={!password ? "Password must be entered" : ""}
              required
            />
            <br />
            <TextField
              id="address"
              className={classes.textField}
              name="address"
              label="Address"
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
              variant="outlined"
              onChange={(e) => setCity(e.target.value)}
              // helperText={!lastname ? "City must be entered" : ""}
              required
            />
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary" onClick={handleSignup}>
              Register
            </Button>
            <br />
            <br />
            <small className={classes.small}>
              Already have an account ? Login <Link to="/userSignin">here</Link>
            </small>
          </form>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default UserSignup;
