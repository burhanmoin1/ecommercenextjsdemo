'use client';
import { useEffect, useState } from 'react';
import products from '../utils/common';
import { Product } from '../utils/common';
import filtericon from '@/app/assets/icons/filtericon.png';
import xicon from '@/app/assets/icons/xicon.png';
import Image, { StaticImageData } from 'next/image';
import { motion } from 'framer-motion';
import Select from 'react-select';


// Function to count occurrences
const countOccurrences = (arr: string[]) => {
    return arr.reduce((acc: Record<string, number>, item) => {
        acc[item] = (acc[item] || 0) + 1;
        return acc;
    }, {});
};

const customStyles = {
    control: (provided: any) => ({
      ...provided,
      borderColor: '#D1D5DB',
      padding: '0.2rem',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#3B82F6',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 20,
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#3B82F6' : '#fff',
      color: state.isSelected ? '#fff' : '#000',
      '&:hover': {
      cursor: 'pointer'
      }
     
    }),
  };

const ProductTest: React.FC = () => {
    // Collect all categories and brands
    const secondaryCategories = products.map(product => product.secondary_category);
    const brands = products.map(product => product.brand);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [columns, setColumns] = useState(4); // Start with 4 columns

    const handleColumnChange = (newColumns: number) => {
        setColumns(newColumns);
    };

    const [mobilecolumns, setMobileColumns] = useState(1); // Start with 4 columns

    const handlemobileColumnChange = (newmobileColumns: number) => {
        setMobileColumns(newmobileColumns);
    };
    // Count occurrences
    const secondaryCount = countOccurrences(secondaryCategories);
    const brandCount = countOccurrences(brands);
    
    // State for selected filters
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

    useEffect(() => {
        if (isFilterOpen) {
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
      }, [isFilterOpen]);
    
    // State for sorting option
    const [sortOption, setSortOption] = useState<string>('asc');

    const sortOptions = [
        { value: 'asc', label: 'Alphabetically, A-Z' },
        { value: 'desc', label: 'Alphabetically, Z-A' },
        { value: 'price', label: 'Price, high to low' },
        { value: '-price', label: 'Price, low to high' },
      ];

    const toggleFilterMenu = () => setIsFilterOpen(!isFilterOpen);
    // Handle checkbox changes for categories
    const handleCategoryChange = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
    };

    // Handle checkbox changes for brands
    const handleBrandChange = (brand: string) => {
        setSelectedBrands(prev => 
            prev.includes(brand) 
                ? prev.filter(b => b !== brand) 
                : [...prev, brand]
        );
    };

    // Handle sorting option change
    const handleSortChange = (selectedOption: any) => {
        setSortOption(selectedOption.value);
      };

    // Filter products based on selected categories and brands
    let filteredProducts = products.filter(product => 
        (selectedCategories.length === 0 || selectedCategories.includes(product.secondary_category)) &&
        (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
    );

    // Sort products based on the selected sort option
    filteredProducts = filteredProducts.sort((a, b) => {
        if (sortOption === 'asc') {
            return a.name.localeCompare(b.name);
        } else if (sortOption === 'desc') {
            return b.name.localeCompare(a.name);
        } else if (sortOption === 'price') {
            return b.selling_price - a.selling_price; // High to low
        } else if (sortOption === '-price') {
            return a.selling_price - b.selling_price; // Low to high
        }
        return 0;
    });

    return (
        <div className="2xl:w-[70%] xl:w-[75%] xl:ml-44 2xl:ml-44 2xl:mt-44 xl:mt-44 lg:mt-44 md:mt-44 mt-24 z-2">
            <div className="flex flex-col 2xl:flex-row xl:flex-row justify-between">
               
                {/* Filter Section */}
                <div className="w-[16%] 2xl:w-[20%] xl:w-[40%] mt-20 h-[60vh] hidden xl:block 2xl:block overflow-y-auto p-4">
                    {/* Categories */}
                    <h2 className="border-b-2 border-black w-[30%] font-semibold">Categories</h2>
                    <ul className='mt-2'>
                        {Object.entries(secondaryCount).map(([category, count]) => (
                            <li key={category} className='text-sm flex items-center'>
                            <label className="flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="mr-2" 
                                    checked={selectedCategories.includes(category)}
                                    onChange={() => handleCategoryChange(category)}
                                />
                                {category} ({count})
                            </label>
                        </li>
                        ))}
                    </ul>
                    {/* Brands */}
                    <h3 className="mt-4 border-b-2 border-black w-[30%] font-semibold">Brands</h3>
                    <ul className='mt-2'>
                        {Object.entries(brandCount).map(([brand, count]) => (
                            <li key={brand} className='text-sm flex items-center '>
                                <label className="flex items-center cursor-pointer">
                                <input 
                                    type="checkbox" 
                                    className="mr-2" 
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => handleBrandChange(brand)}
                                />
                                {brand} ({count})
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <h2 className='text-center text-6xl font-bold mt-2 border-b-2 pb-6 tracking-tighter 2xl:hidden xl:hidden'>Chocolate</h2>
                {/* Products Display Section */}
                <div className="2xl:w-[84%] xl:w-[140%] p-4 overflow-y-auto">
                    <div className='flex justify-between items-center 2xl:border-0 xl:border-0 lg:border-0 pb-4'>
                        <Image src={filtericon} alt='Filter Icon' width={26} height={10} className='2xl:hidden xl:hidden mb-2 hover:cursor-pointer' 
                        onClick={toggleFilterMenu} />
                        <motion.div
                        className="fixed inset-0 bg-black z-30 w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isFilterOpen ? 0.5 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ pointerEvents: isFilterOpen ? 'auto' : 'none' }}
                        />
                            <motion.div
                            className="fixed top-0 left-0 h-full p-4 w-[60%] md:w-[26%] 2xl:hidden xl:hidden shadow-md bg-white text-black flex flex-col pt-24 overflow-auto z-40"
                            initial={{ opacity: 0, x: '100%' }}
                            animate={{ opacity: isFilterOpen ? 1 : 0, x: isFilterOpen ? 0 : '-100%' }}
                            transition={{ duration: 0.3 }}
                            > 
                            <div className='flex justify-between mb-8'>
                            <div className='flex space-x-4'><span>View as: </span>
                            {/* 1 Column Layout */}
                            <div onClick={() => handlemobileColumnChange(1)} className='text-center cursor-pointer flex gap-1 bg-white'>
                                    <div className='p-2 h-full bg-[#3c3f74]'></div>
                                </div>
                            {/* 2 Column Layout */}
                                <div onClick={() => handlemobileColumnChange(2)} className='text-center cursor-pointer flex gap-1 bg-white'>
                                    <div className='p-2 h-full bg-[#3c3f74]'></div>
                                    <div className='p-2 h-full bg-[#3c3f74]'></div>
                                </div>
                            </div>
                                <Image src={xicon} alt='X icon' width={20} height={10} className='pb-0 hover:cursor-pointer' onClick={toggleFilterMenu} />
                            </div>
                            <h2 className="border-b-2 border-black w-[30%] font-semibold">Categories</h2>
                            <ul className='mt-2'>
                                {Object.entries(secondaryCount).map(([category, count]) => (
                                    <li key={category} className='text-sm flex items-center'>
                                    <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="mr-2" 
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                        {category} ({count})
                                    </label>
                                </li>
                                ))}
                            </ul>
                            {/* Brands */}
                            <h3 className="mt-4 border-b-2 border-black w-[30%] font-semibold">Brands</h3>
                            <ul className='mt-2'>
                                {Object.entries(brandCount).map(([brand, count]) => (
                                    <li key={brand} className='text-sm flex items-center '>
                                        <label className="flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="mr-2" 
                                            checked={selectedBrands.includes(brand)}
                                            onChange={() => handleBrandChange(brand)}
                                        />
                                        {brand} ({count})
                                        </label>
                                    </li>
                                ))}
                            </ul></motion.div>
                            <div className='2xl:hidden xl:hidden md:flex md:mr-40 hidden '>
                            <div className='flex space-x-4'><span>View as: </span>
                            {/* 2 Column Layout */}
                            <div onClick={() => handleColumnChange(2)} className='text-center cursor-pointer flex gap-1 bg-white'>
                                    <div className='p-2 h-full bg-[#3c3f74]'></div>
                                    <div className='p-2 h-full bg-[#3c3f74]'></div>
                                </div>
                            {/* 3 Column Layout */}
                            <div onClick={() => handleColumnChange(3)} className='text-center cursor-pointer flex gap-1 bg-white'>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                            </div>
                            {/* 4 Column Layout */}
                            <div onClick={() => handleColumnChange(4)} className='text-center cursor-pointer flex gap-1 bg-white'>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                            </div>
                            </div>
                        </div>
                         
                        <h2 className="text-sm 2xl:hidden xl:hidden">
                        <Select
                            styles={customStyles}
                            options={sortOptions}
                            value={sortOptions.find(option => option.value === sortOption)}
                            onChange={handleSortChange}
                            isSearchable={false} // Disable search box if not needed
                            className="w-52"
                            />
                        </h2>
                    </div>
                    <h2 className='text-center text-6xl font-bold mt-2 border-b-2 pb-12 hidden 2xl:block xl:block'>Chocolate</h2>
                    <div className='2xl:flex xl:flex justify-between items-center hidden mt-4'>
                        <div className='flex space-x-4'><span>View as: </span>
                            {/* 2 Column Layout */}
                            <div onClick={() => handleColumnChange(2)} className='text-center cursor-pointer flex gap-1 bg-white'>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                            </div>
                            {/* 3 Column Layout */}
                            <div onClick={() => handleColumnChange(3)} className='text-center cursor-pointer flex gap-1 bg-white'>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                            </div>
                            {/* 4 Column Layout */}
                            <div onClick={() => handleColumnChange(4)} className='text-center cursor-pointer flex gap-1 bg-white'>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                                <div className='p-2 h-full bg-[#3c3f74]'></div>
                            </div>
                        </div>

                    <h2 className="hidden 2xl:block xl:block lg:hidden text-end">
                        <div className="flex items-center justify-end">
                            <span className="mr-2">Sort by:</span> {/* Add margin to space between text and select */}
                            <Select
                                styles={customStyles}
                                options={sortOptions}
                                value={sortOptions.find(option => option.value === sortOption)}
                                onChange={handleSortChange}
                                isSearchable={false} // Disable search box if not needed
                                className="w-55"
                            />
                        </div>
                        
                    </h2>
                    </div>
                    {/* Product laoyut */}
                    <div className={`grid grid-cols-${mobilecolumns} 2xl:grid-cols-${columns} xl:grid-cols-${columns} md:grid-cols-${columns} 2xl:gap-4  gap-2 mt-0`}>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <motion.div whileHover={{ scale: 1.002 }} key={product.sku} className="bg-white border-1 p-4 rounded hover:cursor-pointer ">
                                    <Image src={product.image} alt={product.name} width={600} height={100} className='w-full object-cover' />
                                    <h3 className='font-bold text-center'>{product.name}</h3>
                                    <p className='text-center mt-2'>Rs. {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(product.selling_price)}</p>
                                    <button className='w-[80%] mx-auto block border border-[#3c3f74] px-2 py-2 mt-2 hover:bg-[#3c3f74] hover:text-white'>Add to cart</button>
                                </motion.div>
                            ))
                        ) : (
                            <p>No products found for the selected filters.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductTest;
