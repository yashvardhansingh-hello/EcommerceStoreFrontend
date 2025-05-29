// import { themeChange } from 'theme-change'
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import BellIcon from "@heroicons/react/24/outline/BellIcon";
import MoonIcon from "@heroicons/react/24/outline/MoonIcon";
import SunIcon from "@heroicons/react/24/outline/SunIcon";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../../features/api";
import { openRightDrawer } from "../../../features/notification/rightDrawerSlice";
import { toggleTheme } from "../../../features/user/userSlice";
import { useAsyncMutation } from "../../../hooks/hook";
import { RIGHT_DRAWER_TYPES } from "../utils/globalConstantUtil";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const {onlineUsers} = useSelector((state) => state.userState);
  

  const { theme } = useSelector((state) => state.userState);
  const currentTheme = theme;

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const { noOfNotifications, pageTitle } = useSelector(
    (state) => state.headerState
  );

  // const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"))

  // useEffect(() => {
  //     themeChange(false)
  //     if(currentTheme === null){
  //         if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ) {
  //             setCurrentTheme("dark")
  //         }else{
  //             setCurrentTheme("light")
  //         }
  //     }
  //     // 👆 false parameter is required for react project
  //   }, [])

  //   Opening right sidebar for notification
  const openNotification = () => {
    dispatch(
      openRightDrawer({
        header: "Notifications",
        bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION,
      })
    );
  };

  const [logoutAdminHandler] = useAsyncMutation(useLogoutUserMutation);

  const logoutUser = async () => {
    await logoutAdminHandler("logging out admin ...", {});
    navigate("/login");
  };

  return (
    // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md

    <>
      <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
        {/* Menu toogle for mobile view or small screen */}
        <div className="flex-1">
          <label
            htmlFor="left-sidebar-drawer"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <Bars3Icon className="h-5 inline-block w-5" />
          </label>
          <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>

          <div className="group flex items-center transition-all duration-500 z-10 ml-6 cursor-pointer justify-center space-x-1 shadow-md p-[10px] bg-primary bg-opacity-40 rounded-full relative">
            <span className="relative flex h-2 w-2 md:h-3 md:w-3 lg:h-3 lg:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 lg:h-3 lg:w-3 bg-green-500"></span>
            </span>
            <p className="text-[0.7rem] md:text-sm lg:text-sm  font-light text-white pl-1">
              {onlineUsers?.length || 1} <span className="">user online </span>
            </p>

            {/* Hoverable name list */}
            <div
              id="users-name"
              className="hidden group-hover:flex z-10 absolute top-[3.5rem] left-0 flex-col items-center justify-center bg-primary bg-opacity-40 shadow-md transition-all duration-500 p-2 rounded-md"
            >
              {onlineUsers?.map((user) => (
                <p
                  key={user.id}
                  className="text-[0.7rem] md:text-sm lg:text-sm w-[8rem] text-base-100"
                >
                  {user.name}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-none ">
          {/* Multiple theme selection, uncomment this if you want to enable multiple themes selection, 
                also includes corporate and retro themes in tailwind.config file */}

          {/* <select className="select select-sm mr-4" data-choose-theme>
                    <option disabled selected>Theme</option>
                    <option value="light">Default</option>
                    <option value="dark">Dark</option>
                    <option value="corporate">Corporate</option>
                    <option value="retro">Retro</option>
                </select> */}

          {/* Light and dark theme selection toogle **/}
          <label className="swap ">
            <input type="checkbox" />
            {theme === "dracula" ? (
              <SunIcon
                //   data-set-theme="light"
                data-act-class="ACTIVECLASS"
                className={"fill-current w-6 h-6 "}
                onClick={() => handleTheme()}
              />
            ) : (
              <MoonIcon
                //   data-set-theme="dark"
                data-act-class="ACTIVECLASS"
                onClick={() => handleTheme()}
                className={"fill-current w-6 h-6 "}
              />
            )}
          </label>

          {/* Notification icon */}
          <button
            className="btn btn-ghost ml-4  btn-circle"
            onClick={() => openNotification()}
          >
            <div className="indicator">
              <BellIcon className="h-6 w-6" />
              {noOfNotifications > 0 ? (
                <span className="indicator-item badge badge-secondary badge-sm">
                  {noOfNotifications}
                </span>
              ) : null}
            </div>
          </button>

          {/* Profile icon, opening menu on click */}
          <div className="dropdown dropdown-end ml-4">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src="https://reqres.in/img/faces/2-image.jpg"
                  alt="profile"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li className="justify-between">
                <Link to={"/admin/settings"}>
                  Profile Settings
                  <span className="badge">New</span>
                </Link>
              </li>
              <li className="justify-between">
                <Link to={"/"}>Website</Link>
              </li>
              {/* <li className="">
                <Link to={"/app/settings-billing"}>Bill History</Link>
              </li> */}
              <div className="divider mt-0 mb-0"></div>
              <li>
                <button onClick={() => logoutUser()}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
