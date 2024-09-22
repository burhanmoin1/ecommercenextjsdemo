import CategoryForm from "../components/CategoryForm";
import HeaderBar from "../sidebarcomponents/HeaderBar";
import Sidebar from "../sidebarcomponents/Sidebar";

export default function SettingsPage() {
  return (
    <div>
       <Sidebar />
       <HeaderBar />
       <div className="bg-[#f1f1f1] min-h-screen 2xl:ml-56 lg:ml-56 md:ml-56 sm:ml-0 ml-0 pt-24 p-4">      
       <h1 className="text-2xl ">Settings</h1>
        <CategoryForm />
      </div>
    </div>
  );
}
