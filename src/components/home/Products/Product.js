import React, { useEffect, useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";
import { GiReturnArrow } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineLabelImportant } from "react-icons/md";
import productService from "../../../services/productService";

const Product = () => {
  const [products, setProducts] = useState([]);

  const Image = ({ className, imgSrc }) => (
    <img className={className} src={imgSrc} alt="Product" />
  );

  const Badge = ({ text }) => <span className="badge">{text}</span>;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await productService.getFeaturedProducts();
        setProducts(products);
        console.log(products, "all products");
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full">
      {products.length > 0 ? (
        <div className="d-flex grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative group border rounded-lg shadow-md p-4 w-full"
            >
              <div className="w-full h-[300px] relative overflow-hidden">
                <Image
                  className="w-full h-full object-contain"
                  imgSrc={product.url}
                />

                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-6 left-8">
                    <Badge text="New" />
                  </div>
                )}

                {/* Hover Actions */}
                <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
                  <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
                    <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                      Compare test
                      <span>
                        <GiReturnArrow />
                      </span>
                    </li>
                    <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                      Add to Cart
                      <span>
                        <FaShoppingCart />
                      </span>
                    </li>
                    <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                      View Details
                      <span className="text-lg">
                        <MdOutlineLabelImportant />
                      </span>
                    </li>
                    <li className="text-[#767676] hover:text-primeColor text-sm font-normal border-b-[1px] border-b-gray-200 hover:border-b-primeColor flex items-center justify-end gap-2 hover:cursor-pointer pb-1 duration-300 w-full">
                      Add to Wish List
                      <span>
                        <BsSuitHeartFill />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products available</p>
      )}
    </div>
  );
};

export default Product;
