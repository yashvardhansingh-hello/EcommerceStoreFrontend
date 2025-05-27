import React from "react";
import { useTopSellingProductsUserQuery } from "../features/api";
import Loading from "./Loading";
import { useErrors } from "../hooks/hook";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";

const TopSellingProduct = ({ productsData }) => {
  const navigate = useNavigate();

  const { data, isError, error, refetch, isLoading } =
    useTopSellingProductsUserQuery();
  useErrors([{ isError, error }]);

  if (isLoading) return <Loading />;

  const products = data?.sortedProductsData || [];

  return (
    <section className=" lg:p-10">
      <div className="w-full h-auto  grid gap-8 grid-cols-1 sm:grid-cols-2  rounded-lg lg:grid-cols-2 xl:grid-cols-2">
        <FeaturedProducts title={"Featured Products"} data={productsData} />
        <div>
          <h2 className="text-4xl font-semibold text-center mb-10 text-base-content tracking-tight">
            Top Selling Products
          </h2>
          <div className="grid gap-3 shadow-2xl grid-cols-2 sm:grid-cols-2 bg-base-200 p-2 md:p-6 lgp-6 rounded-2xl lg:grid-cols-2 xl:grid-cols-2">
            {products.slice(0, 4).map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/products/${product._id}`)}
                className="rounded-2xl overflow-hidden shadow-md border border-base-200 bg-base-100 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <img
                  src={product.image.url}
                  alt={product.title}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5 space-y-3">
                  <h3 className="text-xl font-medium text-base-content">
                    {product.title}
                  </h3>
                  {/* <p className="text-sm text-base-content/70 line-clamp-3">
                {product.description}
              </p> */}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-base-content/60 font-bold">
                      {product.company?.name}
                    </span>

                    <span
                      className={`flex items-center ${
                        product.rating <= 3
                          ? "text-yellow-500"
                          : "text-green-500"
                      } text-sm gap-1`}
                    >
                      <FaStar className="text-sm" />
                      {product.rating.toFixed(1)}
                    </span>
                  </div>

                  <div className="text-lg font-semibold text-primary pt-1">
                    ${product.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellingProduct;
