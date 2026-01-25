import React, { useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const ProductList = ({ products, setProducts }) => {
  useEffect(() => {
    if (products.length === 0) {
      axios
        .get("https://fakestoreapi.com/products?limit=6")
        .then((res) => {
          const artData = res.data.map((item, index) => ({
            ...item,
            // 💡 ALTERE AQUI: O nome padrão dos itens vindos da API e a descrição
            title: `Pintura em Aquarela #${item.id}`,
            description:
              "Trabalho original feito à mão com pigmentos profissionais sobre papel 100% algodão.",
            // 💡 ALTERE AQUI: O termo de busca para as fotos (ex: 'dog', 'fashion', 'tech')
            image: `https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?sig=${index}&w=500`,
          }));
          setProducts(artData);
        })
        .catch((err) => console.error(err));
    }
  }, [setProducts, products.length]);

  return (
    <div className="grid">
      {products.map((item) => (
        <div key={item.id} className="col-12 sm:col-6 lg:col-4 p-2">
          <ProductCard product={item} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
