import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import OrderCard from "../components/OrderCard";

//Material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { getOrders } from "../redux/actions/userActions";
import { getOrdersForSeller } from "../redux/actions/sellerAction";

//react-spinner
import HashLoader from "react-spinners/HashLoader";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CHANGE_PAYMENT_SUCCESS } from "../redux/types";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "26px 0px 26px 130px",
    display: "inline-block",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      textAlign: "center",
      margin: "26px 0",
    },
  },
  ordercard: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: 20,
    },
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "15%",
  },
}));

function Orders() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();

  const { orders, userId, role, loading, isTransactionSuccess, userLogin } = useSelector(
    (state) => state.user
  );
  const { selId, sellerLogin } = useSelector((state) => state.seller);

  // Check user or seller is logged in or not
  if (!userLogin && !sellerLogin) history.push("/");

  useEffect(() => {
    if (role === "user") {
      dispatch(getOrders(userId));
      if (isTransactionSuccess) {
        toast.info("Transaction has done successfully.", { position: "top-center" });
        dispatch({ type: CHANGE_PAYMENT_SUCCESS });
      }
    } else {
      dispatch(getOrdersForSeller(selId));
    }
  }, []);

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        Order History:
      </Typography>
      {loading ? (
        <div className={classes.spinner}>
          <HashLoader size={80} color="#3f51b5" />
        </div>
      ) : (
        <Grid item container direction="row" className={classes.cardMain}>
          <Grid item xs={12} sm={1} />
          <Grid item xs={12} sm={10}>
            <Grid container spacing={2} style={{ lineBreak: "anywhere" }}>
              {orders ? (
                orders.length > 0 ? (
                  orders.map((order) => (
                    <Grid item xs={12} sm={4} key={order._id} className={classes.ordercard}>
                      <OrderCard order={order} role={role} />
                    </Grid>
                  ))
                ) : (
                  <p className={classes.para}>No orders present.</p>
                )
              ) : null}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={1} />
        </Grid>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
}

export default Orders;
