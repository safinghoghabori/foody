import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemDialog from "../components/ItemDialog";
import { deleteItem, editItem } from "../redux/actions/sellerAction";

//m-ui
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// Toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    width: 328,
    height: 200,
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },

  cover: {
    height: 200,
  },
  cardImg: {
    height: "100%",
    width: "50%",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function ItemCart(props) {
  const classes = useStyles();
  const { title, price, description, image, _id } = props;

  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [editItemData, setEditItemData] = useState({
    title: "",
    price: "",
    description: "",
  });

  //convert image url to acceptable formate
  // if (image) {
  //   const imageUrlSplit = image.split("\\");
  //   var finalImageUrl = `http://localhost:5000/${imageUrlSplit[0]}/${imageUrlSplit[1]}`;
  // }

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.seller);

  const handleInputChange = (e) => {
    setEditItemData({
      ...editItemData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    setImageUrl(e.target.files[0]);
  };

  const openEdit = () => {
    editItemData.title = title;
    editItemData.price = price;
    editItemData.description = description;
    setOpen(true);
  };

  const handleClose = () => {
    setEditItemData({
      title: "",
      price: "",
      description: "",
    });
    setImageUrl(null);
    setOpen(false);
  };

  const handleSubmit = () => {
    //check for error
    if (!editItemData.title || !editItemData.description || !editItemData.price) {
      if (error) return toast.error(`${error}`, { position: "bottom-right" });
    }

    const itemData = new FormData();
    if (imageUrl !== null) {
      itemData.append("itemImage", imageUrl); //append new image if its changed
    } else {
      itemData.append("itemImage", image); //append old image if it isnt changed
    }
    itemData.append("title", editItemData.title);
    itemData.append("price", editItemData.price);
    itemData.append("description", editItemData.description);

    //dispatch an action to add item(with itemData and sellerId)
    dispatch(editItem(itemData, _id));
    handleClose();
  };

  const handleDelete = () => {
    dispatch(deleteItem(_id));
  };

  return (
    <>
      <Grid item container xs={12} sm={6} md={4} justify="center">
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5" style={{textTransform:'capitalize'}}>
                {title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Rs. {price}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary"  style={{textTransform:'capitalize'}}>
                {description}
              </Typography>
            </CardContent>
            <div className={classes.controls}>
              <IconButton onClick={openEdit}>
                <EditIcon style={{ color: "green" }} />
              </IconButton>{" "}
              <IconButton onClick={handleDelete}>
                <DeleteIcon style={{ color: "#f44336" }} />
              </IconButton>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <div className={classes.cardImg}>
            <img src={`/${image}`} className={classes.cover} />
          </div>
        </Card>
      </Grid>

      {/* Edit item dialog */}
      <ItemDialog
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        handleImage={handleImage}
        editItemData={editItemData}
        handleInputChange={handleInputChange}
      />
    </>
  );
}

export default ItemCart;
