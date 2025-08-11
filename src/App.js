import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DeepavaliDelights from "./pages/homepage";
import ProductsPage from "./pages/ProductsPage";
import Navbar from "./components/Navbar";

function App() {
  return (<Router>
    <Navbar></Navbar>
    <Routes>
      <Route path="/" element={<DeepavaliDelights />} />
      <Route path="/products" element={<ProductsPage />} />
    </Routes>
  </Router>)
}

export default App;