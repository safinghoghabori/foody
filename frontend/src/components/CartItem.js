import React from "react";
import { useDispatch, useSelector } from "react-redux";

//m-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

// Icons
import RemoveIcon from "@material-ui/icons/Remove";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { addToCart, deleteCartItem, reduceCartItem } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
  },
  itemTotal: {
    marginTop: "13px",
  },
  imgCover: { height: 184, width: 270 },
}));

function CartItem(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.user);

  const {
    qty,
    item: { _id, title, price, description, image },
  } = props;
  console.log("itemId...", _id);

  //convert imgUrl to use in frontend
  const imageUrlSplit = image.split("\\");
  const finalImageUrl = `http://localhost:5000/${imageUrlSplit[0]}/${imageUrlSplit[1]}`;

  const handleAddItem = () => {
    dispatch(addToCart(userId, _id));
  };
  const handleReduceItem = () => {
    dispatch(reduceCartItem(userId, _id));
  };
  const handleDeleteItem = () => {
    dispatch(deleteCartItem(userId, _id));
  };

  return (
    <>
      <Card className={classes.root} variant="outlined">
        <div className={classes.imgCover}>
          <img src={finalImageUrl} height="184" width="180" alt="Item" />
        </div>

        <div className={classes.details}>
          <CardContent>
            <Typography component="h5" variant="h5">
              {title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" noWrap>
              {description}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Rs.{price} x {qty}
            </Typography>

            <div className={classes.buttons}>
              <IconButton onClick={handleReduceItem}>
                <RemoveIcon style={{ color: "#f44336" }} />
              </IconButton>
              <IconButton onClick={handleAddItem}>
                <AddIcon style={{ color: "green" }} />
              </IconButton>
              <IconButton onClick={handleDeleteItem}>
                <DeleteIcon style={{ color: "#f44336" }} />
              </IconButton>
            </div>
            <Typography variant="body1" color="textSecondary" className={classes.itemTotal}>
              Total Rs. {price * qty}
            </Typography>
          </CardContent>
        </div>
      </Card>
      <br />
    </>
  );
}

export default CartItem;
