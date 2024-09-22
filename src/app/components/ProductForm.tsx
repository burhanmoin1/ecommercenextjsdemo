'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backarrow from '@/app/assets/icons/backarrow.png';
import Link from 'next/link';
import Image from 'next/image';
import { stat } from 'fs';

const ProductForm: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [sku, setSku] = useState('');
  const [primaryCategory, setPrimaryCategory] = useState('');
  const [secondaryCategory, setSecondaryCategory] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [profit, setProfit] = useState('');
  const [inventory, setInventory] = useState('');
  const [status, setStatus] = useState('');
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [images, setImages] = useState<File[]>([]); 
  const [discount, setDiscount] = useState('');

  // State for Primary Categories dropdown
  const [primaryCategories, setPrimaryCategories] = useState<{ id: string, name: string }[]>([]);
  
  // State for Secondary Categories dropdown
  const [secondaryCategories, setSecondaryCategories] = useState<{ id: string, name: string }[]>([]);

  const calculateProfit = () => {
    const selling = parseFloat(calculateDiscountedPrice()) || 0; // Use discounted price
    const cost = parseFloat(costPrice) || 0;
    return (selling - cost).toFixed(2); // Format to 2 decimal places
  };

  const calculateDiscountedPrice = () => {
    const price = parseFloat(sellingPrice) || 0;
    const discountPercentage = parseFloat(discount) || 0;
    const discountedPrice = price - (price * (discountPercentage / 100));
    return discountedPrice.toFixed(2); // Format to 2 decimal places
  };


  useEffect(() => {
    // Fetch primary categories
    axios.get('http://127.0.0.1:8000/api/get-primary-categories/')
      .then((response) => {
        setPrimaryCategories(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching primary categories!', error);
      });
  }, []);

  const handlePrimaryCategoryChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPrimaryCategory = event.target.value;
    setPrimaryCategory(selectedPrimaryCategory);

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/get-secondary-categories/`, {
        params: { primary_category_id: selectedPrimaryCategory }
      });
      setSecondaryCategories(response.data);
    } catch (error) {
      console.error('There was an error fetching secondary categories!', error);
    }
  };
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const totalImages = [...images, ...newFiles].slice(0, 4); // Allow up to 4 images
      setImages(totalImages);
    }
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (images.length === 0) {
      alert('Please select at least one image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('brand', brand);
    formData.append('sku', sku);
    formData.append('status', status);
    formData.append('primary_category', primaryCategory);
    formData.append('secondary_category', secondaryCategory);
    formData.append('selling_price', sellingPrice);
    formData.append('cost_price', costPrice);
    formData.append('discount', discount); // Include discount
    formData.append('profit', calculateProfit());
    formData.append('inventory', inventory);
    formData.append('weight', weight); 
    formData.append('weight_unit', weightUnit);

    images.forEach((image) => {
      formData.append('images', image);
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create-product/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Product created successfully!');
      // Clear form fields
      setName('');
      setDescription('');
      setBrand('');
      setSku('');
      setStatus('active');
      setPrimaryCategory('');
      setSecondaryCategory('');
      setSellingPrice('');
      setCostPrice('');
      setDiscount(''); // Clear discount field
      setProfit('');
      setInventory('');
      setWeight('');
      setImages([]);
      setWeightUnit('kg');
    } catch (error) {
      console.error('There was an error creating the product!', error);
      alert('Failed to create product.');
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
  <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md">
      <Link href="/admin/products">
          <p className="flex items-center text-blue-500 hover:text-blue-700">
            <Image src={backarrow} alt='Back arrow' width={12} height={12} className="mr-2" />
            <span className="text-sm font-bold">Back to Products</span>
          </p>
        </Link>
    <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Product</h1>

    <label className="block mb-2 text-sm font-medium text-gray-700">Product Name</label>
    <input
      type="text"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Product Name"
      required
    />

    <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Product Description"
      required
    />

    <label className="block mb-2 text-sm font-medium text-gray-700">Brand</label>
    <input
      type="text"
      value={brand}
      onChange={(e) => setBrand(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Product Brand"
      required
    />

    <label className="block mb-2 text-sm font-medium text-gray-700">Primary Category</label>
    <select
      value={primaryCategory}
      onChange={handlePrimaryCategoryChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      required
    >
      <option value="" disabled>Select a Primary Category</option>
      {primaryCategories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>

    <label className="block mb-2 text-sm font-medium text-gray-700">Secondary Category</label>
    <select
      value={secondaryCategory}
      onChange={(e) => setSecondaryCategory(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      required
    >
      <option value="" disabled>Select a Secondary Category</option>
      {secondaryCategories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>

    <label className="block mb-2 text-sm font-medium text-gray-700">SKU</label>
    <input
      type="text"
      value={sku}
      onChange={(e) => setSku(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter SKU"
      required
    />

    <label className="block mb-2 text-sm font-medium text-gray-700">Status</label>
    <select
      value={status}
      onChange={handleStatusChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      required
    >
      <option value="" disabled>Select a Status</option>
      <option value="Active">Active</option>
      <option value="Inactive">Inactive</option>
      {/* Add more options as needed */}
    </select>

    <label className="block mb-2 text-sm font-medium text-gray-700">Selling Price</label>
    <input
      type="number"
      value={sellingPrice}
      onChange={(e) => setSellingPrice(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Selling Price"
      required
    />

    <label className="block mb-2 text-sm font-medium text-gray-700">Cost Price</label>
    <input
      type="number"
      value={costPrice}
      onChange={(e) => setCostPrice(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Cost Price"
      required
    />

    <label className="block mb-2 text-sm font-medium text-gray-700">Discount (%)</label>
    <input
      type="number"
      value={discount}
      onChange={(e) => setDiscount(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Discount Percentage"
    />

    <label className="block mb-2 text-sm font-medium text-gray-700">Profit</label>
    <input
      type="text"
      value={calculateProfit()}
      readOnly
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 bg-gray-100"
      placeholder="Profit will be calculated automatically"
    />

    <label className="block mb-2 text-sm font-medium text-gray-700">Inventory</label>
    <input
      type="number"
      value={inventory}
      onChange={(e) => setInventory(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Inventory Quantity"
      required
    />

    <label className="block mb-2 text-sm font-medium text-gray-700">Weight</label>
    <input
      type="number"
      value={weight}
      onChange={(e) => setWeight(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      placeholder="Enter Weight"
      required
    />

    <label className="block mb-2 text-sm font-medium text-gray-700">Weight Unit</label>
    <select
      value={weightUnit}
      onChange={(e) => setWeightUnit(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:ring-blue-500 focus:border-blue-500"
      required
    >
      <option value="kg">Kilograms (kg)</option>
      <option value="g">Grams (g)</option>
      <option value="lbs">Pounds (lbs)</option>
      <option value="oz">Ounces (oz)</option>
    </select>

    <label className="block mb-2 text-sm font-medium text-gray-700">Images</label>
    <div className="flex gap-2 mb-4">
      {images.map((image, index) => (
        <div key={index} className="relative">
          <img
            src={URL.createObjectURL(image)}
            alt={`Preview ${index}`}
            className="w-24 h-24 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={() => setImages(images.filter((_, i) => i !== index))}
            className="absolute top-0 right-0 bg-red-500 text-white text-sm rounded-full p-1"
          >
            x
          </button>
        </div>
      ))}
      {images.length < 4 && (
        <label className="w-24 h-24 border-dashed border-2 border-gray-300 flex justify-center items-center rounded-lg cursor-pointer">
          <span className="text-2xl text-gray-400">+</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </div>

    <button
      type="submit"
      className="w-full py-3 px-4 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-all"
    >
      Submit Product
    </button>
  </form>
</div>

  );
};

export default ProductForm;
