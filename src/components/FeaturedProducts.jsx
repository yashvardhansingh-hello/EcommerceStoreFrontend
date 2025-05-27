import { Link } from "react-router-dom";
import { formatPrice } from "../utils";
import Loading from "./Loading";
import ProductsGrid from "./ProductsGrid";
import SectionTitle from "./SectionTitle";
import { BsStarFill } from "react-icons/bs";

const FeaturedProducts = ({title, data }) => {
const productData = data?.products || [];
const products = productData;

  return (
    <div className="pt-5">
      <SectionTitle text={title}/>
 <div className="mt-6 overflow-hidden shadow-2xl grid grid-cols-2 border-4 border-base-200 bg-base-100 rounded-2xl">
      {products?.slice(0,4).map((product) => {
        const { title, price, image, rating, ratingData } = product;
        const dollarsAmount = formatPrice(price);
        return (
          <Link
            key={product._id}
            to={`/products/${product._id}`}
            className=" w-full bg-base-100"
          >
            <figure className="px-4 pt-4">
              <img
                src={image.url}
                alt={title}
                className="rounded-xl  md:h-[15rem] w-[17rem] h-[10rem]  object-cover"
              />
            </figure>

            {/* <div className="flex flex-row justify-start mt-3 pl-6  items-center">
              <div
                className={`flex flex-row justify-center items-center py-1 px-3 gap-1 rounded-md ${
                  product?.rating >= 3 ? " bg-green-600" : " bg-yellow-500"
                }`}
              >
                <p className="text-white text-[0.9rem]  font-bold">
                  {product?.rating}
                </p>
                <BsStarFill className="text-white" size={11} />
              </div>

              <p className="ml-2 text-blue-400 text-sm font-medium">
                {product?.ratingData?.length} ratings
              </p>
            </div> */}

            <div className="card-body justify-start items-start text-start p-1 pb-6 px-6">
              <h2 className="text-md font-semibold ">{title}</h2>
              <span className="text-sm text-primary  text-start">
                {dollarsAmount}
              </span>
            </div>
          </Link>
        );
      })}
    </div>    </div>
  );
};
export default FeaturedProducts;
