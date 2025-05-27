import CategoryGrid from "../components/Categories";
import CompaniesGrid from "../components/Companies";
import FeaturedProducts from "../components/FeaturedProducts";
import Hero from "../components/Hero";
import Loading from "../components/Loading";
import RecentViewed from "../components/RecentViewed";
import RecommendedProducts from "../components/RecommendedProducts";
import TopSellingProduct from "../components/TopSellingProduct";
import { useFeaturedProductsQuery } from "../features/api";
import { useErrors } from "../hooks/hook";

const Landing = () => {
  const { isLoading, data, isError, error, refetch } =
    useFeaturedProductsQuery(true);

  useErrors([{ isError, error }]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <CategoryGrid />
      <Hero productsData={data} />
      <CompaniesGrid />
      <RecommendedProducts />
      <TopSellingProduct productsData={data} />
      <RecentViewed />
    </>
  );
};
export default Landing;
