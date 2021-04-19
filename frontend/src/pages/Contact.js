import React from "react";
import contactUsImg from "../images/contact.jpeg";

//Material-ui
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  mainDiv: {
    width: "90%",
    margin: "0 auto",
    marginTop: 50,
    display: "flex",
    justifyContent: "space-around",
    "@media screen and (max-width: 580px)": {
      flexDirection: "column",
    },
  },
  heading: {
    marginBottom: 20,
  },
  textField: {
    width: "84%",
  },
  contactUsImg: {
    // background: `url(${contactUsImg})`,
    width: "100%",
    height: 300,
    // filter: "greyscale(100%)",
  },
  image: {
    width: "100%",
    height: 300,
  },
  headerContent: {
    position: "absolute",
    top: "35%",
    left: " 50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    textAlign: "center",
  },
  contactForm: {
    width: "100%",
    "@media screen and (max-width: 580px)": {
      textAlign: "center",
    },
  },
  contactArea: {
    "@media screen and (max-width: 580px)": {
      marginTop: "50px",
      marginLeft: "30px",
    },
  },
}));

function Contact() {
  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className={classes.contactUsImg}>
        <div>
          <img src={contactUsImg} className={classes.image} />
        </div>
        <div className={classes.headerContent}>
          <h1 style={{ color: "white", fontSize: "3.5rem" }}>We would love to hear from you!</h1>
        </div>
      </div>
      <div className={classes.mainDiv}>
        <div className={classes.contactForm}>
          <div className={classes.heading}>
            <h1 style={{ color: "#3f51b5" }}>Have any query?</h1>
          </div>
          <div>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                id="name"
                name="name"
                label="Full Name"
                variant="outlined"
                className={classes.textField}
                //   onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <br />
              <br />
              <TextField
                id="email"
                className={classes.textField}
                name="email"
                label="Email"
                variant="outlined"
                //   onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <br />
              <TextField
                id="message"
                name="message"
                label="Message"
                variant="outlined"
                multiline
                placeholder="Type your query or feedback here"
                className={classes.textField}
                //   onChange={(e) => setFirstname(e.target.value)}
                required
              />
              <br />
              <br />{" "}
              <Button type="submit" variant="contained" color="primary">
                Submit Feedback
              </Button>
            </form>
          </div>
        </div>
        <div className={classes.contactArea}>
          <div className={classes.heading}>
            <h1 style={{ color: "#3f51b5" }}>Contact us</h1>
          </div>
          <div className={classes.details}>
            <h4>Adress:</h4>
            <span>Opp. Z Mall, vishveshraya road, hill drive, bhavnagar - 364001 </span>

            <h4>Email:</h4>
            <span>safinghoghabori65@gmail.com</span>

            <h4>Phone:</h4>
            <span>(+91) 6343949986</span>

            <h4>Customer Care:</h4>
            <span>(0278) 232343</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
