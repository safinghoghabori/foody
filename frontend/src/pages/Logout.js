import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { logoutSeller } from "../redux/actions/sellerAction";
import { LOGOUT_ADMIN } from "../redux/types";

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.user);
  const { sellerLogin } = useSelector((state) => state.seller);
  const { adminLogin } = useSelector((state) => state.admin);

  if (userLogin) {
    dispatch(logoutUser(history));
  }
  if (sellerLogin) {
    dispatch(logoutSeller(history));
  }
  if (adminLogin) {
    localStorage.removeItem("admin");
    dispatch({ type: LOGOUT_ADMIN });
    history.push("/");
  }

  return <></>;
};

export default Logout;
