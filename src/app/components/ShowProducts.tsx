'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import products from '../utils/common';
import { Product } from '../utils/common';

const ShowProducts: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [priceFilter, setPriceFilter] = useState<number | null>(null);

  // Extract unique brands from products
  const uniqueBrands = Array.from(new Set(products.map(product => product.brand)));

  // Handle brand filter change
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => {
      const updated = new Set(prev);
      if (updated.has(brand)) {
        updated.delete(brand);
      } else {
        updated.add(brand);
      }
      return updated;
    });
  };

  // Handle price filtering
  const handlePriceFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(event.target.value);
    setPriceFilter(value);
    const filtered = products.filter(product => 
      (selectedBrands.size === 0 || selectedBrands.has(product.brand)) &&
      product.selling_price <= value
    );
    setFilteredProducts(filtered);
  };

  // Effect to update filtered products when selected brands or price filter change
  React.useEffect(() => {
    const filtered = products.filter(product =>
      (selectedBrands.size === 0 || selectedBrands.has(product.brand)) &&
      (priceFilter === null || product.selling_price <= priceFilter)
    );
    setFilteredProducts(filtered);
  }, [selectedBrands, priceFilter]);

  // Add to Cart function (dummy implementation)
  const addToCart = (product: Product) => {
    alert(`Added ${product.name} to cart!`);
  };

  return (
    <div className="p-4 mt-14">
      <div className="flex flex-col md:flex-row md:justify-between mb-4">
        <div className="mb-4 md:mb-0">
          <label className="mr-2">Filter by Brand:</label>
          <div className="flex flex-wrap">
            {uniqueBrands.map(brand => (
              <label key={brand} className="mr-4">
                <input
                  type="checkbox"
                  checked={selectedBrands.has(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="mr-2">Filter by Price (max):</label>
          <input
            type="number"
            value={priceFilter || ''}
            onChange={handlePriceFilterChange}
            className="p-2 border rounded"
            placeholder="Enter max price"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {filteredProducts.map(product => (
    <div key={product.sku} className="border p-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out flex flex-col bg-white">
      <div className="flex-1 flex flex-col items-center">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="object-cover mb-4 rounded"
        />
        <h2 className="text-xl font-bold mb-2 text-center">{product.name}</h2>
        <p className="text-green-600 text-lg font-semibold mb-2 text-center">Rs.{product.selling_price.toFixed(2)}</p>
      </div>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-transparent text-pink-500 border border-pink-500 px-4 py-2 rounded hover:bg-pink-500 hover:text-white transition-colors duration-300 ease-in-out"
      >
        Add to Cart
      </button>
    </div>
  ))}


      </div>
    </div>
  );
};

export default ShowProducts;
