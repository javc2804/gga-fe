import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Updated import
import "./App.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />{" "}
          <Route path="/register" element={<Register />} />{" "}
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
