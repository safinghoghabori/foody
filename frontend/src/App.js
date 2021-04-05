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
import NewPasswordForm from "./components/NewPasswordForm";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
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
              <NewPasswordForm />
            </Route>
          </Switch>
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
