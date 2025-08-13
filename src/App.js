import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DeepavaliDelights from "./pages/homepage";
import ProductsPage from "./pages/ProductsPage";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import Orders from "./pages/Orders";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./pages/admin/AdminLayout";
import OrdersAdminPage from "./pages/admin/OrdersAdminPage";
import SignUpPage from "./pages/SignUpPage";
import ProductDetails from "./pages/ProductDetails";
import Footersec from "./components/Footer";



function App() {
  return (<Router>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<DeepavaliDelights />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/cart" element={<CartPage></CartPage>}></Route>
      <Route path="/login" element={<LoginPage></LoginPage>}></Route>
      <Route path="/orders" element={<Orders></Orders>}></Route>
      <Route path="/signup" element={<SignUpPage />} />
       <Route path="/product/:id" element={<ProductDetails />} />
      Admin section
      <Route path="/admin" element={
        <AdminRoute>
          <AdminLayout />
        </AdminRoute>
      }>
        <Route index element={<OrdersAdminPage />} />
        <Route path="orders" element={<OrdersAdminPage />} />
        {/* add more admin subroutes here */}
      </Route>
    </Routes>
    <Footersec></Footersec>
  </Router>)
}

export default App;