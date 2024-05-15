import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import OrderListPage from "./pages/OrderListPage";
import OrderPage from "./pages/OrderPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProductEditPage from "./pages/ProductEditPage";
import ProductListAdminPage from "./pages/ProductListAdminPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ShippingPage from "./pages/ShippingPage";
import UserEditPage from "./pages/UserEditPage";
import UserListPage from "./pages/UserListPage";

const App = () => {
  return (
    <Router>
        <ToastContainer hideProgressBar position='bottom-right'/>
        <Navbar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/product/:id" Component={ProductDetailPage} />
          <Route path="/cart/:id?" Component={CartPage} />
          <Route path="/shipping" Component={ShippingPage} />
          <Route path="/payment" Component={PaymentPage} />
          <Route path="/placeorder" Component={PlaceOrderPage} />
          <Route path="/order/:id" Component={OrderPage} />
          <Route path="/profile" Component={ProfilePage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/login" Component={LoginPage} />

          <Route path="/admin/users" Component={UserListPage} />
          <Route path="/admin/user/:id/edit" Component={UserEditPage} />
          <Route path='/admin/productlist' Component={ProductListAdminPage} />
          <Route path='/admin/product/:id/edit' Component={ProductEditPage} />
          <Route path='/admin/orderlist' Component={OrderListPage} />
        </Routes>
        <Footer />
    </Router>
  )
}

export default App
