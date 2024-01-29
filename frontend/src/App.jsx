import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from "./Pages/Home";
import ProductListPage from "./Pages/ProductListPage";
import ProductDetailPage from "./Pages/ProductDetailPage";
import CartPage from "./Pages/CartPage";
import LoginPage from "./Pages/LoginPage";
import ShippingPage from "./Pages/ShippingPage";
import PaymentPage from "./Pages/PaymentPage";
import PlaceorderPage from "./Pages/PlaceorderPage";
import OrderPage from "./Pages/OrderPage";
import ProfilePage from "./Pages/ProfilePage";
import RegisterPage from "./Pages/RegisterPage";
import UserListPage from "./Pages/UserListPage";

const App = () => {
  return (
    <Router>
        <Header />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/products" Component={ProductListPage} />
          <Route path="/product/:id" Component={ProductDetailPage} />
          <Route path="/cart/:id?" Component={CartPage} />
          <Route path="/shipping" Component={ShippingPage} />
          <Route path="/payment" Component={PaymentPage} />
          <Route path="/placeorder" Component={PlaceorderPage} />
          <Route path="/order/:id" Component={OrderPage} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/admin/users" Component={UserListPage} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default App