import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

//Material-ui
import { Divider, IconButton, Paper } from "@material-ui/core";
import { MyLocation } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(0),
      width: "100%",
    },
  },
  searchBar: {
    padding: "15px",
    width: "50%",
    // transform: "rotate(358deg)",
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function SearchBar(props) {
  const classes = useStyles();

  const handleSearch = (e) => {
    props.handleSearch(e.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="on">
      <input
        type="text"
        className={classes.searchBar}
        placeholder="Search for available restaurants..."
        style={{ border: "2px solid black" }}
        onChange={handleSearch}
      />
      {/* <Divider orientation="vertical" flexItem style={{ color: "red" }} />
        <IconButton color="primary" className={classes.iconButton} aria-label="directions">
          <MyLocation />
        </IconButton> */}
    </form>
  );
}

export default SearchBar;
