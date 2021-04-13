import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//material-ui
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    backgroundColor: "#e8ede1",
    marginTop: 40,
  },
  footer: {
    width: "90%",
    margin: "0 auto",
    fontSize: 20,
    padding: "4rem 0 1.2rem",
  },
  mainTitle: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  otherLinksArea: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "3rem",
    "@media (max-width: 680px)": {
      flexWrap: "wrap",
      "& div": {
        marginTop: "2rem",
      },
    },
  },
  linksMainTitle: {
    fontSize: "1rem",
    letterSpacing: "0.2rem",
    fontWeight: "500",
    margin: "0px 0px 0.7rem",
  },
  linksSubTitle: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    color: "rgb(105,105,105)",
    margin: "0.5rem 0px",
    "&:hover": {
      color: "black",
      cursor: "pointer",
    },
  },
  tagLine: {
    fontSize: "1rem",
    color: "rgb(79,79,79)",
    lineHeight: "1rem",
    marginTop: "1.3rem",
  },
  links: {
    "@media (max-width: 750px)": {
      width: "100%",
      maxWidth: "40.3333%",
    },
  },
  newslatterInput: {
    width: "100%",
    background: "#e8ede1",
    border: "1px solid dimgrey",
    borderRadius: "2px",
  },
  subsBtn: {
    background: "rgb(67, 96, 138);",
    color: "white",
    border: 0,
    padding: "5px",
    cursor: "pointer",
    marginTop: "4px",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <>
      <section className={classes.footerContainer}>
        <div className={classes.footer}>
          <div className={classes.mainTitle}>FOODY</div>
          <div className={classes.otherLinks}>
            <div className={classes.otherLinksArea}>
              <div className={classes.links}>
                <h6 className={classes.linksMainTitle}>COMPANY</h6>
                <nav>
                  <p className={classes.linksSubTitle}>Who We Are</p>
                  <p className={classes.linksSubTitle}>Blog</p>
                  <p className={classes.linksSubTitle}>Careers</p>
                  <p className={classes.linksSubTitle}>Report Fraude</p>
                  <p className={classes.linksSubTitle}>Contact</p>
                </nav>
              </div>
              <div className={classes.links}>
                <h6 className={classes.linksMainTitle}>FOR FOODIES</h6>
                <nav>
                  <p className={classes.linksSubTitle}>Login</p>
                  <p className={classes.linksSubTitle}>Signup</p>
                  <p className={classes.linksSubTitle}>Community</p>
                  <p className={classes.linksSubTitle}>Help</p>
                </nav>
              </div>
              <div className={classes.links}>
                <h6 className={classes.linksMainTitle}>FOR RESTAURANTS</h6>
                <nav>
                  <p className={classes.linksSubTitle}>Add Restaurant</p>
                  <p className={classes.linksSubTitle}>Login</p>
                </nav>
              </div>
              <div className={classes.links}>
                <h6 className={classes.linksMainTitle}>NEWSLATTER</h6>
                <p className={classes.linksSubTitle}>Stay updated with new offers from us</p>
                <input type="email" name="email" className={classes.newslatterInput} />
                <button className={classes.subsBtn}>Subscribe</button>
              </div>
            </div>
          </div>
          <hr />
          <p className={classes.tagLine}>
            All trademarks are properties of their respective owners. 2021 © Foody™ Pvt Ltd. All
            rights reserved.This site is made with ❤ by Safin Ghoghabori & Mitesh Kukdeja
          </p>
        </div>
      </section>
    </>
  );
}
