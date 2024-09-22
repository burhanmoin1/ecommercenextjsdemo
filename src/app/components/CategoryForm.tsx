'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CategoryForm: React.FC = () => {
  // State for Primary Category form
  const [primaryCategoryName, setPrimaryCategoryName] = useState('');
  
  // State for Primary Categories dropdown
  const [primaryCategories, setPrimaryCategories] = useState<{ id: string, name: string }[]>([]);
  const [selectedPrimaryCategoryName, setSelectedPrimaryCategoryName] = useState(''); // Updated to use name

  // State for Secondary Category form
  const [secondaryCategoryName, setSecondaryCategoryName] = useState('');

  // Function to fetch Primary Categories
  const fetchPrimaryCategories = () => {
    axios.get('http://127.0.0.1:8000/api/get-primary-categories/')
      .then((response) => {
        setPrimaryCategories(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the primary categories!', error);
      });
  };

  // Fetch Primary Categories when the component mounts
  useEffect(() => {
    fetchPrimaryCategories();
  }, []);

  // Handle Primary Category Form Submission
  const handlePrimaryCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    axios.post('http://127.0.0.1:8000/api/primary-category/', { name: primaryCategoryName })
      .then((response) => {
        alert('Primary Category created successfully!');
        setPrimaryCategoryName(''); // Reset the form field
        fetchPrimaryCategories(); // Refresh the dropdown with the newly added category
      })
      .catch((error) => {
        console.error('There was an error creating the primary category!', error);
      });
  };

  // Handle Secondary Category Form Submission
  const handleSecondaryCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    axios.post('http://127.0.0.1:8000/api/secondary-category/', { 
      name: secondaryCategoryName,
      parent_category: selectedPrimaryCategoryName  // Send the name here
    })
      .then((response) => {
        alert('Secondary Category created successfully!');
        setSecondaryCategoryName(''); // Reset the form field
      })
      .catch((error) => {
        console.error('There was an error creating the secondary category!', error);
      });
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Primary Category Form */}
      <form onSubmit={handlePrimaryCategorySubmit} className="mb-6 w-full max-w-md">
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Primary Category Name:
        </label>
        <input 
          type="text" 
          value={primaryCategoryName} 
          onChange={(e) => setPrimaryCategoryName(e.target.value)} 
          className="w-full px-3 py-2 border rounded shadow-sm"
          placeholder="Enter Primary Category Name"
          required 
        />
        <button 
          type="submit" 
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Primary Category
        </button>
      </form>

      {/* Secondary Category Form */}
      <form onSubmit={handleSecondaryCategorySubmit} className="w-full max-w-md">
        {/* Primary Category Dropdown */}
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Select Primary Category:
        </label>
        <select 
            value={selectedPrimaryCategoryName}  // Using the name here
            onChange={(e) => setSelectedPrimaryCategoryName(e.target.value)} 
            className="w-full px-3 py-2 border rounded shadow-sm mb-4"
            required
        >
          <option value="" disabled>Select a Primary Category</option>
          {primaryCategories.map((category) => (
            <option key={category.id} value={category.name}>  {/* Send the 'name' */}
              {category.name}
            </option>
          ))}
        </select>

        {/* Secondary Category Name */}
        <label className="block mb-2 text-sm font-bold text-gray-700">
          Secondary Category Name:
        </label>
        <input 
          type="text" 
          value={secondaryCategoryName} 
          onChange={(e) => setSecondaryCategoryName(e.target.value)} 
          className="w-full px-3 py-2 border rounded shadow-sm"
          placeholder="Enter Secondary Category Name"
          required 
        />
        <button 
          type="submit" 
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
        >
          Add Secondary Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
