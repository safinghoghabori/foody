import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import searchIcon from "../images/searchIcon.png";

//Material-ui

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
    border: "2px solid black",
    background: `url(${searchIcon}) no-repeat 100%`,
    backgroundPosition: "9px 10px",
    backgroundSize: 26,
    paddingLeft: 40,
    backgroundColor: "#f4f4f4",
    borderRadius: 5,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },

  inputContainer: {
    position: "relative",
  },
}));

function SearchBar(props) {
  const classes = useStyles();

  const handleSearch = (e) => {
    props.handleSearch(e.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="on">
      <div className={classes.inputContainer}>
        {/* <img src={searchIcon} height="50px" width="50px" /> */}
        <input
          type="text"
          className={classes.searchBar}
          placeholder="Search for available restaurants..."
          onChange={handleSearch}
        />
      </div>
    </form>
  );
}

export default SearchBar;
