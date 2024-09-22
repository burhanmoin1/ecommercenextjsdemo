'use client';
import { useEffect, useState } from 'react';
import products from '../utils/common';
import { Product } from '../utils/common';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import backarrow from '@/app/assets/icons/backarrow.png';
import { addToCart, toggleCartMenu } from '../redux/slices/cartSlice';
import Link from 'next/link';

const ProductPage: React.FC = () => {
    const { name } = useParams();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1); // State for quantity control
    const [subtotal, setSubtotal] = useState(0); // State for subtotal

    const formatName = (nameParam: string) => {
        return decodeURIComponent(nameParam).replace(/-/g, ' ').replace('--', '+');
    };   

    const handleQuantityChange = (type: string) => {
        if (type === 'decrease' && quantity > 1) {
          setQuantity((prev) => prev - 1);
        } else if (type === 'increase') {
          setQuantity((prev) => prev + 1);
        }
    };

    const formattedName = Array.isArray(name) 
        ? formatName(name[0] || '') 
        : formatName(name || '');

    const [product, setProduct] = useState<Product | undefined>();

    const handleAddToCart = (product: Product) => {
        const cartItem = { 
          id: product.sku, 
          name: product.name, 
          price: product.selling_price, 
          quantity,
          image: product.image
        };
      
        dispatch(addToCart(cartItem));
        dispatch(toggleCartMenu());
    };

    useEffect(() => {
        // Find the product based on the formatted name
        const foundProduct = products.find((p) => p.name === formattedName);
        setProduct(foundProduct);
    }, [formattedName]);

    useEffect(() => {
        // Calculate subtotal whenever quantity or product price changes
        if (product) {
            setSubtotal(quantity * product.selling_price);
        }
    }, [quantity, product]);

    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="flex flex-col lg:flex-row items-center 2xl:mt-44 xl:mt-44 lg:mt-44 mt-14 p-4 space-y-4 lg:space-y-0">
            <div className="w-full lg:w-1/2">
                <Link href='/products'>
                    <Image src={backarrow} alt='back arrow' width={20} height={20} />
                </Link>
                <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={400} 
                    height={150} 
                    className="w-[75%] lg:w-[60%] mx-auto" 
                />
            </div>
            {/* Right side: Details */}
            <div className="w-full lg:w-1/2 space-y-2">
                <h1 className="text-2xl font-bold text-center 2xl:text-start">{product.name}</h1>
                <p className="font-semibold text-center 2xl:text-start">SKU: {product.sku}</p>
                <p className="text-lg text-center 2xl:text-start"><span className='font-semibold'>Brand:</span> {product.brand}</p>
                <p className="text-lg text-center 2xl:text-start">
                    Price: Rs. {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(product.selling_price)}
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center pt-8 space-x-4 justify-center 2xl:justify-start">
                    <button
                        onClick={() => handleQuantityChange('decrease')}
                        className="bg-gray-200 text-black px-3 py-1 rounded"
                    >
                        -
                    </button>
                    <span className="text-xl font-semibold">{quantity}</span>
                    <button
                        onClick={() => handleQuantityChange('increase')}
                        className="bg-gray-200 text-black px-3 py-1 rounded"
                    >
                        +
                    </button>
                </div>

                {/* Subtotal */}
                <p className="text-lg text-center 2xl:text-start pt-4">
                    Subtotal: Rs. {new Intl.NumberFormat('en-IN', { maximumFractionDigits: 2 }).format(subtotal)}
                </p>

                {/* Add to Cart button */}
                <div className="flex justify-center 2xl:justify-start xl:justify-start lg:justify-start space-x-4">
                    <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-black w-[80%] 2xl:w-[40%] text-white py-2 px-4 rounded transition transform active:scale-90"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
