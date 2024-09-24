import TestTwoHeader from "../headercomp/Header";
import ProductTest from "../components/ProductTest";
import ItemsHeader from "../headercomp/ItemsHeader";
import Footer from "../components/Footer";

export const metadata = {
  title: "All products",
  
};


export default function Home() {
  return (
    <div>
      <TestTwoHeader />
      <ItemsHeader />
      <ProductTest />
   
      </div>

  );
}
