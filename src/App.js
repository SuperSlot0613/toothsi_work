import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Component/JS/Home";
import Header from "./Component/JS/Header";
import ProductCheckout from "./Component/JS/ProductCheckout";
import FinishPage from "./Component/JS/FinishPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/cart/checkout" index element={<ProductCheckout />} />
          <Route path="/thankyou" index element={<FinishPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
