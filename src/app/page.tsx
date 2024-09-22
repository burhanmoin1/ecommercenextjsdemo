import TestTwoHeader from "./headercomp/Header";
import ProductTest from "./components/ProductTest";
import ItemsHeader from "./headercomp/ItemsHeader";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <TestTwoHeader />
      <ItemsHeader />
      <ProductTest />
      <Footer />
      </div>

  );
}
