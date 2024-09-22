import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import AddProducts from "../productscomponents/AddProducts";
import ProductsAdded from "../productscomponents/ProductsAdded";
import HeaderBar from "../sidebarcomponents/HeaderBar";
import Sidebar from "../sidebarcomponents/Sidebar";

export default function InventoryPage() {
  return (
    <div>
    <Sidebar />
    <HeaderBar />
    {/* Add padding to account for the fixed HeaderBar */}
    <div className="bg-[#f1f1f1] min-h-screen 2xl:ml-56 lg:ml-56 md:ml-56 sm:ml-0 ml-0 pt-24 p-4">      
      <h1 className="text-2xl font-bold">Products</h1>
      <ProductsAdded />
    </div>
  </div>
  );
}
