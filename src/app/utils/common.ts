import DamakGece from '@/app/assets/productimages/DamakGece.jpg';
import oreosandw from '@/app/assets/productimages/oreosandw.jpg';
import Depufff from '@/app/assets/productimages/De-pufff.jpg';
import LindtVegan100g from '@/app/assets/productimages/LindtVegan100g.jpg';
import WrigleysExtraRefreshers from '@/app/assets/productimages/WrigleysExtraRefreshers.jpg';
import mrbeastoriginalchocolate from '@/app/assets/productimages/mrbeastoriginal.jpg';
import mrbeastpeanutchocolate from '@/app/assets/productimages/Feastables-MrBeast-Peanut-Butter.jpg';
import mrbeastmilkchocolate from '@/app/assets/productimages/mrbeastmilkchocolate.jpg';

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
      name: "Feastables MrBeast Original Chocolate Bar, 2.1 oz (60g), 1 bar",
      brand: "Feastables",
      sku: '83959702',
      primary_category: 'Food Cupboard',
      secondary_category: 'Chocolate',
      selling_price: 2000.00,
      image: mrbeastoriginalchocolate,
  },
  {
    name: "Feastables MrBeast Peanut Butter Bar, 2.1 oz (60g), 1 bar",
    brand: "Feastables",
    sku: '83969702',
    primary_category: 'Food Cupboard',
    secondary_category: 'Chocolate',
    selling_price: 2100.00,
    image: mrbeastpeanutchocolate,
},
{
    name: "Feastables MrBeast Milk Chocolate Bar, 2.1 oz (60g), 1 bar",
    brand: "Feastables",
    sku: '83969802',
    primary_category: 'Food Cupboard',
    secondary_category: 'Chocolate',
    selling_price: 2100.00,
    image: mrbeastmilkchocolate,
},
  
];

  
export default products;
  
