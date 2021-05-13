import { useEffect } from "react";
import { withRouter } from "react-router-dom";

/* This is User Define Component to automatically scroll top in each components when Component render */
const ScrollToTop = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollToTop);
