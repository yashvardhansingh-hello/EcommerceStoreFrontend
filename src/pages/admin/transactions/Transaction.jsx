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


  return isLoading ? <Loading /> : (
    <>
      <TitleCard
        title="Recent Transactions"
        topMargin="mt-2"
        TopSideButtons={
          <TopSideButtons
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
                <th>User</th>
                <th>Product </th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {data?.orders?.map((l, k) => {
                return (
                  <tr key={k}>
                      <td className="font-bold">{l.user.username}</td>
                    <td>

                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={l.productId.image.url} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-light">{l.productId.title}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.quantity}</td>
                    <td>${l.orderTotal}</td>
                    <td>{moment(l.createdAt).format("D MMM")}</td>
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

export default AdminLayout()(Transactions);
