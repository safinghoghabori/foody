import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//Material-ui
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from "@material-ui/core";
import ListIcon from "@material-ui/icons/List";
import NavigationDrawer from "./NavigationDrawer";
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import FastfoodOutlinedIcon from "@material-ui/icons/FastfoodOutlined";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { logoutUser } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    background: "red",
  },
  title: {
    flexGrow: 1,
  },
  menuDemo: {
    color: "black",
  },
  navIconHide: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  navLinksHide: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  navbarLink: {
    color: "white",
    textDecoration: "none",
  },
}));

function Navbar() {
  const classes = useStyles();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  var menuItems = [];

  const history = useHistory();
  const dispatch = useDispatch();
  const { userLogin, firstname } = useSelector((state) => state.user);
  const { sellerLogin, restaurantname } = useSelector((state) => state.seller);

  const handleMobileDrawerOpen = () => {
    setIsMobileDrawerOpen(true);
  };
  if (userLogin) {
    menuItems = [
      {
        name: `Hello,  ${firstname}`,
        link: "/",
      },
      {
        link: "/orders",
        name: "Orders",
        icon: <AssessmentIcon className="text-white" />,
      },
      {
        link: "/cart",
        name: "Cart",
        icon: <ShoppingCartOutlinedIcon className="text-white" />,
      },
      {
        link: "/userLogout",
        name: "Logout",
        icon: <ExitToAppIcon className="text-white" />,
      },
    ];
  } else if (!userLogin && !sellerLogin) {
    menuItems = [
      {
        link: "/userSignin",
        name: "Login",
        icon: <HomeIcon className="text-white" />,
      },
      {
        link: "/userSignup",
        name: "Signup",
        icon: <PersonAddIcon className="text-white" />,
      },
    ];
  } else if (sellerLogin) {
    menuItems = [
      {
        name: `Hello ${restaurantname}`,
        link: "/seller/dashboard",
      },
      {
        link: "/orders",
        name: "Customer Orders",
        icon: <FastfoodOutlinedIcon className="text-white" />,
      },
      {
        link: "/seller/dashboard",
        name: "Dashboard",
        icon: <FastfoodOutlinedIcon className="text-white" />,
      },
      {
        link: "/userLogout",
        name: "Logout",
        icon: <ExitToAppIcon className="text-white" />,
      },
    ];
  }

  return (
    <>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title} style={{ textAlign: "left" }}>
            <Link to="/" className={classes.navbarLink}>
              Foody
            </Link>
          </Typography>

          <div className={classes.navLinksHide}>
            {menuItems.map((item) => (
              <Button color="inherit" onClick={() => history.push(`${item.link}`)}>
                {item.name}
              </Button>
            ))}
          </div>

          <IconButton
            onClick={handleMobileDrawerOpen}
            color="inherit"
            className={classes.navIconHide}
          >
            <ListIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <NavigationDrawer
        menuItems={menuItems}
        anchor="right"
        open={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
      />
    </>
  );
}

export default Navbar;
