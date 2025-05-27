import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { showNotification } from "../common/headerSlice"
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { setPageTitle } from "../../../../features/adminHeader/headerSlice.js";
import AdminLayout from "../../AdminLayout/AdminLayout.jsx";
import TitleCard from "../../components/Cards/TitleCard.jsx";
import SearchBar from "../../components/Input/SearchBar.jsx";
import { RECENT_TRANSACTIONS } from "../../utils/dummyData.js";
import { useLazyAdminFilterProductsQuery, useLazyFilterProductsQuery } from "../../../../features/api.js";
import { useNavigate } from "react-router-dom";
// import Loading from "../../../../components/Loading.jsx";

const TopSideButtons = ({
  removeFilter,
  applyFilter,
  applySearch,
  search,
  setSearch,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  useEffect(() => {
    dispatch(setPageTitle({ title: "Product" }));
  }, []);

  const showFiltersAndApply = (params) => {
    applyFilter(params);
    setFilterParam(params);
  };

  const removeAppliedFilter = () => {
    removeFilter();
    setFilterParam("");
    setSearchText("");
  };

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter();
    } else {
      applySearch(searchText);
    }
  }, [searchText]);

  return (
    <div className="inline-block float-right">
      <SearchBar
        searchText={search}
        styleClass="mr-4"
        setSearchText={setSearch}
      />
      {filterParam != "" && (
        <button
          onClick={() => removeAppliedFilter()}
          className="btn btn-xs mr-2 btn-active btn-ghost normal-case"
        >
          {filterParam}
          <XMarkIcon className="w-4 ml-2" />
        </button>
      )}
      {/* <div className="dropdown dropdown-bottom dropdown-end">
        <label tabIndex={0} className="btn btn-sm btn-outline">
          <FunnelIcon className="w-5 mr-2" />
          Filter
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-10 menu p-2 text-sm shadow bg-base-100 rounded-box w-52"
        >
          {locationFilters.map((l, k) => {
            return (
              <li key={k}>
                <a onClick={() => showFiltersAndApply(l)}>{l}</a>
              </li>
            );
          })}
          <div className="divider mt-0 mb-0"></div>
          <li>
            <a onClick={() => removeAppliedFilter()}>Remove Filter</a>
          </li>
        </ul>
      </div> */}
      <button
        className="btn btn-outline btn-primary  btn-sm z-10"
        onClick={() => navigate(`/admin/product/add`)}
      >
        Add Product
      </button>
    </div>
  );
};

const Product = () => {
  const [trans, setTrans] = useState(RECENT_TRANSACTIONS);

  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);

  const [fetchFilteredProducts] = useLazyAdminFilterProductsQuery();

  useEffect(() => {
    setIsLoading(true);
    const query = `?search=${search}&category=${"all"}&company=${"all"}&order=${"none"}&price=${1000000000}`;
    fetchFilteredProducts(query)
      .then(({ data }) => {
        setProductsData(data?.products);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
      });
  }, [search]);

  const removeFilter = () => {
    // setTrans(RECENT_TRANSACTIONS);
  };

  const applyFilter = (params) => {
    // let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
    //   return t.location == params;
    // });
    // setTrans(filteredTransactions);
  };

  // Search according to name
  const applySearch = (value) => {
    // let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
    //   return (
    //     t.email.toLowerCase().includes(value.toLowerCase()) ||
    //     t.email.toLowerCase().includes(value.toLowerCase())
    //   );
    // });
    // setTrans(filteredTransactions);
  };

  return (
    <>
      <TitleCard
        title="Recent Products"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
            search={search}
            setSearch={setSearch}
            applySearch={applySearch}
            applyFilter={applyFilter}
            removeFilter={removeFilter}
          />
        }
      >
        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Category</th>
                <th>Price</th>
                {/* <th>Updated At</th> */}
              </tr>
            </thead>
            <tbody className="w-full">
              {productsData?.map((l, k) => {
                return (
                  <tr key={l._id}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img
                              src={l.image.url}
                              alt="Avatar"
                              className="bg-fit"
                            />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{l.title}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.company.name}</td>
                    <td>{l.category.name}</td>
                    <td>${l.price}</td>
                    {/* <td>{moment(l.updatedAt).format("D MMM")}</td> */}
                    <td>
                      <button
                        className="btn btn-xs btn-outline btn-primary"
                        onClick={() => navigate(`/admin/product/${l._id}`)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
};

// const Loading = () => {
//   return (
//     <div className="w-full h- flex items-center justify-center">
//       <span className="loading loading-ring loading-lg"></span>
//     </div>
//   );
// };

export default AdminLayout()(Product);
