import { Helmet } from "react-helmet-async";
import FeaturedProducts from "../components/Featuredproducts";
import { useNavigate } from 'react-router-dom';
import OurProducts from "../components/ourproducts";
import Advertisement from "../components/Advertisement";

export default function DeepavaliDelights() {
    const navigate = useNavigate();

    return (
        <div className="font-serif bg-[#fdfaf5] text-[#2c2c2c]">
            
            <Helmet>
                <title>Buy Crackers Online | Aravinth Crackers – Diwali 2025</title>
                <meta
                    name="description"
                    content="Shop Diwali crackers online at Aravinth Crackers – Flower Pots, Ground Chakkars, Rockets, Sparklers & eco-friendly fireworks with safe delivery."
                />
                <meta
                    name="keywords"
                    content="buy crackers online, Diwali crackers, Aravinth Crackers, sparklers, flower pots, ground chakkars, rockets, eco-friendly crackers"
                />
                <meta property="og:title" content="Aravinth Crackers – Buy Crackers Online for Diwali" />
                <meta
                    property="og:description"
                    content="Celebrate Diwali 2025 with Aravinth Crackers – Safe, affordable, eco-friendly crackers. Order online & enjoy fast delivery!"
                />
                <meta property="og:image" content="https://aravinthcrackers.in/static/media/logo.69a2386f94a3d96e8836.png" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://aravinthcrackers.in/" />
            </Helmet>

            <Advertisement />

            {/* Hero Section */}
            <div className="flex justify-center py-5 ">
                <div className="flex flex-col w-full max-w-[960px]">
                    <div className="p-4">
                        <div
                            className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center rounded-lg items-center justify-center p-4"
                            style={{
                                backgroundImage:
                                    'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url(https://lh3.googleusercontent.com/aida-public/AB6AXuCAsE3c_gINdsWyx5oiZnZxD4frC5qJSHDUvp1PqGn2Ubo4PNEoHBWVjEI5Y3sHliVs_jta_diD-0-uQ-rAm0ppC9qgY2rVWZtwotW6wiqqzIH5o24UxDbyOMSJy5vAWlb6z-q7ZHrUEzGHHksS-5asKu5Kgp2i8iph67WXGvTN0ZOnlLzGiDq2jaObKe2Tch3PHbOPubDkbIEhT2iBJerF4fZZ3zkeNi2ulu7IZ1VIhQuTxKlrl0wXdOszyJE1_As3O1Sk6Qjie7Q)'
                            }}
                        >
                            <div className="flex flex-col gap-2 text-center px-2">
                                <h1 className="text-white text-3xl sm:text-4xl font-black leading-tight">
                                    Aravinth Crackers
                                </h1>
                                <h2 className="text-white text-sm sm:text-base font-normal">
                                    Illuminating your celebrations with joy and tradition
                                </h2>
                            </div>
                            <button
                                onClick={() => navigate('/products')}
                                className="h-12 px-5 rounded-lg bg-[#fac638] text-[#1c180d] font-bold"
                            >
                                Explore Products
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <FeaturedProducts />
            <OurProducts />
        </div>
    );
}
