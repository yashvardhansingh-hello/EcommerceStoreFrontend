import { BsCart, BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);

  return (
    <nav className="sticky w-[80%] top-2 z-50 bg-base-200 bg-opacity-40 backdrop-blur-lg shadow-md rounded-xl mx-auto flex justify-center">
      <div className="navbar align-element">
        {/* START */}
        <div className="navbar-start">
          <NavLink
            to="/"
            className="hidden lg:flex shadow-lg flex-col text-3xl font-bold btn  bg-primary bg-opacity-40  btn-ghost text-content-300 tracking-wide"
          >
            <BsCart />
            Nox Cart
          </NavLink>

          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost bg-primary bg-opacity-50 ">
              <FaBarsStaggered className="h-6 w-6 text-white" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg rounded-box w-52 bg-gray-900 bg-opacity-60 backdrop-blur-lg  text-white"
            >
              <NavLinks />
            </ul>
          </div>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <NavLinks
              renderLink={({ to, label }) => (
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `btn btn-ghost px-4 py-2 rounded-xl transition duration-300 ${
                      isActive
                        ? "bg-white bg-opacity-10 text-white"
                        : "hover:bg-white hover:bg-opacity-5 text-gray-300"
                    }`
                  }
                >
                  {label}
                </NavLink>
              )}
            />
          </ul>
        </div>

        {/* END */}
        <div className="navbar-end gap-2">
          {/* Theme toggle wrapped with dark translucent bg */}
          <div className="rounded-full  bg-primary bg-opacity-40 shadow-lg hover:bg-opacity-20 transition-all backdrop-blur-sm">
            <label className="swap swap-rotate cursor-pointer p-3 flex justify-center items-center">
              <input type="checkbox" onChange={handleTheme} />
              <BsSunFill className="swap-on w-5 h-5 text-yellow-400" />
              <BsMoonFill className="swap-off w-5 h-5 text-blue-500 text-opacity-100" />
            </label>
          </div>

          {/* Cart icon with dark translucent bg */}
          <NavLink
            to="/cart"
            className="btn btn-circle btn-ghost text-white relative shadow-lg bg-primary bg-opacity-40  backdrop-blur-sm"
          >
            <div className="indicator">
              <BsCart3 className="h-6 w-6" />
              {numItemsInCart > 0 && (
                <span className="badge badge-sm badge-primary absolute top-[-0.4rem] right-[-0.4rem]">
                  {numItemsInCart}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
