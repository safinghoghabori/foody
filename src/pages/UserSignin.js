import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetUserPassword, signinUser } from "../redux/actions/userActions";

//Material-ui
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";

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

function UserSignin() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState(1);
  const [passEmail, setPassEmail] = useState("");
  const [newPass, setNewPass] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, errorMsg, resetPassError, userLogin } = useSelector(
    (state) => state.user
  );

  //check user is logged in or not
  if (userLogin) history.push("/");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // });

  const handleLogin = () => {
    if (!email || !password) {
      return toast.error("All fields are compulsory...!", { position: "bottom-right" });
    }

    /* Input validations */
    const mailFormate = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    if (!email.match(mailFormate))
      return toast.error("Please enter valid email address", {
        position: "bottom-center",
      });

    const userData = {
      email,
      password,
    };

    dispatch(signinUser(userData, history));
  };

  const handleResetPassword = () => {
    if (!passEmail) {
      return toast.error(`Email is required`, { position: "bottom-right" });
    }

    dispatch(resetUserPassword(passEmail, history));
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm className={classes.cardGrid}>
        <div className={classes.card}>
          <br />
          <br />
          {step === 1 && (
            <>
              <Typography variant="h3" className={classes.title}>
                Login{" "}
                <span role="img" aria-label="Pizza Emoji">
                  ????
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
                <small className={classes.small}>
                  <p onClick={nextStep} className={classes.para}>
                    {" "}
                    Forgot password?{" "}
                  </p>
                </small>
                <br />
                <br />
                <Button type="submit" variant="contained" color="primary" onClick={handleLogin}>
                  Login
                </Button>
                <br />
                <br />
                <small className={classes.small}>
                  New user? <Link to="/userSignup">Register here</Link>
                </small>
              </form>
            </>
          )}
          {step === 2 && (
            <div>
              <IconButton style={{ marginLeft: "50%" }}>
                <KeyboardBackspaceIcon onClick={prevStep} />
              </IconButton>
              <Typography variant="h4" className={classes.title}>
                Reset Password{" "}
                {/* <span role="img" aria-label="Pizza Emoji">
                
                </span> */}
              </Typography>
              <form noValidate onSubmit={handleSubmit}>
                <br />
                <TextField
                  id="email"
                  className={classes.textField}
                  name="email"
                  label="Enter your email"
                  variant="outlined"
                  onChange={(e) => setPassEmail(e.target.value)}
                  required
                />{" "}
                <br />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleResetPassword}
                >
                  Send
                </Button>
              </form>
            </div>
          )}
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default UserSignin;
