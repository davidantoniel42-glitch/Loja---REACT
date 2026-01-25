import React, { useState, useEffect } from "react";

import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { Button } from "primereact/button";

import Storefront from "./views/Storefront";
import ProductForm from "./components/ProductForm";

function App() {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("meuAcervoArtes");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [view, setView] = useState("loja");

  useEffect(() => {
    localStorage.setItem("meuAcervoArtes", JSON.stringify(products));
  }, [products]);

  const addProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
    setView("loja");
  };

  return (
    <div className="bg-bluegray-50 min-h-screen">
      <header className="bg-teal-700 text-white p-4 shadow-3">
        <div
          className="flex justify-content-between align-items-center"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          <h1 className="cursor-pointer" onClick={() => setView("loja")}>
            <i className="pi pi-palette mr-2"></i> ARTES & CORES
          </h1>

          <Button
            label={
              view === "loja" ? "Cadastrar Nova Arte" : "Voltar para Galeria"
            }
            icon={view === "loja" ? "pi pi-plus" : "pi pi-arrow-left"}
            onClick={() => setView(view === "loja" ? "cadastro" : "loja")}
          />
        </div>
      </header>

      <main className="p-4" style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {view === "loja" ? (
          <Storefront products={products} setProducts={setProducts} />
        ) : (
          <ProductForm onAddProduct={addProduct} />
        )}
      </main>
    </div>
  );
}

export default App;
