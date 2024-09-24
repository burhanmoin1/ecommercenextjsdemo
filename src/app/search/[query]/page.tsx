import TestTwoHeader from "@/app/headercomp/Header";
import ItemsHeader from "@/app/headercomp/ItemsHeader";
import SearchPage from "@/app/components/SearchPage";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Search results",
  
};


export default function Search() {
  return (
    <div>
      <TestTwoHeader />
      <ItemsHeader />
      <SearchPage />

      </div>
  );
}
