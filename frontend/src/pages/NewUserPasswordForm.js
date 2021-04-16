import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Material-ui
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { newUserPassword } from "../redux/actions/userActions";

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

function NewUserPasswordForm() {
  const classes = useStyles();
  const [newPass, setNewPass] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const { loading, error, errorMsg } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { token } = useParams();
  const tokenSplit = token.split("=");
  const actualToken = tokenSplit[1];

  const handleNewPassword = () => {
    if (!newPass) {
      return toast.error(`Please enter new password`, { position: "bottom-right" });
    }

    dispatch(newUserPassword(newPass, actualToken));
    toast.info(`Your password has been changed successfully!`, { position: "bottom-right" });

    setTimeout(() => {
      history.push("/userSignin");
    }, 3000);
  };

  return (
    <Grid container className={classes.form}>
      <Grid item sm className={classes.cardGrid}>
        <div className={classes.card}>
          <br />
          <br />

          <Typography variant="h4" className={classes.title}>
            New Password{" "}
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <br />
            <TextField
              id="password"
              className={classes.textField}
              name="password"
              type="password"
              label="Enter new password"
              variant="outlined"
              onChange={(e) => setNewPass(e.target.value)}
              required
            />{" "}
            <br />
            <br />
            <Button type="submit" variant="contained" color="primary" onClick={handleNewPassword}>
              Change Password
            </Button>
          </form>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </Grid>
    </Grid>
  );
}

export default NewUserPasswordForm;
