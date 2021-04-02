import React from "react";
import { useDispatch } from "react-redux";

//Material-ui
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  status: {
    backgroundColor: "rgb(62 59 59 / 87%)",
    color: "#ffffff",
    textAlign: "center",
  },
  odId: {
    lineBreak: "anywhere",
  },
}));

function OrderCard(props) {
  const classes = useStyles();
  const order = props.order;
  const role = props.role;

  //calculate total
  let totalPrice = 0;
  order.items.map((item) => {
    totalPrice = totalPrice + item.item.price * item.qty;
  });

  const dispatch = useDispatch();
  return (
    <Paper
      style={{
        backgroundColor: "#faf7f7",
        marginRight: 20,
        marginBottom: 20,
      }}
      elevation={4}
    >
      <div style={{ marginLeft: 10, marginRight: 10 }}>
        <Typography variant="body1" color="textSecondary" className={classes.odId}>
          OrderId - #{order._id}
        </Typography>
        <Divider />
        {role === "user" ? (
          <>
            <Typography gutterBottom variant="body1" color="textPrimary">
              <b>Ordered From:</b> {order.seller.name}
            </Typography>
            <Typography gutterBottom variant="body1" color="textPrimary">
              <b>Call:</b> +91 {order.seller.phone}
            </Typography>
          </>
        ) : (
          <>
            <Typography gutterBottom variant="body1" color="textPrimary">
              <b>Ordered By:</b> {order.user.name}
            </Typography>
            <Typography gutterBottom variant="body1" color="textPrimary">
              <b>Address:</b>{" "}
              {order.user.address.aptName +
                "," +
                order.user.address.street +
                "," +
                order.user.address.locality +
                "," +
                order.user.address.zip}
            </Typography>
            <Typography gutterBottom variant="body1" color="textPrimary">
              <b>Phone:</b> {order.user.address.phoneNo}
            </Typography>
          </>
        )}
        <Divider />
        {order.items.map((item) => (
          <>
            <Typography gutterBottom variant="body1" color="textPrimary">
              <b>Item:</b> {item.item.title}
            </Typography>
            <Typography gutterBottom variant="body1" color="textPrimary">
              Rs. {item.item.price} x {item.qty}
            </Typography>
          </>
        ))}
        <br />
        <Divider />
        <Typography gutterBottom variant="body1" color="textPrimary">
          Total Price: {totalPrice}
        </Typography>
      </div>
      <Typography size="small" className={classes.status} fullWidth>
        Order Placed
      </Typography>
    </Paper>
  );
}

export default OrderCard;
