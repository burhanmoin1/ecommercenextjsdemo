'use client';
import Link from "next/link";
import { useRef, useState } from "react";

const ItemsHeader = () => {
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = (item: string) => {
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = null;
        }
        setHoveredItem(item);
    };

    const handleMouseLeave = () => {
        closeTimeoutRef.current = setTimeout(() => {
            setHoveredItem(null);
        }, 300);
    };

    return (
        <header className="fixed hidden 2xl:block xl:block lg:block top-4 mt-14 bg-white border-gray-200 border-b w-full z-20">
        <div className='hidden ml-24 2xl:flex xl:flex lg:flex md:flex sm:flex md:text-md'>
            {['Food Cupboard', 'Health & Beauty'].map((item, index) => (
                <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(item)}
                    onMouseLeave={handleMouseLeave}
                >
                    <Link href={`/products/${item}`}>
                        <p className={`p-8 text-black cursor-pointer font-semibold transition-opacity duration-300 ${hoveredItem === item ? 'opacity-50' : 'opacity-100'}`}>
                            {item}
                        </p>
                    </Link>
                    {/* Underline */}
                    <div
                        className={`absolute bottom-0 left-5 w-[80%] h-1 bg-black transition-transform duration-300 ${hoveredItem === item ? 'scale-x-100' : 'scale-x-0'} origin-left`}
                    ></div>
                </div>
            ))}
            {/* Dropdown container */}
            <div className="absolute top-full w-[90%] mt-1 z-100">
                {/* Services dropdown */}
                {hoveredItem === 'Food Cupboard' && (
                    <div
                        className="bg-white shadow-lg rounded-lg h-40 overflow-hidden z-100"
                        onMouseEnter={() => handleMouseEnter('Food Cupboard')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="flex p-4">
                            <Link href="/products/Chocolate">
                                <p className="px-4 py-2 hover:underline cursor-pointer">Chocolate</p>
                            </Link>
                            <Link href="/products/Candies,-Gums-&-Mints">
                                <p className="px-4 py-2 hover:underline cursor-pointer">Candies, Gums & Mints
                                </p>
                            </Link>
                        </div>
                    </div>
                )}
                {/* Products dropdown */}
                {hoveredItem === 'Health & Beauty' && (
                    <div
                        className="bg-white shadow-lg rounded-lg h-40 overflow-hidden z-100"
                        onMouseEnter={() => handleMouseEnter('Health & Beauty')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className="flex p-4">
                            <Link href="/products/Face-&-Skin-Care">
                                <p className="px-4 py-2 hover:underline cursor-pointer">Face & Skin Care</p>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </header>
    );
};

export default ItemsHeader;
