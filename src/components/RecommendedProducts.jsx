import { Link } from "react-router-dom";
import { formatPrice } from "../utils";
import { BsStarFill } from "react-icons/bs";
import SectionTitle from "./SectionTitle";
import { useRecommendedProductsQuery } from "../features/api";
import { useErrors } from "../hooks/hook";

const RecommendedProducts = () => {
  const { data, error, isError } = useRecommendedProductsQuery();
  useErrors([{ isError, error }]);

  return (
    <section className="pt-14 px-4">
      <SectionTitle text="Recommended Products" />
      <div className="mt-3 bg-base-200 rounded-3xl p-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-4 w-max">
          {data?.products?.map((product) => {
            const { _id, title, price, image, rating, ratingData } = product;
            const dollarsAmount = formatPrice(price);

            return (
              <Link
                key={_id}
                to={`/products/${_id}`}
                className="group bg-base-100 shadow rounded-xl w-56 flex-shrink-0 hover:shadow-lg transition overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.url}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <h3 className="text-sm font-medium truncate">{title}</h3>
                  <p className="text-primary font-semibold">{dollarsAmount}</p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-xs font-semibold ${
                        rating >= 3 ? "bg-green-600" : "bg-yellow-500"
                      }`}
                    >
                      {rating}
                      <BsStarFill size={12} />
                    </span>
                    <span className="text-xs text-gray-500">
                      {ratingData?.length} ratings
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RecommendedProducts;
