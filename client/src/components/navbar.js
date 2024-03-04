import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../action/userAction";

import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="flex justify-around bg-gray-300 py-[10px] items-center">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/employeelist">EmployeeList</Link>
      </div>
      {user && user.email ? (
        <div className="flex bg-blue-500 rounded-[100%] h-[40px] w-[40px] justify-center items-center">
          {user.email[0].toUpperCase()}
        </div>
      ) : (
        <div>Guest</div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
