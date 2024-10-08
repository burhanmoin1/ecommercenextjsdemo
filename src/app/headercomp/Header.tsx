'use client';
import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import Logo from '@/app/assets/icons/RareTreatsLogo.png';
import downarrow from '@/app/assets/icons/downarrow.png';
import uparrow from '@/app/assets/icons/uparrow.png';
import trashicon from '@/app/assets/icons/trashicon.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toggleCartMenu, removeFromCart, addToCart, decreaseQuantity, incrementQuantity  } from '../redux/slices/cartSlice';
import searchIcon from '@/app/assets/icons/searchblack.png';
import usericon from '@/app/assets/icons/usericon.png';
import carticon from '@/app/assets/icons/carticon.png';
import xicon from '@/app/assets/icons/xicon.png';
import mailicon from '@/app/assets/icons/mailicon.png';
import lockicon from '@/app/assets/icons/lockicon.png';
import plusicon from '@/app/assets/icons/plusicon.png';
import minusicon from '@/app/assets/icons/minusicon.png';
import iconhome from '@/app/assets/icons/iconhome.png';
import iconhairwashing from '@/app/assets/icons/iconhairwashing.png';
import iconcupboard from '@/app/assets/icons/iconcupboard.png';
import iconcleansing from '@/app/assets/icons/iconcleansing.png';
import iconchocolate from '@/app/assets/icons/iconchocolate.png';
import iconcandy from '@/app/assets/icons/iconcandy.png';
import { motion } from 'framer-motion';
import { Product } from '../utils/common';
import Image from 'next/image';
import products from '../utils/common';
import { toggleSearchMenu } from '../redux/slices/searchSlice';

