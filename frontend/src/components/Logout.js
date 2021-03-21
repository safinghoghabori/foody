import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
import { logoutSeller } from "../redux/actions/sellerAction";

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userLogin } = useSelector((state) => state.user);
  const { sellerLogin } = useSelector((state) => state.seller);

  if (userLogin) {
    dispatch(logoutUser(history));
  }
  if (sellerLogin) {
    dispatch(logoutSeller(history));
  }

  return <></>;
};

export default Logout;
