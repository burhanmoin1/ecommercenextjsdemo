import HeaderBar from "@/app/sidebarcomponents/HeaderBar";
import Sidebar from "@/app/sidebarcomponents/Sidebar";

export default function OrdersPage() {
  return (
    <div>
    <Sidebar />
    <HeaderBar />
    {/* Add padding to account for the fixed HeaderBar */}
    <div className="bg-[#f6f8fa] min-h-screen 2xl:ml-56 lg:ml-56 md:ml-56 sm:ml-0 ml-0 pt-24 p-6">      <h1 className="text-2xl ">Orders</h1>
      <p>Welcome to the Order section of your dashboard.</p>
    </div>
  </div>
  );
}