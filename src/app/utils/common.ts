import DamakGece from '@/app/assets/productimages/DamakGece.jpg';
import oreosandw from '@/app/assets/productimages/oreosandw.jpg';
import Depufff from '@/app/assets/productimages/De-pufff.jpg';
import LindtVegan100g from '@/app/assets/productimages/LindtVegan100g.jpg';
import { StaticImageData } from 'next/image';

export interface Product {
    name: string;
    brand: string;
    sku: string;
    primary_category: string;
    secondary_category: string;
    selling_price: number;
    image: StaticImageData;
  }

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
      name: "Byoma De-pufff + Brighten Eye Gel 20ml",
      brand: "Byoma",
      sku: '5060489794154',
      primary_category: 'Health & Beauty',
      secondary_category: 'Face & Skin Care',
      selling_price: 1390.00,
      image: Depufff,
  },
  {
      name: 'Lindt Classic Recipe Vegan Hazelnut Chocolate 100g',
      brand: 'Lindt',
      sku: '4000539140365',
      primary_category: 'Food Cupboard',
      secondary_category: 'Chocolate',
      selling_price: 2200.00,
      image: LindtVegan100g,
  },
];

  
export default products;
  