// Folder name fix
const TestTwoHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const mobilesearchInputRef = useRef<HTMLInputElement>(null);
  const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isSearchOpen = useSelector((state: RootState) => state.search.isSearchOpen);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && mobilesearchInputRef.current) {
      mobilesearchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Filter products based on the search query
  const searchedProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  const handleArrowToggle = (section: string) => {
    // If the section clicked is already open, close it. Otherwise, open the clicked section and close the others.
    setActiveSection(prev => (prev === section ? null : section));
  };

  useEffect(() => {
    if (isOpen || isUserOpen || isSearchOpen || isCartOpen) {
      // Disable scrolling on the main page when any of four menu are open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling on the main page when the menu is closed
      document.body.style.overflow = '';
    }

    // Cleanup on component unmount or when the drawer is closed
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, isUserOpen, isSearchOpen, isCartOpen]);

  const toggleUserMenu = () => setIsUserOpen(!isUserOpen);
  const toggleMenu = () => setIsOpen(!isOpen);
  const [isRegister, setIsRegister] = useState(false);

  const handleAddToCart = (product: Product) => {
    const cartItem = { 
      id: product.sku, 
      name: product.name, 
      price: product.selling_price, 
      quantity: 1,
      image: product.image
    };
  
    dispatch(addToCart(cartItem));
    dispatch(toggleCartMenu());
    dispatch(toggleSearchMenu());
  };

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
  };

  const [password, setPassword] = useState('');
  const [requirements, setRequirements] = useState({
    length: false,
    number: false,
    lowercase: false,
    uppercase: false,
    special: false,
  });

  const validatePassword = (password: string) => {
    const newRequirements = {
      length: password.length >= 8,
      number: /[0-9]/.test(password),
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      special: /[!@#$%^&*()_+.]/.test(password),
    };
    setRequirements(newRequirements);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const [scrollTop, setScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
       <div className="bg-black text-white text-center">
          <h2>Free delivery on orders over Rs. 5,000</h2>
        </div>
        <header
        className={`fixed w-full 2xl:p-2 xl:p-2 bg-white border-gray-100 shadow-sm border-b flex items-center ${
          scrollTop ? 'top-0' : 'top-6'
        } transition-all duration-100 z-50`}
      >
      <div className="hidden xl:flex lg:flex md:hidden sm:hidden ml-8 relative z-10">
         {/* Nav logo */}
        <div className='2xl:ml-44'>
          <Link href="/">
            <Image
              src={Logo.src}
              alt="Remote Connect Logo"
              className="2xl:h-12 xl:h-12 lg:h-12 md:h-12 mt-3 ml-2"
              width={280}
              height={180}
            />
          </Link>
        </div>
        
      </div>
       <div className="hidden 2xl:flex xl:flex lg:flex items-center space-x-8 ml-auto mr-24">
        <div className="flex items-center hover:cursor-pointer">

        <div className="relative items-center flex 2xl:mr-8 xl:mr-4 lg:mr-4"
        onClick={() => dispatch(toggleSearchMenu())} >
          <input
            type="text"
            placeholder="Search"
            className="border-[#4b4848] rounded-full bg-[#f5f5f5] text-white px-2 py-2 2xl:pl-10 2xl:w-full md:w-full md:pl-10 text-sm lg:text-base focus:outline-none"
          />
          <Image src={searchIcon.src} alt="Search Icon" width={16} height={16} className="absolute left-2 lg:left-3" />
        </div>
        <motion.div
          className="fixed inset-0 bg-black z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isSearchOpen ? 0.5 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isSearchOpen ? 'auto' : 'none' }} 
          onClick={() => {
            if (isSearchOpen) {
                dispatch(toggleSearchMenu());
            }
        }}
        />
            <motion.div
             className="fixed top-0 right-0 w-full h-[70%] shadow-md bg-white hover:cursor-default text-black flex flex-col pt-8 overflow-auto z-40"
             initial={{ opacity: 0, x: '100%' }}
             animate={{ opacity: isSearchOpen ? 1 : 0, x: isSearchOpen ? 0 : '100%' }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
            <div className='flex flex-col justify-center space-y-2'>
              <div className='flex justify-center space-x-4'>
                <div className="relative flex items-center w-full max-w-5xl 2xl:mr-8 xl:mr-4 lg:mr-4">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    ref={searchInputRef}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border-[#4b4848] border rounded-full bg-[#f5f5f5] text-black px-2 py-2 2xl:pl-10 md:pl-10 text-sm lg:text-base focus:outline-none"
                  />
                  <Image src={searchIcon.src} alt="Search Icon" width={16} height={16} className="absolute left-2 lg:left-3" />
                </div>
                <div className='flex items-center space-x-2 hover:cursor-pointer' onClick={() => dispatch(toggleSearchMenu())} >
                 
                  <Image src={xicon} alt='X icon' width={24} height={24} />
                </div>
              </div>
              {searchQuery !== '' && searchedProducts.length > 0 && (
              <div className='flex justify-center space-x-4'>
                <div className="relative flex items-center w-full max-w-5xl 2xl:mr-8 xl:mr-4 lg:mr-4">
                <h2 className="text-lg">Products:</h2>
                </div>
                <div className='flex items-center space-x-2 hover:cursor-pointer' onClick={() => dispatch(toggleSearchMenu())} >
                 
                <Link href={`/search/${searchQuery}`}>
                      <h2 className="text-lg font-bold cursor-pointer border-b-2 border-black inline-block">
                        View All
                      </h2>
                    </Link>
                </div>
              </div>
              )}
              <div className="flex justify-center items-center min-h-[20vh]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                  {searchQuery === '' ? (
                    <p className="text-center w-full col-span-4">Start typing to search for products...</p>
                  ) : searchedProducts.length > 0 ? (
                    searchedProducts.map((product) => (
                      <div key={product.sku} className="bg-white p-4 rounded text-center hover:cursor-pointer flex flex-col justify-between h-[380px]" >
                         <Link href={`/product/${encodeURIComponent(product.name.replace(/\s+/g, '-'))}`} onClick={() => dispatch(toggleSearchMenu())}>
                        <Image src={product.image} alt={product.name} width={200} height={150} className="mx-auto mb-2" />
                        <h3 className="font-bold">{product.name}</h3>
                        <p className="text-gray-600 mt-2">Rs. {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(product.selling_price)}</p>
                        </Link>
                        <button className='w-[80%] mx-auto block border border-[#3c3f74] px-2 py-2 mt-2 hover:bg-[#3c3f74] hover:text-white'  onClick={() => handleAddToCart(product)}>Add to cart</button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center w-full col-span-4">No products found</p>
                  )}
                </div>
              </div>
              </div>
            </motion.div>
                  
            <Image 
                src={usericon} 
                alt='User Icon' 
                width={22} 
                height={10} 
                className={`hover:cursor-pointer z-30 ${isCartOpen || isSearchOpen ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={toggleUserMenu}
            />

             <motion.div
          className="fixed inset-0 bg-black z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isUserOpen ? 0.5 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isUserOpen ? 'auto' : 'none' }} 
          onClick={() => {
            if (!isCartOpen && !isSearchOpen) {
              toggleUserMenu();
            }
          }}
        />
            <motion.div
             className="fixed top-0 right-0 2xl:w-[26%] xl:w-[20%] h-full shadow-md bg-white text-black flex flex-col pt-10 overflow-auto z-40 hover:cursor-default"
             initial={{ opacity: 0, x: '100%' }}
             animate={{ opacity: isUserOpen ? 1 : 0, x: isUserOpen ? 0 : '100%' }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
              {!isRegister ? (
                <div className='p-4'>
                  <div className='flex justify-between'> 
                  <h2 className='font-bold text-xl'>LOG IN TO ACCESS EVERYTHING</h2>
                  <Image src={xicon} alt='xicon' width={22} 
                      height={10}  className={`hover:cursor-pointer ${isCartOpen || isSearchOpen ? 'opacity-0 pointer-events-none' : ''}`}
                      onClick={toggleUserMenu}
                  /></div>
                  <div className="mb-4 mt-4">
                    <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center border border-gray-400">
                      <Image src={mailicon} alt="Mail Icon" width={20} height={20} className="mx-2" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email Address"
                        className="w-full px-2 py-4 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className='flex justify-between hover:cursor-default'>
                      <label htmlFor="password" className="block font-medium mb-2">Password</label>
                      <h2 className='text-sm hover:cursor-pointer m-0'>Forgot Password?</h2>
                    </div>
                    <div className="flex items-center border border-gray-400">
                      <Image src={lockicon} alt="Lock Icon" width={20} height={20} className="mx-2" />
                      <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        className="w-full px-2 py-4 focus:outline-none"
                      />
                    </div>
                  </div>
                  <button className="w-full mt-4 bg-black text-white font-bold py-2.5 border-black border hover:bg-[#3c3f74]">
                    LOGIN
                  </button>
                  <h2 className='text-sm text-center mt-4'>
                    Don&apos;t have an account? 
                    <span className='underline hover:cursor-pointer ml-2' onClick={toggleForm}>Register</span>
                  </h2>
                </div>
              ) : (
                <div className='p-4'>
                  <h2 className='font-bold text-xl'>REGISTER FOR AN ACCOUNT</h2>
                  <div className="mb-4 mt-10">
                      <label htmlFor="firstName" className="block font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="Enter First Name"
                        className="w-full px-4 py-4 border border-gray-400 focus:outline-none"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="lastName" className="block font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Enter Last Name"
                        className="w-full px-4 py-4 border border-gray-400 focus:outline-none"
                      />
                    </div>

                    <div className="mb-4">
                    <label htmlFor="mobile" className="block font-medium text-gray-700 mb-2">Mobile Number</label>
                    <div className="flex items-center border border-gray-400">
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        placeholder="Enter Mobile Number"
                        className="w-full px-4 py-4 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="registerEmail" className="block font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="flex items-center border border-gray-400">
                      <Image src={mailicon} alt="Mail Icon" width={20} height={20} className="mx-3" />
                      <input
                        type="email"
                        id="registerEmail"
                        name="registerEmail"
                        placeholder="Enter Email Address"
                        className="w-full px-2 py-4 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirmEmail" className="block font-medium text-gray-700 mb-2">Confirm Email</label>
                    <div className="flex items-center border border-gray-400">
                      <Image src={mailicon} alt="Mail Icon" width={20} height={20} className="mx-3" />
                      <input
                        type="email"
                        id="confirmEmail"
                        name="confirmEmail"
                        placeholder="Confirm Email Address"
                        className="w-full px-2 py-4 focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="registerPassword" className="block font-medium mb-2">Password</label>
                    <div className="flex items-center border border-gray-400">
                    <Image src={lockicon} alt="Lock Icon" width={20} height={20} className="mx-3" />
                      <input
                        type="password"
                        id="registerPassword"
                        name="registerPassword"
                        placeholder="Enter Password"
                        value={password}
                        onChange={handlePasswordChange}
                        className={`w-full px-2 py-4 focus:outline-none ${password ? 'border-black' : 'border-gray-400'}`}
                      />
                    </div>
                    <div className='text-sm'>
                    <p className='mt-2 '><span className='font-bold'>Enter a Password </span>- please note that passwords must contain at least:</p>
                    <ul className="list-none list-inside mt-1">
                    <li className="flex items-center mb-1">
                        <div className={`p-2 rounded-full border-2 text-white ${requirements.length ? 'bg-black' : ''}`}></div>
                        <span className='ml-2'>8 characters</span>
                      </li>
                      <li className="flex items-center mb-1">
                          <div className={`p-2 rounded-full border-2 text-white ${requirements.number ? 'bg-black' : ''}`}></div>
                          <span className={`ml-2`}>One number [0-9]</span>
                        </li>
                        <li className="flex items-center mb-1">
                          <div className={`p-2 rounded-full border-2 text-white ${requirements.lowercase ? 'bg-black' : ''}`}></div>
                          <span className={`ml-2`}>One lowercase character [a-z]</span>
                        </li>
                        <li className="flex items-center mb-1">
                          <div className={`p-2 rounded-full border-2 text-white ${requirements.uppercase ? 'bg-black' : ''}`}></div>
                          <span className={`ml-2`}>One uppercase character [A-Z]</span>
                        </li>
                        <li className="flex items-center mb-1">
                          <div className={`p-2 rounded-full border-2 text-white ${requirements.special ? 'bg-black' : ''}`}></div>
                          <span className={`ml-2`}>One special character [!&quot;#$%&amp;&apos;()*+,-./:;&lt;=&gt;?@^_`{}~]</span>
                        </li>
                        </ul>
                        </div>
                      </div>
          
                    <div className="mb-4">
                      <label htmlFor="confirmPassword" className="block font-medium mb-2">Confirm Password</label>
                      <div className="flex items-center border border-gray-400">
                        <Image src={lockicon} alt="Lock Icon" width={20} height={20} className="mx-3" />
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirm Password"
                          className="w-full px-2 py-4 focus:outline-none"
                        />
                      </div>
                    </div>

                  <button className="w-full mt-4 bg-black text-white font-bold py-2.5 border-black border hover:bg-[#3c3f74]">
                    REGISTER
                  </button>
                  <h2 className='text-sm text-center mt-4 mb-10'>
                    Already have an account? 
                    <span className='underline hover:cursor-pointer ml-2' onClick={toggleForm}>Login</span>
                  </h2>
                </div>
              )}
            </div>
              </motion.div>
            </div>
          
            <Image 
                src={carticon}
                alt={'Close Cart' } 
                width={22} 
                height={10} 
                className={`hover:cursor-pointer z-30 ${isUserOpen || isSearchOpen ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={() => dispatch(toggleCartMenu())}
                />
                <div className="relative 2xl:absolute 2xl:top-[1.2rem] 2xl:right-[5.8rem] xl:-top-2 xl:right-[2.5rem] lg:right-[2.5rem] lg:-top-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
                </div>
              <motion.div
              className="fixed inset-0 bg-black z-30 translate-x-[-50px] w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: isCartOpen ? 0.5 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: isCartOpen ? 'auto' : 'none' }}
            />
              <div className={`fixed top-0 left-0 w-full h-full z-30 ${isCartOpen ? 'block' : 'hidden'}`} onClick={() => setIsOpen(false)}>
                </div>
                </div>
            
            {/* Mobile Header */}
            <div className="flex justify-between w-full p-5 2xl:hidden xl:hidden lg:hidden md:flex sm:flex">
            
                {/* Hamburger Menu */}
              <div className={`flex items-center ${isCartOpen ? 'hidden' : 'block'} ${isSearchOpen ? 'opacity-0' : '' }`}>
                <button 
                  onClick={toggleMenu} 
                  className="relative w-6 h-4 flex flex-col justify-between items-center"
                >
                  <motion.div
                    className="w-6 h-0.5 bg-black"
                    animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ zIndex: 50 }}
                    onClick={() => {
                      if (isOpen) {
                        setIsOpen(false)
                      }
                  }}
                  />
                  <motion.div
                    className="w-6 h-0.5 bg-black"
                    animate={{ opacity: isOpen ? 0 : 1 }}
                    transition={{ duration: 0.2 }}
                    style={{ zIndex: 50 }}
                  />
                  <motion.div
                    className="w-6 h-0.5 bg-black"
                    animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -10 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ zIndex: 50 }}
                    onClick={() => {
                      if (isOpen) {
                        setIsOpen(false)
                      }
                  }}
                  />
                </button>
          
              <motion.div
              className="fixed inset-0 bg-black z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 0.5 : 0 }}
              transition={{ duration: 0.2 }}
              style={{ pointerEvents: isOpen ? 'auto' : 'none' }} 
              onClick={() => {
                if (isOpen) {
                  setIsOpen(false)
                }
            }}
            />
          
            <motion.div
             className="fixed top-0 left-0 h-full w-[64%] md:w-[40%] shadow-md bg-white text-black flex flex-col pt-16 overflow-auto z-40"
             initial={{ opacity: 0, x: '-100%', display: 'hidden'  }}
             animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : '-100%',  display: 'block' }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
            <div className="flex flex-col items-start pl-6 w-full space-y-6 ">
              <div className='flex items-center mt-6 space-x-2'>
              <Image src={iconhome} alt='Home Icon' width={20} height={20} />
              <Link href="/" className="text-xl " onClick={() => setIsOpen(false)}>Home</Link>   
              </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center w-full pr-6" onClick={() => handleArrowToggle('services')}>
                  <Image src={iconcupboard} alt='Home Icon' width={20} height={20} />
                    <Link href="#" className="text-xl">Food Cupboard</Link>
                    <Image
                      src={activeSection === 'services' ? uparrow : downarrow}
                      alt={activeSection === 'services' ? 'Up arrow' : 'Down arrow'}
                      className="h-5 w-5"
                    />
                  </div>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: activeSection === 'services' ? 'auto' : 0, opacity: activeSection === 'services' ? 1 : 0 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pl-2 py-2">
                    <Link href="/products/Chocolate" className="block py-1 text-black">
                      <div className='flex items-center'>
                        <Image src={iconchocolate}  alt='Home Icon' width={20} height={20} className='mr-2'/>
                      Chocolate</div></Link>

                      <Link href="/products/Candies,-Gums-&-Mints" className="block py-1 text-black"><div className='flex items-center'><Image src={iconcandy}  alt='Home Icon' width={20} height={20} className='mr-2' />
                      Candies, Gums & Mints</div></Link>
                    </div>
                  </motion.div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center w-full pr-6" onClick={() => handleArrowToggle('products')}>
                  <Image src={iconhairwashing} alt='Home Icon' width={20} height={20} />
                    <Link href="#" className="text-xl">Health & Beauty</Link>
                    <Image
                      src={activeSection === 'products' ? uparrow : downarrow}
                      alt={activeSection === 'products' ? 'Up arrow' : 'Down arrow'}
                      className="h-5 w-5"
                    />
                  </div>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: activeSection === 'products' ? 'auto' : 0, opacity: activeSection === 'products' ? 1 : 0 }}
                    transition={{ duration: 0.1, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="pl-2 py-2">
                      <Link href="/products/Face-&-Skin-Care" className="block py-1 text-black"><div className='flex items-center'><Image src={iconcleansing}  alt='Home Icon' width={20} height={20} className='mr-2' />Face & Skin Care</div></Link>
                    </div>
                  </motion.div>
                </div>
              </div>
          </motion.div>
         
          </div>
          <div className="absolute left-1/2 top-2 transform -translate-x-1/2">
            <Link href="/">
            <Image 
                src={Logo.src}
                alt="Remote Connect Logo" 
                className="h-8 mt-1 -ml-2" 
                width={180}
                height={100}
            />
            </Link>
        </div>
            </div>
            <div className={`2xl:hidden xl:hidden lg:hidden md:flex md:mr-10 flex space-x-3 mr-10 ${isCartOpen ? 'mt-2' : ''}`}>
            <Image src={searchIcon} alt='Searc ico' width={24} height={6} onClick={() => dispatch(toggleSearchMenu())} />
            <motion.div
             initial={{ opacity: 0}}
            className="fixed inset-0 bg-black z-30 w-full"
            animate={{ opacity: isSearchOpen ? 0.5 : 0, x: isSearchOpen ? '-4%' : ''  }}
            transition={{ duration: 0.2 }}
            style={{ pointerEvents: isSearchOpen ? 'auto' : 'none' }} 
          />
            <motion.div
             className="fixed top-0 right-0 w-full h-full shadow-md bg-white hover:cursor-default text-black flex flex-col pt-8 overflow-auto z-40"
             initial={{ opacity: 0, x: '100%' }}
             animate={{ opacity: isSearchOpen ? 1 : 0, x: isSearchOpen ? 0 : '100%' }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
            <div className="relative flex items-center border-b-2 pb-4 w-full max-w-5xl space-x-2 2xl:mr-8 xl:mr-4 lg:mr-4">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                ref={mobilesearchInputRef}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-[80%] border-[#4b4848] ml-4 pl-8 border rounded-full bg-[#f5f5f5] px-2 py-2 2xl:pl-10 md:pl-10 text-base focus:outline-none"
              />
              <Image src={searchIcon.src} alt="Search Icon" width={16} height={16} className="absolute left-5" />
             
            <Image src={xicon} alt='X icon' width={24} height={24} onClick={() => dispatch(toggleSearchMenu())}  />
            </div>
            {searchQuery !== '' && searchedProducts.length > 0 && (
            <div className="flex justify-between w-full max-w-5xl px-4 pt-6">
                <h2 className="text-md">Products:</h2>
                <Link href={`/search/${searchQuery}`}>
                <h2 className="text-md font-bold cursor-pointer border-b-2 border-black inline-block" onClick={() => dispatch(toggleSearchMenu())} >View All</h2>
                </Link>
              </div>
              )}
            <div className='m-4'><div className="flex justify-center items-center min-h-[50vh]">
                <div className="grid grid-cols-1">
                  {searchQuery === '' ? (
                    <p className="text-center w-full col-span-4">Start typing to search for products...</p>
                  ) : searchedProducts.length > 0 ? (
                    searchedProducts.map((product) => (
                      <div key={product.sku} className="bg-white p-4 rounded text-center hover:cursor-pointer">
                        <Link href={`/product/${encodeURIComponent(product.name.replace(/\s+/g, '-'))}`} onClick={() => dispatch(toggleSearchMenu())}>
                        <Image src={product.image} alt={product.name} width={200} height={150} className="mx-auto mb-2" />
                        <h3 className="font-bold">{product.name}</h3>
                        <p className="text-gray-600 mt-2">Rs. {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(product.selling_price)}</p>
                        </Link>
                        <button className='w-[80%] mx-auto block border border-[#3c3f74] px-2 py-2 mt-2 hover:bg-[#3c3f74] hover:text-white' onClick={() => handleAddToCart(product)}>Add to cart</button>
                      </div>
                    ))
                  ) : (
                    <p className="text-center w-full col-span-4">No products found</p>
                  )}
                </div>
              </div>
              </div>
            </motion.div>

            <Image 
            src={ usericon} 
            alt="User Icon" 
            width={24} 
            height={6}
            className={`hover:cursor-pointer z-30 ${isCartOpen || isSearchOpen ? 'opacity-0 pointer-events-none' : ''}`}
            onClick={() => {
              if (!isCartOpen && !isSearchOpen) {
                toggleUserMenu();
              }
            }}
          />
            <motion.div
          className="fixed inset-0 bg-black z-30 w-full"
          initial={{ opacity: 0}}
          animate={{ opacity: isUserOpen ? 0.5 : 0, x: isUserOpen ? '-10%' : '-10%' }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isUserOpen ? 'auto' : 'none' }} 
          onClick={() => {
            if (isUserOpen) {
                toggleUserMenu();
            }
        }}
        />
          
            <motion.div
             className="fixed top-0 right-0 w-[88%] h-full shadow-md bg-white text-black flex flex-col pt-8 overflow-auto z-40"
             initial={{ opacity: 0, x: '100%' }}
             animate={{ opacity: isUserOpen ? 1 : 0, x: isUserOpen ? 0 : '100%' }}
              transition={{ duration: 0.2 }}
            >  <div>
            {!isRegister ? (
              <div className='p-4 mt-6'>
                <div className='flex justify-between'> 
                <h2 className='font-bold text-xl'>LOG IN TO ACCESS EVERYTHING</h2>
                <Image src={xicon} alt='xicon' width={26} 
            height={0} className={`h-7 ${isCartOpen || isSearchOpen ? 'opacity-0 pointer-events-none' : ''}`}
                      onClick={toggleUserMenu}
                  /></div>
                <div className="mb-4 mt-10">
                  <label htmlFor="email" className="block font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center border border-gray-400">
                    <Image src={mailicon} alt="Mail Icon" width={20} height={20} className="mx-2" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email Address"
                      className="w-full px-2 py-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <div className='flex justify-between hover:cursor-default'>
                    <label htmlFor="password" className="block font-medium mb-2">Password</label>
                    <h2 className='text-sm hover:cursor-pointer m-0'>Forgot Password?</h2>
                  </div>
                  <div className="flex items-center border border-gray-400">
                    <Image src={lockicon} alt="Lock Icon" width={20} height={20} className="mx-2" />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      className="w-full px-2 py-4 focus:outline-none"
                    />
                  </div>
                </div>
                <button className="w-full mt-4 bg-black text-white font-bold py-2.5 border-black border hover:bg-[#3c3f74]">
                  LOGIN
                </button>
                <h2 className='text-sm text-center mt-4'>
                  Don&apos;t have an account? 
                  <span className='underline hover:cursor-pointer ml-2' onClick={toggleForm}>Register</span>
                </h2>
              </div>
            ) : (
              <div className='p-4 mt-6'>
                <h2 className='font-bold text-xl'>REGISTER FOR AN ACCOUNT</h2>
                <div className="mb-4 mt-10">
                    <label htmlFor="firstName" className="block font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      placeholder="Enter First Name"
                      className="w-full px-4 py-4 border border-gray-400 focus:outline-none"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="lastName" className="block font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      placeholder="Enter Last Name"
                      className="w-full px-4 py-4 border border-gray-400 focus:outline-none"
                    />
                  </div>

                  <div className="mb-4">
                  <label htmlFor="mobile" className="block font-medium text-gray-700 mb-2">Mobile Number</label>
                  <div className="flex items-center border border-gray-400">
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      placeholder="Enter Mobile Number"
                      className="w-full px-4 py-4 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label htmlFor="registerEmail" className="block font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="flex items-center border border-gray-400">
                    <Image src={mailicon} alt="Mail Icon" width={20} height={20} className="mx-3" />
                    <input
                      type="email"
                      id="registerEmail"
                      name="registerEmail"
                      placeholder="Enter Email Address"
                      className="w-full px-2 py-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmEmail" className="block font-medium text-gray-700 mb-2">Confirm Email</label>
                  <div className="flex items-center border border-gray-400">
                    <Image src={mailicon} alt="Mail Icon" width={20} height={20} className="mx-3" />
                    <input
                      type="email"
                      id="confirmEmail"
                      name="confirmEmail"
                      placeholder="Confirm Email Address"
                      className="w-full px-2 py-4 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label htmlFor="registerPassword" className="block font-medium mb-2">Password</label>
                  <div className="flex items-center border border-gray-400">
                  <Image src={lockicon} alt="Lock Icon" width={20} height={20} className="mx-3" />
                    <input
                      type="password"
                      id="registerPassword"
                      name="registerPassword"
                      placeholder="Enter Password"
                      value={password}
                      onChange={handlePasswordChange}
                      className={`w-full px-2 py-4 focus:outline-none ${password ? 'border-black' : 'border-gray-400'}`}
                    />
                  </div>
                  <div className='text-sm'>
                  <p className='mt-2 '><span className='font-bold'>Enter a Password </span>- please note that passwords must contain at least:</p>
                  <ul className="list-none list-inside mt-1">
                  <li className="flex items-center mb-1">
                      <div className={`p-2 rounded-full border-2 text-white ${requirements.length ? 'bg-black' : ''}`}></div>
                      <span className='ml-2'>8 characters</span>
                    </li>
                    <li className="flex items-center mb-1">
                        <div className={`p-2 rounded-full border-2 text-white ${requirements.number ? 'bg-black' : ''}`}></div>
                        <span className={`ml-2`}>One number [0-9]</span>
                      </li>
                      <li className="flex items-center mb-1">
                        <div className={`p-2 rounded-full border-2 text-white ${requirements.lowercase ? 'bg-black' : ''}`}></div>
                        <span className={`ml-2`}>One lowercase character [a-z]</span>
                      </li>
                      <li className="flex items-center mb-1">
                        <div className={`p-2 rounded-full border-2 text-white ${requirements.uppercase ? 'bg-black' : ''}`}></div>
                        <span className={`ml-2`}>One uppercase character [A-Z]</span>
                      </li>
                      <li className="flex items-center mb-1">
                        <div className={`p-2 rounded-full border-2 text-white ${requirements.special ? 'bg-black' : ''}`}></div>
                        <span className={`ml-2`}>One special character [!&quot;#$%&amp;&apos;()*+,-./:;&lt;=&gt;?@^_`{}~]</span>
                      </li>
                      </ul>
                      </div>
                    </div>
        
                  <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block font-medium mb-2">Confirm Password</label>
                    <div className="flex items-center border border-gray-400">
                      <Image src={lockicon} alt="Lock Icon" width={20} height={20} className="mx-3" />
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="w-full px-2 py-4 focus:outline-none"
                      />
                    </div>
                  </div>

                <button className="w-full mt-4 bg-black text-white font-bold py-2.5 border-black border hover:bg-[#3c3f74]">
                REGISTER
                </button>
                <h2 className='text-sm text-center mt-4 mb-10'>
                  Already have an account?
                  <span className='underline hover:cursor-pointer ml-2' onClick={toggleForm}>Login</span>
                </h2>
              </div>
            )}
          </div>
              </motion.div>
              <Image 
                src={carticon}
                alt={isCartOpen ? 'Close Cart' : 'Cart Icon'} 
                width={24} 
                height={6}
                className={`hover:cursor-pointer z-30 ${isUserOpen || isSearchOpen ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={() => {
                  if (!isUserOpen && !isSearchOpen) {
                    dispatch(toggleCartMenu());
                  }
                }}
              />
                <div className="absolute top-1 right-0 md:right-6 md:top-1 2xl:hidden xl:hidden lg:hidden bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0}
            </div>
        </div>
        <motion.div
          className="fixed inset-0 bg-black z-30 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: isCartOpen ? 0.5 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ pointerEvents: isCartOpen ? 'auto' : 'none' }}
          onClick={() => {
            if (isCartOpen) {
                dispatch(toggleCartMenu());
            }
        }}
      />
          <motion.div
            className="fixed top-0 right-0 w-[80%] 2xl:w-[20%] xl:w-[20%] h-full shadow-md bg-white text-black flex flex-col pt-6 overflow-auto z-40"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: isCartOpen ? 1 : 0, x: isCartOpen ? 0 : '100%' }}
            transition={{ duration: 0.2 }}
          > <div className='flex justify-between m-4'><h2 className="font-bold text-2xl">Your Bag ({cartItems.length > 0 ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0})</h2>
           <Image 
                src={xicon}
                alt={ 'Close Cart' } 
                width={28} 
                height={6}
                className={`h-8 hover:cursor-pointer z-30 ${isUserOpen || isSearchOpen ? 'opacity-0 pointer-events-none' : ''}`}
                onClick={() => {
                  if (!isUserOpen && !isSearchOpen) {
                    dispatch(toggleCartMenu());
                  }
                }}
              />
          </div>
          {cartItems.length > 0 ? (
          <div className="flex flex-col flex-grow space-y-4">

            <div className="flex-grow flex flex-col space-y-4 overflow-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-20 h-20"
                    />
                    <div>
                      <h3 className="font-semibold text-sm">{item.name}</h3>
                      <p className='text-sm'>
                        Rs. {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(item.price)}
                      </p>
                      <div className="flex items-center space-x-6">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="rounded-full border-gray-100 border-2 bg-gray-100"
                        >
                          {item.quantity > 1 ? (
                            <Image src={minusicon} alt="Decrease quantity" width={20} height={20} />
                          ) : (
                            <Image src={trashicon} alt="Remove" width={20} height={20} />
                          )}
                        </button>
                        <span className="m-2">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(incrementQuantity(item.id))}
                          className="rounded-full border-gray-100 border-2 bg-gray-100"
                        >
                          <Image src={plusicon} alt="Increase quantity" width={20} height={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Details */}
            <div className="p-4 mt-auto border-t-2">
                <h3 className="font-semibold">
                  Order Summary: Rs. {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(
                    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
                  )}
                </h3>
              <button
                className="bg-black text-white px-4 w-full py-2 mt-4 rounded border-black border hover:bg-[#3c3f74]"
              >
                Checkout
              </button>
            </div>
          </div>
          ) : (
            <p className='pt-16 text-center'>Your cart is empty.</p>
          )}
          </motion.div>
      </header>
    </div>
  );
};

export default TestTwoHeader;
