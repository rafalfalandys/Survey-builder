import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

// @ts-expect-error xxx
ReactDOM.render(app, document.getElementById("root"));
