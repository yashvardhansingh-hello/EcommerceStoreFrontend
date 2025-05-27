import { Link } from "react-router-dom";
import { formatPrice } from "../utils";
import Loading from "./Loading";
import ProductsGrid from "./ProductsGrid";
import SectionTitle from "./SectionTitle";
import { BsStarFill } from "react-icons/bs";

const FeaturedProducts = ({title, data }) => {
const productData = data?.products || [];

  return (
    <div className="pt-24 ">
      <SectionTitle text={title} />
      <ProductsGrid data={productData} />
    </div>
  );
};
export default FeaturedProducts;
