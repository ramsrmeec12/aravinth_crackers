import FeaturedProducts from "../components/Featuredproducts";
import { useNavigate } from 'react-router-dom';
import OurProducts from "../components/ourproducts";


export default function DeepavaliDelights() {

    const navigate = useNavigate();
    return (
        <div className="font-serif bg-[#fdfaf5] text-[#2c2c2c]">

            {/* Hero Section */}
            <div className="flex justify-center py-5 px-4 sm:px-8 lg:px-20">
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


            

            <FeaturedProducts></FeaturedProducts>
            <OurProducts></OurProducts>


            
        </div>
    );
}
