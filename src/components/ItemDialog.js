import React from "react";
import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  button: {
    backgroundColor: theme.palette.primary.main,
    color: "white",
    width: "40%",
    margin: "40px 0 0 30%",
    "&:hover": {
      backgroundColor: "#5a5c5a",
    },
  },
}));

function ItemDialog(props) {
  const classes = useStyles();
  const { open, handleClose, handleSubmit, editItemData, handleImage, handleInputChange } = props;

  const { error } = useSelector((state) => state.seller);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Enter details</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            name="title"
            label="Title"
            placeholder="Name of your Item"
            className={classes.textField}
            value={editItemData.title}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="description"
            label="Description"
            placeholder="Spicy, non-veg, Basil leaves"
            className={classes.textField}
            value={editItemData.description}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            name="price"
            label="Price"
            placeholder="Price of your Item"
            className={classes.textField}
            type="number"
            value={editItemData.price}
            onChange={handleInputChange}
            fullWidth
          />
          <Typography variant="body2" component="p" style={{ margin: "10px 10px 2px 10px" }}>
            Select an Image:
          </Typography>
          <input
            accept="image/*"
            className={classes.uploadImages}
            id="raised-button-file"
            type="file"
            onChange={handleImage}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} style={{ color: "#c70f02" }}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ItemDialog;
