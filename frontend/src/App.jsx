// /* eslint-disable */
// import { useEffect, useState } from "react"

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./Pages/Home";
import ProductListPage from "./Pages/ProductListPage";

const App = () => {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/products" Component={ProductListPage} />
          {/* <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} /> */}
        </Routes>
        <Footer />
    </Router>
  )
}

export default App