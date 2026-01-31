import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";

function ProductForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      id: Date.now(),
      title,
      price,
      image,
      description: "Produto cadastrado manualmente",
      category: "custom",
    };

    onAdd(newProduct);

    setTitle("");
    setPrice(0);
    setImage("");
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2>Novo Produto</h2>

      <InputText
        placeholder="Nome do produto"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-3 w-full"
      />

      <InputNumber
        placeholder="Preço"
        value={price}
        onValueChange={(e) => setPrice(e.value)}
        className="mb-3 w-full"
      />

      <InputText
        placeholder="URL da imagem"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="mb-3 w-full"
      />

      <Button label="Cadastrar" />
    </form>
  );
}

export default ProductForm;
