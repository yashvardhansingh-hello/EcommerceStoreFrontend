import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { showNotification } from "../common/headerSlice"
import FunnelIcon from "@heroicons/react/24/outline/FunnelIcon";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { setPageTitle } from "../../../features/adminHeader/headerSlice.js";
import AdminLayout from "../AdminLayout/AdminLayout.jsx";
import TitleCard from "../components/Cards/TitleCard.jsx";
import SearchBar from "../components/Input/SearchBar.jsx";
import { RECENT_TRANSACTIONS } from "../utils/dummyData.js";
import { useAdminOrdersDataQuery } from "../../../features/api.js";
import { useErrors } from "../../../hooks/hook.jsx";
import Loading from "../../../components/Loading.jsx";

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }) => {
  const dispatch = useDispatch();

  const [filterParam, setFilterParam] = useState("");
  const [searchText, setSearchText] = useState("");
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"];

  useEffect(() => {
    dispatch(setPageTitle({ title: "Transactions" }));
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
        searchText={searchText}
        styleClass="mr-4"
        setSearchText={setSearchText}
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
      <div className="dropdown dropdown-bottom dropdown-end">
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
      </div>
    </div>
  );
};

const Transactions = () => {
  const [trans, setTrans] = useState(RECENT_TRANSACTIONS);

  const removeFilter = () => {
    setTrans(RECENT_TRANSACTIONS);
  };

  const applyFilter = (params) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
      return t.location == params;
    });
    setTrans(filteredTransactions);
  };

  // Search according to name
  const applySearch = (value) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => {
      return (
        t.email.toLowerCase().includes(value.toLowerCase()) ||
        t.email.toLowerCase().includes(value.toLowerCase())
      );
    });
    setTrans(filteredTransactions);
  };

  const { data, isError, error, refetch, isLoading } =
    useAdminOrdersDataQuery();

  useErrors([{ isError, error }]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="max-w-6xl w-full mx-auto mt-6 relative bg-base-100">
        <div className="w-full mx-auto p-0 md:p-4 lg:p-4 space-y-3">
          {data?.userOrders?.map((order) => (
            <div
              key={order._id}
              className="backdrop-blur-[50px] w-full rounded-xl shadow-md border border-base-300 p-6 space-y-2"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-2 text-base text-base-content">
                <div>
                  <span className="block text-sm font-medium text-base-content/70">
                    Order ID
                  </span>
                  <span className="text-md font-normal">{order._id}</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-base-content/70">
                    Phone
                  </span>
                  <span className="text-lg">{order.phone}</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-base-content/70">
                    Address
                  </span>
                  <span className="text-md font-light">{order.address}</span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-base-content/70">
                    NAME
                  </span>
                  <span className="text-lg capitalize">
                    {order.user.username}
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-base-content/70">
                    Status
                  </span>
                  <span
                    className={`badge badge-lg ${
                      order.status === "Delivered"
                        ? "badge-success"
                        : "badge-warning"
                    } mt-1`}
                  >
                    {order.status}
                  </span>
                </div>
                <div>
                  <span className="block text-sm font-medium text-base-content/70">
                    Total Paid
                  </span>
                  <span className="text-lg font-semibold">
                    ${order.orderTotal}{" "}
                    <span className="text-sm font-extralight">[{order.paymentWay} payment]</span>
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-base-content mb-3">
                  Items in this Order
                </h3>
                <div className="w-full grid grid-cols-3 gap-2">
                  {order?.products?.map((item, idx) => {
                    const product = item.productId;
                    return (
                      <div
                        key={idx}
                        className="bg-base-200 rounded-lg p-2 shadow-lg"
                      >
                        <div className="flex items-center w-full">
                          <img
                            src={product?.image?.url}
                            alt={product?.name}
                            className="w-[5rem] h-[6rem] shadow-md object-cover rounded-lg border"
                          />
                          <div className="ml-6 flex flex-col justify-center items-start gap-1 ">
                            <p className="font-bold text-sm  text-base-content capitalize">
                              {product?.title}
                            </p>
                            <p className="text-sm   text-base-content font-extrabold">
                              <span className="text-[0.7rem] font-extralight">
                                a product by
                              </span>{" "}
                              {product?.company?.name}
                            </p>
                            <p className="text-sm text-base-content/70">
                              <span className="font-bold">Quantity: </span>{" "}
                              {item?.quantity}
                            </p>
                            <p className="text-sm text-base-content/70 font-bold">
                              Price: ${item?.price}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminLayout()(Transactions);
