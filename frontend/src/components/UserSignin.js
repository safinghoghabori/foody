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
  const { loading, error, errorMsg, resetPassError } = useSelector((state) => state.user);

  console.log("error user...", error);
  console.log("resetPassError...", resetPassError);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

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

  const handleResetPassword = () => {
    if (!passEmail) {
      return toast.error(`Email is required`, { position: "bottom-right" });
    }

    if (resetPassError) {
      return toast.error(`${resetPassError}`, { position: "bottom-right" });
    }

    dispatch(resetUserPassword(passEmail));
    toast.error(`Please check your email to reset password`, { position: "bottom-right" });

    setTimeout(() => {
      history.push("/");
    }, 4000);
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
