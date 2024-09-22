'use client';
import Image from "next/image";
import searchIcon from '@/app/assets/icons/search-black.png';
import filterIcon from '@/app/assets/icons/filter-black.png';
import sortgray from '@/app/assets/icons/icons8-sort-100.png';
import downarrow from '@/app/assets/icons/downarrow.png';
import uparrow from '@/app/assets/icons/uparrow.png';
import trashicon from '@/app/assets/icons/icons8-trash-50.png';
import pencilicon from '@/app/assets/icons/icons8-pencil-50.png';
import React, { useState, useEffect, ReactNode } from 'react';
import AddProducts from "./AddProducts";
import axios from 'axios';
import Link from "next/link";

type SortOption = 'Product title' | 'Created' | 'Updated' | 'Inventory' | 'Brand';
type SortOrder = 'asc' | 'desc';

interface Product {
  selling_price: ReactNode;
  product_id: any;
  id: string;
  name: string;
  status: string;
  inventory: number;
  primary_category: string;
  secondary_category: string;
  brand: string;
}

const ProductsAdded = () => {
    const [active, setActive] = useState('all');
    const [products, setProducts] = useState<Product[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState(''); // Add search query state
    const [sortOpen, setSortOpen] = useState(false);
    const [selectedSortOrder, setSelectedSortOrder] = useState<SortOrder | null>(null);
    const [selectedSortOption, setSelectedSortOption] = useState<SortOption | null>('Product title');
    const [showAddProducts, setShowAddProducts] = useState(false);

    const options: SortOption[] = ['Product title', 'Created', 'Updated', 'Inventory', 'Brand'];
    const sortOrders = {
        'Product title': ['A-Z', 'Z-A'],
        'Created': ['Oldest First', 'Newest First'],
        'Updated': ['Oldest First', 'Newest First'],
        'Inventory': ['Low to High', 'High to Low'],
        'Brand': ['A-Z', 'Z-A'],
    };
    

    useEffect(() => {
        const checkProductCollection = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/check-product-collection/');
                setShowAddProducts(!response.data);
            } catch (error) {
                console.error("Error checking product collection:", error);
                setShowAddProducts(true);
            }
        };

        checkProductCollection();
    }, []);

    const fetchProducts = async () => {
        try {
            // Initialize URLSearchParams to build query string
            const params = new URLSearchParams();
    
            // Add sort parameters if applicable
            if (selectedSortOption && selectedSortOrder) {
                const sortField = selectedSortOption === 'Product title' ? 'name' : selectedSortOption.toLowerCase();
                params.append('sort_option', sortField);
                params.append('sort_order', selectedSortOrder);
            }
    
    
    
            // Convert URLSearchParams to a query string
            const queryString = params.toString();
    
            // Log the final query for debugging
            console.log("Final query string:", queryString);
    
            // Fetch products with the constructed query string
            const response = await axios.get(`http://127.0.0.1:8000/api/create-product/?${queryString}`);
    
            // Update state with the response data
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };
    
    useEffect(() => {
        fetchProducts();
    }, [selectedSortOption, selectedSortOrder]);
      

    const handleSortClick = (option: SortOption) => {
        if (selectedSortOption === option) {
            setSelectedSortOption(null);
        } else {
            setSelectedSortOption(option);
            setSelectedSortOrder(null);
        }
    };

    const handleSortOrderClick = (order: SortOrder) => {
        setSelectedSortOrder(order);
        setSortOpen(false);
    };

    const handleClick = (item: React.SetStateAction<string>) => {
        setActive(item);
    };

    // Filter the products based on the search query
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    if (showAddProducts) {
        return <AddProducts />;
    }

    return (
        <div>
            <div className="bg-white w-full p-2 mt-6 rounded-md border-b-2 border-[#e3e3e3]">
                <div className="flex items-center justify-between">
                    <div className={`flex items-center ${isSearching ? 'hidden 2xl:flex' : ''}`}>
                        <h2
                            className={`text-sm 2xl:text-md px-4 py-2 2xl:ml-2 inline-block rounded-md cursor-pointer ${
                                active === 'all' ? 'bg-[#f2f2f2]' : 'hover:bg-[#f2f2f2]'
                            }`}
                            onClick={() => handleClick('all')}
                        >
                            All
                        </h2>
                        <h2
                            className={`text-sm 2xl:text-md px-4 py-2 2xl:ml-2 cursor-pointer rounded-md ${
                                active === 'active' ? 'bg-[#f2f2f2]' : 'hover:bg-[#f2f2f2]'
                            }`}
                            onClick={() => handleClick('active')}
                        >
                            Active
                        </h2>
                        <h2
                            className={`text-sm 2xl:text-md 2xl:ml-2 px-4 py-2 cursor-pointer rounded-md ${
                                active === 'archived' ? 'bg-[#f2f2f2]' : 'hover:bg-[#f2f2f2]'
                            }`}
                            onClick={() => handleClick('archived')}
                        >
                            Archived
                        </h2>
                        <Link href='/admin/products/add'>
                        <h2 className="text-sm 2xl:text-lg 2xl:ml-2 text-black cursor-pointer rounded-md p-2 hover:bg-[#f2f2f2]">+</h2></Link>
                    </div>
                    <div className="relative flex p-2 xl:ml-auto md:ml-auto md:mr-2 2xl:ml-auto 2xl:mr-2 2xl:p-2 rounded-lg border">
                        {!isSearching ? (
                            <div className="flex items-center cursor-pointer" onClick={() => setIsSearching(true)}>
                                <Image src={searchIcon} alt="Search Icon" width={14} height={10} className="2xl:w-4" />
                                <Image src={filterIcon} alt="Filter Icon" width={14} height={10} className="ml-2 2xl:w-4" />
                            </div>
                        ) : (
                            <div className="flex items-center w-full bg-white rounded-lg">
                                {/* Search input */}
                                <input 
                                    type="text" 
                                    placeholder="Search..." 
                                    className="w-full outline-none" 
                                    value={searchQuery} // Bind search query to input
                                    onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
                                />
                                <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsSearching(false)}>
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="relative flex items-center p-2 border rounded-lg cursor-pointer" onClick={() => setSortOpen(!sortOpen)}>
                        <Image
                        src={sortgray}
                        alt="Sort Icon"
                        width={14}
                        height={10}
                        className="cursor-pointer 2xl:w-4"
                        />
                        {sortOpen && (
                        <div className="absolute right-0 mt-80 w-48 bg-white border rounded-lg shadow-lg z-10">
                            {options.map((option) => (
                                <div
                                    key={option}
                                    className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 ${
                                    selectedSortOption === option ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleSortClick(option)}
                                >
                                    <div
                                    className={`w-4 h-4 border rounded-full mr-2 ${
                                        selectedSortOption === option ? 'border-black border-4' : ''
                                    }`}
                                    />
                                    {option}
                                </div>
                            ))}
                            <div className="border-t-2 border-[#dbdbdb] mt-2"></div>

                            {selectedSortOption && (
                            <div className="mt-2">
                                {sortOrders[selectedSortOption].map((orderLabel, index) => (
                                <div
                                    key={orderLabel}
                                    className={`flex items-center p-2 cursor-pointer hover:bg-gray-200 ${
                                    selectedSortOrder === (index === 0 ? 'asc' : 'desc') ? 'bg-gray-100' : ''
                                    }`}
                                    onClick={() => handleSortOrderClick(index === 0 ? 'asc' : 'desc')}
                                >
                                    <Image
                                    src={index === 0 ? uparrow : downarrow}
                                    alt={index === 0 ? 'Up Arrow' : 'Down Arrow'}
                                    width={14}
                                    height={10}
                                    className="mr-2"
                                    />
                                    {orderLabel}
                                </div>
                                ))}
                            </div>
                            )}
                        </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Rows */}
            <div className="bg-[#f7f7f7] hidden 2xl:block w-full p-4 rounded-md border-b-2 border-[#e3e3e3]">
            <div className="grid grid-cols-1 2xl:grid-cols-7 gap-4 items-center">
               
                <span className="text-sm font-bold">Product</span>
                <span className="text-sm font-bold">Status</span>
                <span className="text-sm font-bold">Inventory</span>
                <span className="text-sm font-bold">Primary Category</span>
                <span className="text-sm font-bold">Secondary Category</span>
                <span className="text-sm font-bold">Brand</span>
                <span className="text-sm font-bold">Selling price</span>
            </div>
        </div>


        {filteredProducts.map((product) => (
            <Link href={`/admin/products/update/${product.product_id}`} key={product.id}>
                <div className={`bg-white w-full p-4 rounded-md border-b-2 hover:bg-[#fafafa] border-[#e3e3e3]`}>
                    <div className="grid grid-cols-1 2xl:grid-cols-7 gap-4 items-center">
                    
                        <span className="text-sm">{product.name}</span>
                        <span className="text-sm">{product.status}</span>
                        <span className="text-sm">{product.inventory}</span>
                        <span className="text-sm">{product.primary_category}</span>
                        <span className="text-sm">{product.secondary_category}</span>
                        <span className="text-sm">{product.brand}</span>
                        <span className="text-sm">{product.selling_price} 
                        <span className="flex justify-end space-x-2"> 
                            {/* Placeholder for the Pencil (edit) icon */}
                            <button className="p-2 rounded-full hover:bg-gray-200">
                            <Image
                                src={pencilicon}
                                alt="Edit"
                                width={16}
                                height={16}
                            />
                            </button>

                            {/* Placeholder for the Delete (trash) icon */}
                            <button className="p-2 rounded-full hover:bg-gray-200">
                            <Image
                                src={trashicon} // Update with the correct path for the trash icon
                                alt="Delete"
                                width={16}
                                height={16}
                            />
                            </button>
                        </span></span>
                       
                    </div>
                </div>
            </Link>
        ))}

        </div>
    );
};

export default ProductsAdded;
