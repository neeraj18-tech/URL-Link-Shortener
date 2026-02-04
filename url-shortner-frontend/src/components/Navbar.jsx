import React, { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStoreContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const { pathname } = useLocation();
  const [navbarOpen, setNavbarOpen] = useState(false);
  const onLogoutHandler = () => {
    localStorage.removeItem("JWT_TOKEN");
    setToken(null);
    navigate("/login");
  };

  return (
    <header className="h-16 sticky top-0 z-50 bg-custom-gradient backdrop-blur-md shadow-lg">
      <div className="lg:px-14 sm:px-8 px-4 h-full flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="group">
          <h1 className="text-3xl font-extrabold italic text-white tracking-wide group-hover:scale-105 transition-transform duration-200">
            Linklytics
          </h1>
        </Link>

        {/* Menu */}
        <ul
          className={`absolute sm:static top-16 left-0 w-full sm:w-auto flex flex-col sm:flex-row sm:items-center sm:gap-10 gap-6
                      bg-custom-gradient sm:bg-none sm:bg-transparent shadow-lg sm:shadow-none text-center sm:text-left
                      transition-all duration-300 ease-in-out ${navbarOpen ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0 py-0"} sm:max-h-full sm:opacity-100 sm:py-0`}
        >
          {/* Home */}
          <li className="relative group">
            <Link
              to="/"
              className={`text-lg font-medium transition-all duration-200
              ${pathname === "/" ? "text-white" : "text-gray-200 hover:text-white"}`}
            >
              Home
            </Link>
            <span
              className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300
              ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`}
            />
          </li>

          {/* About */}
          <li className="relative group">
            <Link
              to="/about"
              className={`text-lg font-medium transition-all duration-200
              ${pathname === "/about" ? "text-white" : "text-gray-200 hover:text-white"}`}
            >
              About
            </Link>
            <span
              className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300
              ${pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"}`}
            />
          </li>

          {/* Dashboard (only if logged in) */}
          {token && (
            <li className="relative group">
              <Link
                to="/dashboard"
                className={`text-lg font-medium transition-all duration-200
                ${pathname === "/dashboard" ? "text-white" : "text-gray-200 hover:text-white"}`}
              >
                Dashboard
              </Link>
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300
                ${pathname === "/dashboard" ? "w-full" : "w-0 group-hover:w-full"}`}
              />
            </li>
          )}
          {
            !token && (
              <Link
              to="/register"
              className="inline-block bg-custom-gradient text-white
              px-6 py-2 rounded-lg
              hover:bg-custom-gradient-2
              transition-colors duration-200"
            >
              Sign Up
            </Link>
            )
          }
          {
            token && (
              <button
              onClick={onLogoutHandler}
              className="inline-block bg-custom-gradient text-white
              px-6 py-2 rounded-lg
              hover:bg-custom-gradient-2
              transition-colors duration-200">
                Logout
              </button>
            )
          }
          

          {/* Sign Up (always visible, rightmost) */}
          <li>
            
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden text-white text-3xl hover:scale-110 transition-transform"
        >
          {navbarOpen ? <RxCross2 /> : <IoIosMenu />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;


// import React, { useState } from "react";
// import { IoIosMenu } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useStoreContext } from "../contextApi/ContextApi";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const {token} = useStoreContext();
//   const { pathname } = useLocation();
//   const [navbarOpen, setNavbarOpen] = useState(false);

//   return (
//     <header className="h-16 sticky top-0 z-50 bg-custom-gradient backdrop-blur-md shadow-lg">
//       <div className="lg:px-14 sm:px-8 px-4 h-full flex justify-between items-center">

//         {/* Logo */}
//         <Link to="/" className="group">
//           <h1 className="text-3xl font-extrabold italic text-white tracking-wide group-hover:scale-105 transition-transform duration-200">
//             Linklytics
//           </h1>
//         </Link>

//         {/* Menu */}
//        <ul
//           className={`absolute sm:static top-16 left-0 w-full sm:w-auto flex flex-col sm:flex-row sm:items-center sm:gap-10 gap-6
//                       bg-custom-gradient sm:bg-none sm:bg-transparent shadow-lg sm:shadow-none text-center sm:text-left
//                       transition-all duration-300 ease-in-out ${navbarOpen ? "max-h-96 opacity-100 py-6" : "max-h-0 opacity-0 py-0"} sm:max-h-full sm:opacity-100 sm:py-0`}>
//           {/* Home */}
//           <li className="relative group">
//             <Link
//               to="/"
//               className={`text-lg font-medium transition-all duration-200
//               ${pathname === "/" ? "text-white" : "text-gray-200 hover:text-white"}`}
//             >
//               Home
//             </Link>
//             <span
//               className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300
//               ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`}
//             />
//           </li>

//           {/* About */}
//           <li className="relative group">
//             <Link
//               to="/about"
//               className={`text-lg font-medium transition-all duration-200
//               ${pathname === "/about" ? "text-white" : "text-gray-200 hover:text-white"}`}
//             >
//               About
//             </Link>
//             <span
//               className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300
//               ${pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"}`}
//             />
//           </li>

//           {/* Sign Up – SAME AS LANDING PAGE */}
//           <li>
//             {token && (
//               <li className="relative group">
//             <Link
//               to="/about"
//               className={`text-lg font-medium transition-all duration-200
//               ${pathname === "/about" ? "text-white" : "text-gray-200 hover:text-white"}`}
//             >
//               About
//             </Link>
//             <span
//               className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-all duration-300
//               ${pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"}`}
//             />
//           </li>
//             )}
//             <Link
//               to="/register"
//               className="inline-block bg-custom-gradient text-white
//               px-6 py-2 rounded-lg
//               hover:bg-custom-gradient-2
//               transition-colors duration-200"
//             >
//               Sign Up
//             </Link>
//           </li>
//         </ul>

//         {/* Mobile Toggle */}
//         <button
//           onClick={() => setNavbarOpen(!navbarOpen)}
//           className="sm:hidden text-white text-3xl hover:scale-110 transition-transform"
//         >
//           {navbarOpen ? <RxCross2 /> : <IoIosMenu />}
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
