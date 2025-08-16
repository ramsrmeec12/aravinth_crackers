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
import AboutUs from "./components/Aboutus";
import ContactUs from "./components/Contact";
import CombosPage from "./pages/CombosPage";
import ComboDetailsPage from "./pages/ComboDetailsPage";


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
      <Route path="/about" element={<AboutUs></AboutUs>}></Route>
      <Route path="/contact" element={<ContactUs></ContactUs>}></Route>
       <Route path="/product/:id" element={<ProductDetails />} />
       <Route path="/combos" element={<CombosPage />} />
       <Route path="/combo/:id" element={<ComboDetailsPage />} />
       
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