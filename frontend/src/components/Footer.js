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
  container: {
    backgroundColor: "#e8ede1",
    marginTop: 40,
    justifyContent: "space-between",
  },
  innerCont: {
    margin: "74px 40px 40px 40px",
  },
  resources: {
    margin: "60px 40px 10px 40px",
  },
  buttonStyleOne: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
  buttonStyleTwo: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
    marginLeft: 10,
    marginTop: 8,
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
  navbarLink: {
    color: "white",
    textDecoration: "none",
  },
  footerAttr: {
    textAlign: "center",
    fontSize: "18px",
    width: "100%",
    height: "7vh",
    backgroundColor: "#e8ede1",
    borderTop: "1px solid #9e9da2",
    padding: "8px 0 0 0",
    fontWeight: "500",
  },
  footerLink: {
    textDecoration: "none",
  },
}));

export default function Footer() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.container}>
        <Grid item xs={12} sm={4} className={classes.innerCont}>
          {/* {authenticated ? (
          <Grid container direction="row">
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="p">
                Company
              </Typography>
              <Typography variant="body1" component="p">
                <br />
                - About <br />
                - Blog <br />
                - Careers <br />
                - Contact <br />
                - Report Fraud <br />
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="p">
                For You
              </Typography>
              <Typography variant="body1" component="p">
                <br />
                - Privacy <br />
                - Terms <br />
                - Security <br />
                - Sitemap <br />
                - Code of conduct <br />
              </Typography>
            </Grid>
          </Grid>
        ) : ( */}
          <Typography variant="h4" component="p">
            Foody for Business
          </Typography>
          <Typography variant="body1" component="p">
            Get more out of your business, without losing focus on what is most important —
            delighting your customers
          </Typography>
          <br />
          <Link to="/sellerSignup" className={classes.navbarLink}>
            <Button className={classes.buttonStyleOne}>Get Started</Button>
          </Link>
          {/* )} */}
        </Grid>
        <Grid item xs={12} sm={4} className={classes.innerCont}>
          <Typography variant="h5" component="p">
            Foody NewsLetter
          </Typography>
          <Typography variant="body1" component="p" style={{ marginBottom: 28 }}>
            Stay updated with new offers from us :)
          </Typography>
          <TextField label="Your Email address" variant="outlined" />
          <Button className={classes.buttonStyleTwo}>SEND</Button>
        </Grid>
      </Grid>
      <Grid container>
        <div className={classes.footerAttr}>
          This site is made with ❤ by{" "}
          <a href="!#" className={classes.footerLink}>
            Safin Ghoghabori
          </a>{" "}
          &{" "}
          <a href="!#" className={classes.footerLink}>
            Mitesh Kukadeja
          </a>{" "}
        </div>
      </Grid>
    </>
  );
}
