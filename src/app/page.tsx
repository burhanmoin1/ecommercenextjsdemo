import ProductList from "./components/OneProduct";
import ShowProducts from "./components/ShowProducts";
import TestTwoHeader from "./headercomp/Header";
import ProductTest from "./components/ProductTest";
import ItemsHeader from "./headercomp/ItemsHeader";
import { StoreProvider } from "./redux/StoreProvider";

export default function Home() {
  return (
    <div>
      <TestTwoHeader />
      <ItemsHeader />
      <ProductTest />
      </div>

  );
}
