import { useEffect, useState } from "react";
import api from "../services/api";
import ProductList from "../components/ProductList";

function Storefront() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const apiProducts = await api.get("/products");
      const localProducts =
        JSON.parse(localStorage.getItem("localProducts")) || [];

      setProducts([...localProducts, ...apiProducts.data]);
      setLoading(false);
    }

    loadProducts();
  }, []);

  if (loading) {
    return <p className="text-center mt-6">Carregando produtos...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-center mb-4">Loja 42 LTDAs</h1>
      <ProductList products={products} />
    </div>
  );
}

export default Storefront;
