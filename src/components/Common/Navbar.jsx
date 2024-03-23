// import React, { useEffect, useState } from "react";
// import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
// import { BsChevronDown } from "react-icons/bs";
// import { useSelector } from "react-redux";
// import { Link, matchPath, useLocation } from "react-router-dom";

// import './Navbar.css';

// import logo from "../../assets/Logo/Logo-Full-Light.png";
// import { NavbarLinks } from "../../data/navbar-links";
// import { apiConnector } from "../../services/apiConnector";
// import { categories } from "../../services/apis";
// import { ACCOUNT_TYPE } from "../../utils/constants";
// import ProfileDropdown from "../core/Auth/ProfileDropdown";

// function Navbar() {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);
//   const location = useLocation();

//   const [subLinks, setSubLinks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isNavOpen, setIsNavOpen] = useState(false); // State to manage the visibility of the navigation menu on small screens

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const res = await apiConnector("GET", categories.CATEGORIES_API);
//         setSubLinks(res.data.data);
//       } catch (error) {
//         console.log("Could not fetch Categories.", error);
//       }
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   const matchRoute = (route) => {
//     return matchPath({ path: route }, location.pathname);
//   };

//   // Function to toggle the navigation menu visibility
//   const toggleNav = () => {
//     setIsNavOpen(!isNavOpen);
//   };

//   return (
//     <div
//       className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
//         location.pathname !== "/" ? "bg-richblack-800" : ""
//       } transition-all duration-200`}
//     >
//       <div className="flex w-11/12 max-w-maxContent items-center justify-between">
//         <Link to="/">
//           <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
//         </Link>

//         {/* Navbar items for small screens */}
//         <nav className={`md:hidden ${isNavOpen ? "block" : "hidden"} mt-36 ml-4 md:ml-96 w-full md:w-60 z-50`}>
//           <ul className="flex flex-col gap-y-6 text-richblack-50 bg-richblack-600 rounded shadow-lg">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <div
//                     className={`group relative flex cursor-pointer items-center justify-center gap-1 ${
//                       matchRoute("/catalog/:catalogName")
//                         ? "text-yellow-25"
//                         : "text-richblack-25"
//                     }`}
//                   >
//                     <p>{link.title}</p>
//                     <BsChevronDown />
//                     <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] 
//                     translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all
//                      duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                       <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45
//                        select-none rounded bg-richblack-5"></div>
//                       {loading ? (
//                         <p className="text-center">Loading...</p>
//                       ) : subLinks && subLinks.length > 0 ? (
//                         <>
//                           {subLinks
//                             .filter((subLink) => subLink?.courses?.length > 0)
//                             .map((subLink, i) => (
//                               <Link
//                                 to={`/catalog/${subLink.name
//                                   .split(" ")
//                                   .join("-")
//                                   .toLowerCase()}`}
//                                 className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                 key={i}
//                               >
//                                 <p>{subLink.name}</p>
//                               </Link>
//                             ))}
//                         </>
//                       ) : (
//                         <p className="text-center">No Courses Found</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p
//                       className={`flex flex-col items-center justify-center ${
//                         matchRoute(link?.path)
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>


//         {/* Navbar items for large screens */}
//         <nav className="hidden md:block">
//           <ul className="flex flex-row gap-x-6 text-richblack-25">
//             {NavbarLinks.map((link, index) => (
//               <li key={index}>
//                 {link.title === "Catalog" ? (
//                   <div
//                     className={`group relative flex cursor-pointer items-center gap-1 ${
//                       matchRoute("/catalog/:catalogName")
//                         ? "text-yellow-25"
//                         : "text-richblack-25"
//                     }`}
//                   >
//                     <p>{link.title}</p>
//                     <BsChevronDown />
//                     <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
//                       <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
//                       {loading ? (
//                         <p className="text-center">Loading...</p>
//                       ) : subLinks && subLinks.length > 0 ? (
//                         <>
//                           {subLinks
//                             .filter((subLink) => subLink?.courses?.length > 0)
//                             .map((subLink, i) => (
//                               <Link
//                                 to={`/catalog/${subLink.name
//                                   .split(" ")
//                                   .join("-")
//                                   .toLowerCase()}`}
//                                 className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
//                                 key={i}
//                               >
//                                 <p>{subLink.name}</p>
//                               </Link>
//                             ))}
//                         </>
//                       ) : (
//                         <p className="text-center">No Courses Found</p>
//                       )}
//                     </div>
//                   </div>
//                 ) : (
//                   <Link to={link?.path}>
//                     <p
//                       className={`${
//                         matchRoute(link?.path)
//                           ? "text-yellow-25"
//                           : "text-richblack-25"
//                       }`}
//                     >
//                       {link.title}
//                     </p>
//                   </Link>
//                 )}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="hidden items-center gap-x-4 md:flex">
//           {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
//             <Link to="/dashboard/cart" className="relative">
//               <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
//               {totalItems > 0 && (
//                 <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
//                   {totalItems}
//                 </span>
//               )}
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/login">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Log in
//               </button>
//             </Link>
//           )}
//           {token === null && (
//             <Link to="/signup">
//               <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
//                 Sign up
//               </button>
//             </Link>
//           )}
//           {token !== null && <ProfileDropdown />}
//         </div>

//         {/* Menu button for small screens */}
//         <button className="mr-4 md:hidden" onClick={toggleNav}>
//           <AiOutlineMenu fontSize={24} fill="#AFB2BF"/>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Navbar;






import React, { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, matchPath, useLocation } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";

import './Navbar.css';

import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { ACCOUNT_TYPE } from "../../utils/constants";
import ProfileDropdown from "../core/Auth/ProfileDropdown";

function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [isBtn, setIsBtn] = useState(true);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // State to manage the visibility of the navigation menu on small screens

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        setSubLinks(res.data.data);
      } catch (error) {
        console.log("Could not fetch Categories.", error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  // Function to toggle the navigation menu visibility
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    setIsBtn(!isBtn); // Toggle the button icon
  };


  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between">
        <Link to="/">
          <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
        </Link>

        {/* Navbar items for small screens */}
        <nav className={`md:hidden ${isNavOpen ? "block" : "hidden"} mt-56 ml-4 md:ml-96 w-full md:w-60 z-50 bg-richblack-600 rounded shadow-lg`}>
        
          {/* login/signup btn */}
          <div className="flex justify-center gap-2 items-center">
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-5 px-[12px] py-[8px] text-richblack-600">
                Log in
              </button>
            </Link>
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-5 px-[12px] py-[8px] text-richblack-600">
                Sign up
              </button>
            </Link>
          </div>

          <ul className="flex flex-col gap-y-6 text-richblack-50 bg-richblack-600 rounded shadow-lg">
        

            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center justify-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] 
                    translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all
                     duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45
                       select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks && subLinks.length > 0 ? (
                        <>
                          {subLinks
                            .filter((subLink) => subLink?.courses?.length > 0)
                            .map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`flex flex-col items-center justify-center ${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
            
          </ul>
        </nav>


        {/* Navbar items for large screens */}
        <nav className="hidden md:block">
          <ul className="flex flex-row gap-x-6 text-richblack-25">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div
                    className={`group relative flex cursor-pointer items-center gap-1 ${
                      matchRoute("/catalog/:catalogName")
                        ? "text-yellow-25"
                        : "text-richblack-25"
                    }`}
                  >
                    <p>{link.title}</p>
                    <BsChevronDown />
                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                      <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                      {loading ? (
                        <p className="text-center">Loading...</p>
                      ) : subLinks && subLinks.length > 0 ? (
                        <>
                          {subLinks
                            .filter((subLink) => subLink?.courses?.length > 0)
                            .map((subLink, i) => (
                              <Link
                                to={`/catalog/${subLink.name
                                  .split(" ")
                                  .join("-")
                                  .toLowerCase()}`}
                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                key={i}
                              >
                                <p>{subLink.name}</p>
                              </Link>
                            ))}
                        </>
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-25"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

           
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to="/login">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Log in
              </button>
            </Link>
          )}
          {token === null && (
            <Link to="/signup">
              <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                Sign up
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown />}
        </div>

        {/* Menu button for small screens */}
        <button className="mr-4 md:hidden" onClick={toggleNav}>
        {isBtn ? (
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        ) : (
          <IoCloseSharp fontSize={24} fill="#AFB2BF" />
        )}
      </button>
      </div>
    </div>
  );
}

export default Navbar;




