import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useLocation
} from "react-router-dom";
import "./App.css";
import Signup from "./components/Signup";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import ChangePassword from "./components/ChangePassword";
import Todo from "./components/Todo";
import ForgotPassword from "./components/ForgotPassword";
import CreateTodo from "./components/CreateTodo";
import EditProfile from "./components/EditProfile";
import VerifyUserAccount from "./components/VerifyUserAccount";
import IndividualTodo from "./components/IndividualTodo";
import ShowNotVerified from "./components/VerifyAccount";
import EditTodo from "./components/EditTodo";
import Profile from "./components/Profile";
import IndexPage from "./components/IndexPage";
import PrivateRoute from "./components/PrivateRoute";
import Paystack from "./components/Paystack";

function App() {
  // i'm getting the exact location that we are in using this method useLocation();

  const location = useLocation();

  //in the background variable, i'm checking if the state has been added to the location object, if yes, it sets the background to the state.bacground value.

  const background = location.state && location.state.background;

  return (
    <div>
      {/* // whenever location is added to Switch, it prevents the path from
      working. so in the location props i'm adding the background to it if the
      background has a value else the location. */}
      <Switch location={background || location}>
        <Route exact={true} path="/" children={<IndexPage />} />
        <Route exact={true} path="/signup" children={<Signup />} />
        <Route exact={true} path="/login" children={<Login />} />
        <Route exact={true} path="/unverified" children={<ShowNotVerified />} />

        <PrivateRoute exact={true} path="/todos" children={<Todo />} />
        <Route
          exact={true}
          path="/forgotPassword"
          children={<ForgotPassword />}
        />
        <PrivateRoute
          exact={true}
          path="/edit_profile"
          children={<EditProfile />}
        />
        <Route
          exact={true}
          path="/password/:id"
          children={<ChangePassword />}
        />
        <Route
          exact={true}
          path="/user/:email/:token"
          children={<VerifyUserAccount />}
        />

        <Route children={<ErrorPage />} />
      </Switch>
      {background && (
        <PrivateRoute
          exact={true}
          path="/todo/edit/:id"
          children={<EditTodo />}
        />
      )}

      {background && (
        <PrivateRoute
          exact={true}
          path="/todo/:id"
          children={<IndividualTodo value={1} />}
        />
      )}
      {background && (
        <PrivateRoute exact={true} path="/profile" children={<Profile />} />
      )}

      {background && (
        <PrivateRoute
          exact={true}
          path="/todos/new"
          children={<CreateTodo />}
        />
      )}

      {background && (
        <PrivateRoute exact={true} path="/fund" children={<Paystack />} />
      )}
    </div>
  );
}

const MainRoutes = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default MainRoutes;
