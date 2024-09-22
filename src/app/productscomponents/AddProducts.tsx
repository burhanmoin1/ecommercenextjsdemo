import Image from "next/image";
import searchIcon from '@/app/assets/icons/searchgray.png';
import filterIcon from '@/app/assets/icons/filtergray.png';
import sortgray from '@/app/assets/icons/sortgray.png';
import Link from "next/link";

const AddProducts = () => {
    return (
        <div>
        <div className="bg-white w-full p-2 mt-6 rounded-md border-b-2 border-b-[#e3e3e3]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <h2 className="p-2 inline-block border bg-[#f2f2f2] border-[#f2f2f2] text-[#bababa] rounded-md cursor-default">All</h2>
                    <h2 className="text-xl ml-4 text-[#bababa] cursor-default">+</h2>
                </div>
                <div className="relative flex ml-auto border bg-[#f2f2f2] px-4 py-2 mr-2 rounded-lg group">
                   
                    <Image src={searchIcon} alt="Search Icon" width={16} height={16} />
                    <Image src={filterIcon} alt="Filter Icon" width={16} height={16} className="ml-4" />

                    
                    <span className="absolute bottom-12 left-6 transform -translate-x-1/2 whitespace-nowrap bg-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Search and Filter
                    </span>
                </div>

            
                <div className="relative flex items-center group px-4 py-2 bg-[#f2f2f2] rounded-lg border">
                    <Image src={sortgray} alt="Sort Icon" width={16} height={16} />
           
                    <span className="absolute bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        Sort
                    </span>
                </div>
            </div>
        </div>
        <div className="h-80 2xl:h-96 xl:h-96 lg:h-72 md:h-96 bg-white  flex flex-col justify-center text-left px-4">
            <div className="2xl:ml-20 xl:ml-20">
            <h2 className="text-3xl">Add your products</h2>
            <p>Inventory is empty, start by adding products.</p>
            <Link href='/products/add'>
            <button className="text-white bg-[#1a1a1a] p-2 px-4 rounded-lg mt-6 hover:bg-[#353333]">+ Add Product</button></Link>
            </div>
        </div>
    </div>
    );
};

export default AddProducts;
