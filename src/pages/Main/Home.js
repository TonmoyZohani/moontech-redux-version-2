import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { toggleBrand, toggleStock } from "../../redux/actions/filterActions";

const Home = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const filterStore = useSelector((state) => state.filter.filters);

  const { brands, stock } = filterStore;

  console.log(brands, stock);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const activeClass = "text-white  bg-indigo-500 border-white";
  let content;

  if (products.length) {
    content = products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  }

  if (products.length && (stock || brands.length)) {
    content = products
      .filter((product) => {
        if (stock) {
          return product.status === true;
        } else {
          return product;
        }
      })
      .filter((product) => {
        if (brands.length) {
          return brands.includes(product.brand);
        } else {
          return product;
        }
      })
      .map((product) => <ProductCard key={product.id} product={product} />);
  }

  return (
    <div className="max-w-7xl gap-14 mx-auto my-10">
      <div className="mb-10 flex justify-end gap-5">
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            stock ? activeClass : null
          } `}
          onClick={() => dispatch(toggleStock())}
        >
          In Stock
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("amd") ? activeClass : null
          }`}
          onClick={() => dispatch(toggleBrand("amd"))}
        >
          AMD
        </button>
        <button
          className={`border px-3 py-2 rounded-full font-semibold ${
            brands.includes("intel") ? activeClass : null
          }`}
          onClick={() => dispatch(toggleBrand("intel"))}
        >
          Intel
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">
        {content}
      </div>
    </div>
  );
};

export default Home;
