import AddProducts from "@/app/productscomponents/AddProducts";
import HeaderBar from "@/app/sidebarcomponents/HeaderBar";
import Sidebar from "@/app/sidebarcomponents/Sidebar";

export default function Home() {
  return (
    <div>
      
      <HeaderBar />
      <div className="rounded-full">
      <Sidebar />
      {/* Add padding to account for the fixed HeaderBar */}
      <div className="bg-[#f6f8fa] min-h-screen 2xl:ml-56 lg:ml-56 md:ml-56 sm:ml-0 ml-0 pt-24 p-6">
        <h1 className="text-2xl ">Home</h1>
        
      </div>
      </div>
    </div>
  );
}
