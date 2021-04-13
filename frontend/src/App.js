import HomeScreen from "./components/HomeScreen";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import UserSignup from "./components/UserSignup";
import UserSignin from "./components/UserSignin";
import { Provider } from "react-redux";
import store from "./redux/store";
import Logout from "./components/Logout";
import Restaurant from "./components/Restaurant";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import SellerSignup from "./components/SellerSignup";
import SellerSignin from "./components/SellerSignin";
import SellerDashboard from "./components/SellerDashboard";
import NewUserPasswordForm from "./components/NewUserPasswordForm";
import Login from "./components/Admin/Login";
import AllRestaurants from "./components/Admin/AllRestaurants";
import NewSellerPasswordForm from "./components/NewSellerPasswordForm";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <ScrollToTop>
            <Switch>
              <Route path="/" exact>
                <HomeScreen />
              </Route>

              <Route path="/userSignup">
                <UserSignup />
              </Route>

              <Route path="/userSignin">
                <UserSignin />
              </Route>

              <Route path="/userLogout">
                <Logout />
              </Route>

              <Route path="/restaurant/:id">
                <Restaurant />
              </Route>

              <Route path="/cart">
                <Cart />
              </Route>

              <Route path="/orders">
                <Orders />
              </Route>

              <Route path="/sellerSignup">
                <SellerSignup />
              </Route>

              <Route path="/sellerSignin">
                <SellerSignin />
              </Route>

              <Route path="/seller/dashboard">
                <SellerDashboard />
              </Route>

              <Route path="/new-user-password/:token">
                <NewUserPasswordForm />
              </Route>

              <Route path="/new-seller-password/:token">
                <NewSellerPasswordForm />
              </Route>

              <Route path="/admin/login">
                <Login />
              </Route>
              <Route path="/admin/allRestaurants">
                <AllRestaurants />
              </Route>
            </Switch>
          </ScrollToTop>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
