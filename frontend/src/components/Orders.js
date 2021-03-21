import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderCard from "./OrderCard";

//Material-ui
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { getOrders } from "../redux/actions/userActions";
import { getOrdersForSeller } from "../redux/actions/sellerAction";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  para: {
    fontSize: "x-large",
    marginLeft: "32%",
  },
  title: {
    margin: "10px 0px 10px 130px",
    display: "inline-block",
    marginRight: "40%",
  },
}));

function Orders() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const { orders, userId, role } = useSelector((state) => state.user);
  const { selId } = useSelector((state) => state.seller);

  console.log("orders from orders...", orders);

  useEffect(() => {
    if (role === "user") {
      dispatch(getOrders(userId));
    } else {
      dispatch(getOrdersForSeller(selId));
    }
  }, []);

  return (
    <>
      <Typography variant="h5" className={classes.title}>
        Order History:
      </Typography>
      <Grid item container direction="row">
        <Grid item xs={12} sm={1} />
        <Grid item xs={12} sm={10}>
          <Grid container spacing={2}>
            {orders ? (
              orders.length > 0 ? (
                orders.map((order) => (
                  <Grid item xs={12} sm={4} key={order._id}>
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
    </>
  );
}

export default Orders;
