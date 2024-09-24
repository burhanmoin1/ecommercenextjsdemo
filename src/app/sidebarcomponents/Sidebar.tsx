'use client';  // Ensure this is a Client Component

import homeicon from '@/app/assets/icons/iconhome.png';
import inventoryicon from '@/app/assets/icons/icons8-tag-50.png';
import ordersicon from '@/app/assets/icons/icons8-order-50.png';
import analyticsicon from '@/app/assets/icons/icons8-sales-50.png';
import Link from 'next/link';
import { usePathname } from 'next/navigation';  // Use usePathname from next/navigation
import Image from 'next/image';
import settingscon from '@/app/assets/icons/icons8-settings-50.png';

const Sidebar = () => {
  const pathname = usePathname();  // Get the current path

  const isActive = (path: string) => {
    return pathname === path
      ? 'bg-[rgb(236,236,236)] border-4 border-r-[#262626]' // Active link style
      : '';  // Default link style
  };

  

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="fixed left-0 top-16 h-[calc(100%-5rem)] min-h-screen w-56 hidden 2xl:block xl:block lg:block md:block sm:hidden shadow-lg">
        <ul>
          <Link href="/admin/home" className={`block cursor-pointer p-4 border-4 border-white hover:opacity-65 mt-2 ${isActive('/')}`}>
            <li className="flex items-center">
              <Image src={homeicon} alt="homeicon" width={16} height={16} className="m-1 mr-2" /> 
              <span className="text-base">Home</span>
            </li>
          </Link>

          <Link href="/admin/orders" className={`block cursor-pointer p-4 border-4 border-white hover:opacity-65 ${isActive('/orders')}`}>
            <li className="flex items-center">
              <Image src={ordersicon} alt="ordersicon" width={16} height={16} className="m-1 mr-2" /> 
              <span className="text-base">Orders</span>
            </li>
          </Link>

          <Link href="/admin/products" className={`block cursor-pointer p-4 border-4 border-white hover:opacity-65 ${isActive('/products')}`}>
            <li className="flex items-center">
              <Image src={inventoryicon} alt="inventoryicon" width={16} height={16} className="m-1 mr-2" />
              <span className="text-base">Products</span>
            </li>
          </Link>

          <Link href="/admin/analytics" className={`block cursor-pointer p-4 border-4 border-white hover:opacity-65 ${isActive('/analytics')}`}>
            <li className="flex items-center">
              <Image src={analyticsicon} alt="analyticsicon" width={16} height={16} className="m-1 mr-2" /> 
              <span className="text-base">Analytics</span>
            </li>
          </Link>

          <Link href="/admin/settings" className={`block cursor-pointer p-4 border-4 border-white hover:opacity-65 ${isActive('/settings')}`}>
            <li className="flex items-center">
              <Image src={settingscon} alt="analyticsicon" width={16} height={16} className="m-1 mr-2" /> 
              <span className="text-base">Settings</span>
            </li>
          </Link>

          <li className="cursor-pointer p-6 text-gray-700">
            Logout
          </li>
        </ul>
      </div>


       
              
    </div>
  );
};

export default Sidebar;
