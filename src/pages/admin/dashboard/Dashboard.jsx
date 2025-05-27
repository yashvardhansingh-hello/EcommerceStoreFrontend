import DashboardStats from './components/DashboardStats.jsx'
import AmountStats from './components/AmountStats.jsx'
import PageStats from './components/PageStats.jsx'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels.jsx'
import LineChart from './components/LineChart.jsx'
import BarChart from './components/BarChart.jsx'
import DashboardTopBar from './components/DashboardTopBar.jsx'
import { useDispatch } from 'react-redux'
// import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart.jsx'
import { useEffect } from 'react'
import AdminLayout from '../AdminLayout/AdminLayout.jsx'
import { setPageTitle } from '../../../features/adminHeader/headerSlice.js'
import { useFetchAdminStatsQuery } from '../../../features/api.js'
import { useErrors } from '../../../hooks/hook.jsx'
import axios from 'axios'
import { server } from '../../../features/config.js'
import Loading from '../../../components/Loading.jsx'
import { BsBuilding, BsCart } from 'react-icons/bs'
import CategoriesData from './components/CategoriesData.jsx'
import DoughnutChartCategories from './components/DoughnutChartCategories.jsx'





const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setPageTitle({ title: "Dashboard" }));
  }, []);

  const { data, isError, isLoading, error, refetch } =
    useFetchAdminStatsQuery();

  useErrors([{isError, error}]);

  const statsData = [
    {
      title: "Users",
      value: `${data?.userCount || 0}`,
      icon: <UserGroupIcon className="w-8 h-8" />,
      description: "↗︎ 2300 (22%)",
    },
    {
      title: "Products",
      value: `${data?.totalProducts || 0}`,
      icon: <BsCart className="w-8 h-8" />,
      description: "↗︎ 2300 (22%)",
    },
    {
      title: "Companies",
      value: `${data?.companiesCount || 0}`,
      icon: <BsBuilding className="w-8 h-8" />,
      description: "↗︎ 2300 (22%)",
    },
    {
      title: "Total Sales",
      value: `$${Math.round((data?.earnings || 0) / 1000)}k`,
      icon: <CreditCardIcon className="w-8 h-8" />,
      description: "Current month",
    },
    // {
    //   title: "Pending Leads",
    //   value: "450",
    //   icon: <CircleStackIcon className="w-8 h-8" />,
    //   description: "50 in hot leads",
    // },
    // {
    //   title: "Active Users",
    //   value: "5.6k",
    //   icon: <UsersIcon className="w-8 h-8" />,
    //   description: "↙ 300 (18%)",
    // },
  ];

// useEffect(() => {
// const fetchData = async () => {
//     try {
//         const res = await axios.get(`${server}/api/v1/admin/stats/data`, {
//             withCredentials: true,
//             responseType: 'json',
//         });
//         console.log(res.data);
//     } catch (error) {
//         console.error("Error fetching admin stats:", error);
//     }
// };

// fetchData();
// }, [])

  const updateDashboardPeriod = (newRange) => {
    // Dashboard range changed, write code to refresh your values
    // dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
  };


    const categoriesData = data?.productsByCategory
      const companiesData = data?.productsByCompany

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {/** ---------------------- Select Period Content ------------------------- */}
      {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}

      {/** ---------------------- Different stats content 1 ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 mb-10 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>

      {/** ---------------------- User source channels table  ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
        <DoughnutChart interactionData={data?.userInteractionData} />
        <DoughnutChartCategories
          productsByCategory={data?.productsByCategory}
        />
      </div>

      {/** ---------------------- Different charts ------------------------- */}
      <div className="grid grid-cols-1 gap-6">
        <LineChart ordersArray={data?.ordersArray} />
        {/* <BarChart /> */}
      </div>

      <div className="grid lg:grid-cols-2 gird-cols-1 mt-4  gap-6">
        <UserChannels
          title={"Products In Each Categories"}
          data={categoriesData}
          head1={"Categories"}
          head2={"Products"}
        />
        <UserChannels
          title={"Products In Each Company"}
          data={companiesData}
          head1={"Companies"}
          head2={"Products"}
        />
      </div>

      {/* <h3 className="text-2xl font-bold mb-2">Categories</h3>
      <div className="grid lg:grid-cols-6 md:grid-cols-5 mb-10  grid-cols-2 gap-6">
        {categoriesData?.map((company, idx) => {
                    if (idx > 0) return <CategoriesData data={company} />;
        })}
      </div>
      <h3 className="text-2xl font-bold mb-2">Companies</h3>
      <div className="grid lg:grid-cols-6 md:grid-cols-5 mb-10 grid-cols-2 gap-6">
        {companiesData?.map((company, idx) => {
          if(idx >0)
          return <CategoriesData data={company} />;
        })}
      </div> */}

      {/** ---------------------- Different stats content 2 ------------------------- */}

      <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
        <AmountStats />
        <PageStats />
      </div>
    </>
  );
}

export default AdminLayout()(Dashboard);