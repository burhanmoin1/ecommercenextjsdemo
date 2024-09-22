'use client'; // Ensure this is a Client Component
import Image from 'next/image';
import searchIcon from '@/app/assets/icons/icons8-search-64.png'; // Update path as needed
import bellIcon from '@/app/assets/icons/icons8-bell-24.png'; // Update path as needed
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import homeicon from '@/app/assets/icons/icons8-home-32.png';
import inventoryicon from '@/app/assets/icons/icons8-tag-50.png';
import ordersicon from '@/app/assets/icons/icons8-order-50.png';
import analyticsicon from '@/app/assets/icons/icons8-sales-50.png';
import { usePathname } from 'next/navigation';  // Use usePathname from next/navigation
import axios from 'axios';  // Import axios for API requests

const HeaderBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();  // Get the current path

  const isActive = (path: string) => {
    return pathname === path
      ? 'bg-[rgb(236,236,236)] border-4 border-r-[#262626]' // Active link style
      : '';  // Default link style
  };

  const handleSearchChange = async (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value) {
      try {
        // Fetch products from API based on search term
        const response = await axios.get('http://127.0.0.1:8000/api/products/search/', {
          params: { q: value }
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on the main page when the menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling on the main page when the menu is closed
      document.body.style.overflow = '';
    }

    // Cleanup on component unmount or when the drawer is closed
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="flex items-center justify-between p-2 lg:p-8 h-16 bg-black fixed top-0 left-0 w-full z-50">
      {/* Seller Dashboard */}
      <div className="text-lg hidden 2xl:flex lg:flex lg:text-2xl md:flex  text-white ml-4 2xl:ml-88">
        Dashboard
      </div>
      {/* Hamburger Menu, search, profile icon and bell for Mobile, md and sm */}
      <div className="flex items-center space-x-4">
        {/* Hamburger Menu for Mobile, md and sm */}
        <div className="flex items-center pl-4 2xl:hidden xl:hidden lg:hidden md:hidden sm:flex">
          <button 
            onClick={toggleMenu} 
            className="relative w-6 h-4 flex flex-col justify-between items-center"
          >
            <motion.div
              className="w-6 h-0.5 bg-white"
              animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0, backgroundColor: isOpen ? 'black' : 'white' }} // Adjust y values as needed
              transition={{ duration: 0.3 }}
              style={{ zIndex: 50 }} // Ensure the line appears on top
            />
            <motion.div
              className="w-6 h-0.5 bg-white"
              animate={{ opacity: isOpen ? 0 : 1, backgroundColor: isOpen ? 'black' : 'white' }}
              transition={{ duration: 0.3 }}
              style={{ zIndex: 50 }} // Ensure the line appears on top
            />
            <motion.div
              className="w-6 h-0.5"
              animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -10 : 0, backgroundColor: isOpen ? 'black' : 'white'  }} // Adjust y values as needed
              transition={{ duration: 0.3 }}
              style={{ zIndex: 50 }} // Ensure the line appears on top
            />
          </button>
          <motion.div
            className="fixed inset-0 bg-black z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 0.5 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }} // Prevents interaction with the background when closed
          />
          {/* Menu Drawer for Mobile, md and sm */}
          <div className={`fixed top-0 left-0 w-full h-full z-30 ${isOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}>
            {/* This div will close the sidebar when clicked */}
            <motion.div
              className="fixed top-0 left-0 h-full w-[60%] md:w-[40%] shadow-md bg-white text-black flex flex-col pt-16 overflow-auto z-40"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '-100%' }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()} // Prevents the click from propagating to the outer div
            >
            {/* Items */}
            <div className="flex flex-col items-start">
              <Link href="/admin/home" className={`block cursor-pointer py-4 px-4 w-full border-4 border-white hover:opacity-65 mt-2 ${isActive('/')}`}>
                <li className="flex items-center">
                  <Image src={homeicon.src} alt="homeicon" width={16} height={16} className="m-1 mr-2" /> 
                  <span className="text-base">Home</span>
                </li>
              </Link>

              <Link href="/admin/orders" className={`block cursor-pointer py-4 px-4 w-full border-4 border-white hover:opacity-65 mt-2 ${isActive('/orders')}`}>
                <li className="flex items-center">
                  <Image src={ordersicon.src} alt="homeicon" width={16} height={16} className="m-1 mr-2" /> 
                  <span className="text-base">Orders</span>
                </li>
              </Link>

              <Link href="/admin/products" className={`block cursor-pointer py-4 px-4 w-full border-4 border-white hover:opacity-65 mt-2 ${isActive('/products')}`}>
                <li className="flex items-center">
                  <Image src={inventoryicon.src} alt="homeicon" width={16} height={16} className="m-1 mr-2" /> 
                  <span className="text-base">Products</span>
                </li>
              </Link>

              <Link href="/admin/analytics" className={`block cursor-pointer py-4 px-4 w-full border-4 border-white hover:opacity-65 mt-2 ${isActive('/analytics')}`}>
                <li className="flex items-center">
                  <Image src={analyticsicon.src} alt="homeicon" width={16} height={16} className="m-1 mr-2" /> 
                  <span className="text-base">Analytics</span>
                </li>
              </Link>
          
            </div>
          </motion.div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative items-center flex 2xl:pr-0 sm:pr-40">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search"
            className="border-[#4b4848] border-2 rounded-2xl bg-[#262626] text-white p-2 pl-8 2xl:pl-10 2xl:w-96 lg:w-96 md:w-96  md:pl-10 text-sm lg:text-base focus:outline-none"
          />
          <Image src={searchIcon.src} alt="Search Icon" width={16} height={16} className="absolute left-2 lg:left-3" />
        </div>

         {searchTerm && (
          <div className="absolute top-full right-20 w-full max-w-[60%] bg-white text-black z-50 border border-gray-200 mt-1">
            <ul className="max-h-60 overflow-y-auto">
              {products.length > 0 ? (
                products.map((product: any) => (
                  <li key={product.id}>
                    <Link href={`/admin/products/update/${product.id}`} passHref>
                      <div className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100">
                        {product.name}
                      </div>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="p-2">No results found</li>
              )}
            </ul>
          </div>
        )}

           {/* Notification Bell */}
           <div className="relative ml-2 hover:bg-[#262626] cursor-pointer rounded-full">
          <Image src={bellIcon.src} alt="Notification Bell" width={24} height={16} />
            <span className="absolute -top-1 -right-1 w-4 h-4 lg:h-3 bg-red-500 text-white text-xs  rounded-full flex items-center justify-center">
              3
            </span>
         </div>
           {/* Placeholder Profile Picture */}
           <div className="w-8 lg:w-10 h-8 lg:h-10 hover:opacity-45 cursor-pointer rounded-lg bg-[#25e82b] flex items-center justify-center text-black text-sm lg:text-lg">
          <span>U</span>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
