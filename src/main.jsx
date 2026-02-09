 import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store"; // ✅ make sure path matches
import AppRouter from "./routes/AppRoutes"; // ✅ matches file name
 import "./index.css"; // ✅ make sure this is here

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>
);
