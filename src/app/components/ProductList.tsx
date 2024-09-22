'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Product {
  name: string;
  description: string;
  brand: string;
  sku: string;
  selling_price: string;
  cost_price: string;
  discount?: string;
  inventory: number;
  weight: string;
  weight_unit: string;
  images: string[];
  profit: string;
  created: string;
  updated: string;
  primary_category?: string;
  secondary_category?: string;
  product_id: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch the product data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/create-product/');
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="border border-gray-300 rounded-lg shadow-md p-4">
            <div className='flex'>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <Link href={`/products/update/${product.product_id}`}>
                Update product
              </Link>
            </div>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            
            <p className="text-sm font-medium text-gray-800">Product id: {product.product_id}</p>
            <p className="text-sm font-medium text-gray-800">SKU: {product.sku}</p>
            <p className="text-sm font-medium text-gray-800">Price: ${product.selling_price}</p>
            <p className="text-sm font-medium text-gray-800">Discount: {product.discount ? `${product.discount}%` : 'No discount'}</p>
            <p className="text-sm font-medium text-gray-800">Inventory: {product.inventory}</p>
            <p className="text-sm font-medium text-gray-800">Weight: {product.weight} {product.weight_unit}</p>
            <p className="text-sm font-medium text-gray-800">Profit: ${product.profit}</p>
            <p className="text-sm font-medium text-gray-800">Primary Category: {product.primary_category || 'N/A'}</p>
            <p className="text-sm font-medium text-gray-800">Secondary Category: {product.secondary_category || 'N/A'}</p>

            {/* Display product images */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {product.images.length > 0 ? (
                product.images.map((image, i) => (
                  <img
                    key={i}
                    src={`http://127.0.0.1:8000/media/${image}`}
                    alt={`${product.name} image ${i + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))
              ) : (
                <p className="text-sm text-gray-500 col-span-2">No images available</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
