import React, { useState, useEffect } from "react";

// PrimeReact
import "primereact/resources/themes/lara-light-teal/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import { Button } from "primereact/button";

// Views / Components
import Storefront from "./views/Storefront";
import ProductForm from "./components/ProductForm";

function App() {
  // Produtos cadastrados LOCALMENTE (admin)
  const [localProducts, setLocalProducts] = useState(() => {
    const saved = localStorage.getItem("meuCatalogoProdutos");
    return saved ? JSON.parse(saved) : [];
  });

  const [view, setView] = useState("loja");

  // Persistência local
  useEffect(() => {
    localStorage.setItem("meuCatalogoProdutos", JSON.stringify(localProducts));
  }, [localProducts]);

  function addProduct(newProduct) {
    setLocalProducts([newProduct, ...localProducts]);
    setView("loja");
  }

  return (
    <div className="bg-bluegray-50 min-h-screen">
      <header className="bg-teal-700 text-white p-4 shadow-3">
        <div
          className="flex justify-content-between align-items-center"
          style={{ maxWidth: "1100px", margin: "0 auto" }}
        >
          <h1
            className="m-0 text-xl md:text-2xl font-light tracking-wide cursor-pointer"
            onClick={() => setView("loja")}
          >
            <i className="pi pi-palette mr-2"></i>
            Peças e produtos
          </h1>

          <Button
            label={view === "loja" ? "Cadastrar nova peça" : "Voltar para Loja"}
            icon={view === "loja" ? "pi pi-plus" : "pi pi-arrow-left"}
            className="p-button-sm p-button-info"
            onClick={() => setView(view === "loja" ? "cadastro" : "loja")}
          />
        </div>
      </header>

      <main className="p-4 md:p-6 mx-auto" style={{ maxWidth: "1100px" }}>
        {view === "loja" ? (
          <Storefront localProducts={localProducts} />
        ) : (
          <div className="fadein">
            <h2 className="text-teal-900 mb-4">Novo Item na loja</h2>
            <ProductForm onAdd={addProduct} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
