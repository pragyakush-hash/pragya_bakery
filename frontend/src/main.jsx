import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { setTokenGetter, setStoreRef } from "./utils/axiosConfig.js";
import { ToastContainer } from "react-toastify";

// Set up token getter for axios interceptor
setTokenGetter(() => {
  const state = store.getState();
  return state.auth.userToken;
});

// Set store reference for axios interceptor (to avoid circular dependency)
setStoreRef(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position="top-right" theme="colored" />
      <App />
    </Provider>
  </StrictMode>
);
