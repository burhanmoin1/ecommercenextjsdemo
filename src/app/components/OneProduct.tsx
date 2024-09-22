import Image from 'next/image';
import { StaticImageData } from 'next/image';
import DamakGece from '@/app/assets/productimages/DamakGece.png';
import oreosandw from '@/app/assets/productimages/oreosandw.png';
import ExtraRefresher from '@/app/assets/productimages/ExtraRefresher.png';
import Depufff from '@/app/assets/productimages/De-pufff.png';

interface Product {
    name: string;
    brand: string;
    sku: string;
    primary_category: string;
    secondary_category: string;
    selling_price: number;
    image: StaticImageData;
}

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="mt-24 w-[50%] h-[40vh] bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 transform hover:scale-105">
            <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={50}
                className="w-full h-[20vh] object-cover"
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold truncate">{product.name}</h2>
                <p className="text-md text-gray-600">Rs.{product.selling_price.toFixed(2)}</p>
                <button
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

// Example usage with the provided products
const products: Product[] = [
    {
        name: 'Nestle Damak Gece 55% Kakao Chocolate 60g',
        brand: 'Nestle',
        sku: '8690632994079',
        primary_category: 'Food Cupboard',
        secondary_category: 'Chocolate',
        selling_price: 825.00,
        image: DamakGece,
    },
    {
        name: 'Milka Oreo Sandwich Chocolate 92g',
        brand: 'Oreo',
        sku: '7622202211867',
        primary_category: 'Food Cupboard',
        secondary_category: 'Chocolate',
        selling_price: 1000.00,
        image: oreosandw,
    },
    {
        name: "Wrigley's Extra Refresher's Strawberry Lemon Gum 30s",
        brand: "Wrigley's",
        sku: '4009900544580',
        primary_category: 'Food Cupboard',
        secondary_category: 'Candies, Gums & Mints',
        selling_price: 1390.00,
        image: ExtraRefresher,
    },
    {
        name: "Byoma De-pufff + Brighten Eye Gel 20ml",
        brand: "Byoma",
        sku: '5060489794154',
        primary_category: 'Health & Beauty',
        secondary_category: 'Face & Skin Care',
        selling_price: 1390.00,
        image: Depufff,
    },
];

const ProductList: React.FC = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-2 gap-6 p-4">
            {products.map((product) => (
                <ProductCard key={product.sku} product={product} />
            ))}
        </div>
    );
};

export default ProductList;
