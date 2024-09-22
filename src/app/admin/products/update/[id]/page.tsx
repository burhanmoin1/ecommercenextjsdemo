import ProductForm from "@/app/components/ProductForm";
import UpdateProductForm from "@/app/components/ProductUpdateForm";
import ProductUpdateForm from "@/app/components/ProductUpdateForm";
import HeaderBar from "@/app/sidebarcomponents/HeaderBar";
import Sidebar from "@/app/sidebarcomponents/Sidebar";

export default function ProductsUpdatePage() {
  return (
    <div>
    <Sidebar />
    <HeaderBar />
    {/* Add padding to account for the fixed HeaderBar */}
    <div className="bg-[#f1f1f1] min-h-screen 2xl:ml-56 lg:ml-56 md:ml-56 sm:ml-0 ml-0 pt-24 p-4">
      <UpdateProductForm />
    </div>
  </div>
  );
}
