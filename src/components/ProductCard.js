import React, { useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const ProductCard = ({ product }) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Card
        title={product.title}
        subTitle={`R$ ${product.price}`}
        header={
          <img
            src={product.image}
            alt={product.title}
            style={{ height: "230px", objectFit: "cover", width: "100%" }}
          />
        }
      >
        <Button
          label="Ver Detalhes"
          icon="pi pi-search"
          className="p-button-outlined p-button-teal w-full"
          onClick={() => setVisible(true)}
        />
      </Card>

      <Dialog
        header="Detalhes do Produto"
        visible={visible}
        style={{ width: "90vw", maxWidth: "450px" }}
        onHide={() => setVisible(false)}
      >
        <img
          src={product.image}
          alt={product.title}
          className="w-full border-round mb-3"
        />

        <h2 className="m-0">{product.title}</h2>
        <h3 className="text-teal-600 mb-3">R$ {product.price}</h3>
        <p>{product.description}</p>

        <Button
          label="Fechar"
          className="p-button-teal w-full mt-3"
          onClick={() => setVisible(false)}
        />
      </Dialog>
    </>
  );
};

export default ProductCard;
