import HomeScreen from "./pages/HomeScreen";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";
import UserSignup from "./pages/UserSignup";
import UserSignin from "./pages/UserSignin";
import { Provider } from "react-redux";
import store from "./redux/store";
import Logout from "./pages/Logout";
import Restaurant from "./pages/Restaurant";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import SellerSignup from "./pages/SellerSignup";
import SellerSignin from "./pages/SellerSignin";
import SellerDashboard from "./pages/SellerDashboard";
import NewUserPasswordForm from "./pages/NewUserPasswordForm";
import Login from "./components/Admin/Login";
import AllRestaurants from "./components/Admin/AllRestaurants";
import NewSellerPasswordForm from "./pages/NewSellerPasswordForm";
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

              <Route path="/logout">
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
