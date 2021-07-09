import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Material-ui
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SET_ADMIN } from "../../redux/types";

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
    fontSize: 18,
  },
  cardGrid: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  para: {
    color: "blue",
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

function Login() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { adminLogin } = useSelector((state) => state.admin);

  //check admin is login or not
  if (adminLogin) history.push("/admin/allRestaurants");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogin = () => {
    if (!email || !password) {
      return toast.error("All fields are compulsory...!", { position: "bottom-right" });
    }

    if (email === process.env.REACT_APP_ADMIN_ID && password === process.env.REACT_APP_ADMIN_PASSWORD) {
      const userData = {
        email,
        password,
        isAdmin: true,
      };

      dispatch({ type: SET_ADMIN });

      localStorage.setItem("admin", JSON.stringify(userData));
      history.push("/admin/allRestaurants");
    } else {
      return toast.error("Invalid email or password", { position: "bottom-right" });
    }
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm className={classes.mainCard}>
        <div className={classes.card}>
          {" "}
          <br />
          <br />
          <Typography variant="h3" className={classes.title}>
            Admin Login
            <span role="img" aria-label="Pizza Emoji">
              🤵
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
          </form>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default Login;
