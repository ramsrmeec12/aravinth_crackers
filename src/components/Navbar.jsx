import { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.png'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="border-b border-gray-200">
            <div className="flex justify-between items-center py-1 px-4 sm:px-6">
                {/* Logo */}
                <div className="flex items-center gap-2">
                    
                    <div className="flex items-center gap-2">
                        <a href="/">
                            <img
                                src={logo}  // adjust path as needed
                                alt="Aravind Crackers Logo"
                                className="h-24 w-auto"  // adjust size as needed
                            />
                        </a>
                    </div>

                </div>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <a href="#">Home</a>
                    <a href="#">Products</a>
                    <a href="#">About Us</a>
                    <a href="#">Contact</a>
                </nav>

                {/* Right side icons */}
                <div className="flex items-center gap-4">
                    <ShoppingCart className="w-5 h-5 cursor-pointer" />
                    <button
                        className="md:hidden"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-3 text-sm font-medium">
                    <a href="#" className="block">Home</a>
                    <a href="#" className="block">Products</a>
                    <a href="#" className="block">About Us</a>
                    <a href="#" className="block">Contact</a>
                </div>
            )}
        </header>
    );
}
