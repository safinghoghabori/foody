import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signinUser } from "../redux/actions/userActions";

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
      width: "70%",
    },
  },
  card: {
    textAlign: "center",
  },
  small: {
    fontSize: 20,
  },
  cardGrid: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

function UserSignin() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, errorMsg } = useSelector((state) => state.user);

  console.log("error state...", error);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(`${error}`, { position: "bottom-right" });
  //   }
  // }, [error]);

  const handleLogin = () => {
    if (!email || !password) {
      return toast.error("All fields are compulsory...!", { position: "bottom-right" });
    }

    const userData = {
      email,
      password,
    };
    dispatch(signinUser(userData, history));

    if (error) {
      toast.error(`${error}`, { position: "bottom-right" });
    }
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm className={classes.cardGrid}>
        <div className={classes.card}>
          {" "}
          <br />
          <br />
          <Typography variant="h3" className={classes.title}>
            Login{" "}
            <span role="img" aria-label="Pizza Emoji">
              😋
            </span>
          </Typography>
          <br />
          <br />
          <form noValidate onSubmit={handleSubmit}>
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
            <br />

            <Button type="submit" variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
            <br />
            <br />
            <small className={classes.small}>
              New user? Register <Link to="/userSignup">here</Link>
            </small>
          </form>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default UserSignin;
