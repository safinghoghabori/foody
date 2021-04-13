import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/userActions";

//Material-ui
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CLEAR_USER_ERROR } from "../redux/types";

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

  useEffect(() => {
    dispatch({ type: CLEAR_USER_ERROR });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSignup = () => {
    if (!firstname || !lastname || !email || !password || !address || !state || !city) {
      return toast.error("All fields are compulsory...!", { position: "bottom-center" });
    }

    /* input validations */
    const letters = /^[A-Za-z]+$/;
    if (!firstname.match(letters) || !lastname.match(letters))
      return toast.error("Please enter alphabate characters only in firstname and lastname", {
        position: "bottom-center",
      });

    const mailFormate = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!email.match(mailFormate))
      return toast.error("Please enter valid email address", {
        position: "bottom-center",
      });

    if (!state.match(letters) || !city.match(letters))
      return toast.error("Please enter alphabate characters only in state and city name", {
        position: "bottom-center",
      });

    if (error) {
      return toast.error(`${error}`, { position: "bottom-center" });
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
              Already have an account?<Link to="/userSignin"> Login here</Link>
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
