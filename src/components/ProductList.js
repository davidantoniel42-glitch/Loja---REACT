import ProductCard from "./ProductCard";

function ProductList({ products }) {
  return (
    <div className="grid">
      {products.map((product) => (
        <div key={product.id} className="col-12 md:col-4 lg:col-3">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;
