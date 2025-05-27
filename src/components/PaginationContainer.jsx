import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLazyFilterProductsQuery } from "../features/api";
import { addProducts } from "../features/loading/productsSlice";

const PaginationContainer = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get current page from URL query
  const searchParams = new URLSearchParams(search);
  const currentPage = Number(searchParams.get("page")) || 1;

  // Get pageCount from backend via Redux state
  const { pageCount = 1 } = useSelector((state) => state.productState);

  // Create page numbers
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  const [fetchFilteredProducts] = useLazyFilterProductsQuery();

  const handlePageChange = (pageNumber) => {
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
    const queryString = searchParams.toString();
    fetchFilteredProducts(`?${queryString}`)
      .then(({ data }) => {
        dispatch(addProducts(data));
      })

      .catch(console.error);
  };

  if (pageCount < 2) return null;

  return (
    <div className="mt-16 flex justify-center md:justify-center">
      <div className="join">
        {/* Prev */}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() =>
            handlePageChange(currentPage > 1 ? currentPage - 1 : pageCount)
          }
        >
          Prev
        </button>

        {/* Page Numbers */}
        {pages.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`btn btn-xs sm:btn-md border-none join-item ${
              pageNumber === currentPage ? "bg-base-300 text-base-content" : ""
            }`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Next */}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={() =>
            handlePageChange(currentPage < pageCount ? currentPage + 1 : 1)
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationContainer;
