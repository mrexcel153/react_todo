import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configStore from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import "react-app-polyfill/ie9";
import "react-app-polyfill/stable";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configStore();

const Root = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={"Loading...."} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
ReactDOM.render(<Root />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
