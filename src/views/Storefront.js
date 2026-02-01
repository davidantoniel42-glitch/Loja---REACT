import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

function Storefront({ localProducts }) {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Placeholder seguro
  const FALLBACK_IMAGE = "https://via.placeholder.com/300x300?text=Sem+Imagem";

  // Normaliza QUALQUER produto (API ou local)
  function normalizeProduct(product) {
    return {
      id: product.id,
      title: product.title || "Produto sem nome",
      price: product.price || 0,
      description: product.description || "",
      category: product.category || "custom",
      image:
        product.image && product.image.startsWith("http")
          ? product.image
          : FALLBACK_IMAGE,
    };
  }

  // Busca API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setApiProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos da API", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Junta tudo e NORMALIZA
  const allProducts = [...localProducts, ...apiProducts].map(normalizeProduct);

  if (loading) {
    return <p>Carregando produtos...</p>;
  }

  return (
    <div className="grid">
      {allProducts.map((product) => (
        <div key={product.id} className="col-12 sm:col-6 md:col-4 lg:col-3">
          <Card
            title={product.title}
            subTitle={`R$ ${product.price}`}
            className="h-full"
            header={
              <img
                src={product.image}
                alt={product.title}
                className="w-full border-round-top"
                style={{ height: "220px", objectFit: "contain" }}
              />
            }
          >
            <p className="text-sm text-600">
              {product.description || "Sem descrição"}
            </p>

            <Button
              label="Ver detalhes"
              icon="pi pi-eye"
              className="p-button-sm mt-3"
            />
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Storefront;
