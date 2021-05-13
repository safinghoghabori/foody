import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

//material-ui
import { makeStyles } from "@material-ui/core/styles";

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
    display: "block",
    textDecoration: "none",
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
    textAlign: "center",
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
    background: "rgb(63 81 181);",
    color: "white",
    border: 0,
    padding: "5px",
    cursor: "pointer",
    marginTop: "4px",
  },
}));

export default function Footer() {
  const classes = useStyles();

  const { userLogin } = useSelector((state) => state.user);
  const { sellerLogin } = useSelector((state) => state.seller);

  const adminLogin = localStorage.getItem(JSON.stringify("admin"));

  return (
    <>
      <section className={classes.footerContainer}>
        <div className={classes.footer}>
          <div className={classes.mainTitle} style={{ color: "#3f51b5" }}>
            FOODY
          </div>
          <div className={classes.otherLinks}>
            <div className={classes.otherLinksArea}>
              <div className={classes.links}>
                <h6 className={classes.linksMainTitle}>COMPANY</h6>
                <nav>
                  <p className={classes.linksSubTitle}>Who We Are</p>
                  <p className={classes.linksSubTitle}>Blog</p>
                  <p className={classes.linksSubTitle}>Careers</p>
                  <p className={classes.linksSubTitle}>Report Fraude</p>
                  <Link to="/contact" className={classes.linksSubTitle}>
                    Contact
                  </Link>
                </nav>
              </div>
              {userLogin ? (
                <div className={classes.links}>
                  <h6 className={classes.linksMainTitle}>FOR FOODIES</h6>
                  <nav>
                    <Link to="/" className={classes.linksSubTitle}>
                      Home
                    </Link>
                    <Link to="/orders" className={classes.linksSubTitle}>
                      Orders
                    </Link>
                    <Link to="/cart" className={classes.linksSubTitle}>
                      Cart
                    </Link>
                    <Link to="/userLogout" className={classes.linksSubTitle}>
                      Logout
                    </Link>
                    <p className={classes.linksSubTitle}>Community</p>
                    <p className={classes.linksSubTitle}>Help</p>
                  </nav>
                </div>
              ) : (
                !userLogin &&
                !sellerLogin && (
                  <div className={classes.links}>
                    <h6 className={classes.linksMainTitle}>FOR FOODIES</h6>
                    <nav>
                      <Link to="/userSignin" className={classes.linksSubTitle}>
                        Login
                      </Link>
                      <Link to="/userSignup" className={classes.linksSubTitle}>
                        Signup
                      </Link>
                      <p className={classes.linksSubTitle}>Community</p>
                      <p className={classes.linksSubTitle}>Help</p>
                    </nav>
                  </div>
                )
              )}
              {sellerLogin ? (
                <div className={classes.links}>
                  <h6 className={classes.linksMainTitle}>FOR RESTAURANTS</h6>
                  <nav>
                    <Link to="/seller/dashboard" className={classes.linksSubTitle}>
                      Dashboard
                    </Link>
                    <Link to="/orders" className={classes.linksSubTitle}>
                      Orders
                    </Link>{" "}
                    <Link to="/userLogout" className={classes.linksSubTitle}>
                      Logout
                    </Link>
                  </nav>
                </div>
              ) : (
                !sellerLogin &&
                !userLogin && (
                  <div className={classes.links}>
                    <h6 className={classes.linksMainTitle}>FOR RESTAURANTS</h6>
                    <nav>
                      <Link to="/sellerSignup" className={classes.linksSubTitle}>
                        Add Restaurant
                      </Link>
                      <Link to="/sellerSignin" className={classes.linksSubTitle}>
                        Login
                      </Link>
                    </nav>
                  </div>
                )
              )}
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
            This site is made with ❤ by Safin Ghoghabori & Mitesh Kukdeja.
          </p>
        </div>
      </section>
    </>
  );
}
