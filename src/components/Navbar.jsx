import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; // ✅ Import cart context
import logo from "../assets/logo.png";
import productsData from "../data";
import { useAuth } from "../context/AuthContext";
import { getAuth, signOut } from "firebase/auth";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const { user, logout } = useAuth();

  const { cartCount } = useCart(); // ✅ Get cart count from context
  const auth = getAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Optionally, redirect or update UI after logout
      window.location.href = "/login"; // or use react-router navigate
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

 useEffect(() => {
  if (searchTerm.trim() === "") {
    setFilteredResults([]);
  } else {
    const results = productsData.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) // ✅ match by ID
    );
    setFilteredResults(results);
  }
}, [searchTerm]);


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
      setFilteredResults([]);
    }
  };

  const handleResultClick = (productName) => {
    setSearchTerm(productName);
    navigate(`/products?search=${encodeURIComponent(productName)}`);
    setFilteredResults([]);
    setIsOpen(false);
  };

  return (
    <header className="border-b border-gray-200">
      <div className="flex justify-between items-center py-1 px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <a href="/">
            <img src={logo} alt="Aravind Crackers Logo" className="h-24 w-auto" />
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="about">About Us</a>
          <a href="contact">Contact</a>
        </nav>

        {/* Search bar Desktop */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden md:flex flex-col items-start relative"
          style={{ minWidth: "220px" }}
        >
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-l px-3 py-1 text-sm outline-none w-full"
              ref={searchRef}
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-yellow-400 px-3 py-1 rounded-r text-sm font-semibold"
            >
              Search
            </button>
          </div>

          {filteredResults.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-t-0 max-h-60 overflow-auto z-50 rounded-b shadow-md">
              {filteredResults.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleResultClick(product.name)}
                  className="cursor-pointer px-3 py-2 hover:bg-yellow-100"
                >
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </form>

        {/* Right side icons */}
        <div className="flex items-center gap-4 relative">
          {user ? (
            <button
              onClick={() => navigate("/orders")}
              className="px-3 py-1 bg-green-500 rounded text-sm font-medium"
            >
              My Orders
            </button>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-3 py-1 bg-yellow-400 rounded text-sm font-medium"
            >
              Login
            </button>
          )}

          {/* Cart Icon with Count */}
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <form
        onSubmit={handleSearchSubmit}
        className="md:hidden px-12 pb-2 relative"
        style={{ maxWidth: "100%" }}
        autoComplete="off"
      >
        <div className="flex">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-l px-3 py-1 text-sm outline-none w-full"
            ref={searchRef}
          />
          <button
            type="submit"
            className="bg-yellow-400 px-3 py-1 rounded-r text-sm font-semibold"
          >
            Search
          </button>
        </div>

        {filteredResults.length > 0 && (
          <ul className="absolute top-full left-0 right-0 bg-white border border-t-0 max-h-60 overflow-auto z-50 rounded-b shadow-md">
            {filteredResults.map((product) => (
              <li
                key={product.id}
                onClick={() => handleResultClick(product.name)}
                className="cursor-pointer px-8 py-2 hover:bg-yellow-100"
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </form>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden pt-2 px-4 pb-4 space-y-3 text-sm font-medium bg-white shadow-md rounded">
          <a href="/" className="block" onClick={() => setIsOpen(false)}>Home</a>
          <a href="/products" className="block" onClick={() => setIsOpen(false)}>Products</a>
          <a href="about" className="block" onClick={() => setIsOpen(false)}>About Us</a>
          <a href="contact" className="block" onClick={() => setIsOpen(false)}>Contact</a>

          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full text-left text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
