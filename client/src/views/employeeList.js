import React, { useEffect, useState } from "react";
import Table from "../components/table";
import { useDispatch, useSelector } from "react-redux";
import { getEmployee, deleteEmployee } from "../action/employeeAction";
import { useNavigate, useParams, Link } from "react-router-dom";
import { DELETE_EMPLOYEE_RESET } from "../constant/employeeConstant";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const { employees } = useSelector((state) => state.employees);
  const { isUpdated, isDeleted } = useSelector((state) => state.update);
  const navigate = useNavigate();

  const { keyword } = useParams();

  useEffect(() => {
    if (keyword === undefined) {
      dispatch(getEmployee());
    } else {
      dispatch(getEmployee(keyword));
    }
    if (isDeleted) {
      dispatch({ type: DELETE_EMPLOYEE_RESET });
    }
  }, [dispatch, isUpdated, keyword, isDeleted]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const header = [
    { name: "Unique Id", data: "id" },
    { name: "Image", data: "img" },
    { name: "Name", data: "name" },
    { name: "Email", data: "email" },
    { name: "Mobile No", data: "mobileNo" },
    { name: "Designation", data: "designation" },
    { name: "Gender", data: "gender" },
    { name: "Course", data: "course" },
    { name: "Created Date", data: "date" },
  ];
  const rows = [];

  employees &&
    employees.forEach((item) => {
      rows.push({
        id: item._id,
        img: item.imgpath,
        name: item.name,
        email: item.email,
        mobileNo: item.mobileNo,
        designation: item.designation,
        gender: item.gender,
        course: item.course,
        date: formatDate(item.createdAt),
      });
    });

  const haldelDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleSearch = () => {
    if (searchName !== "") {
      navigate(`/employeelist/${searchName}`);
    } else {
      navigate(`/employeelist`);
    }
  };
  return (
    <>
      <div className="relative">
        <div className="absolute right-[200px] top-[20px]">
          Total Count: {employees && employees.length}
        </div>
        <div className="absolute right-[10px] top-[10px] bg-green-500 p-[10px] rounded-[10px]">
          <Link to="/createemployee">Create Employee</Link>
        </div>
        <div className="absolute flex right-[10px] top-[70px]">
          <button
            className="bg-green-500 px-[10px] rounded-[5px]"
            onClick={handleSearch}
          >
            Search
          </button>
          <input
            type="search"
            placeholder="search by name"
            className=" border-[2px] border-black rounded-[5px] ml-[20px] px-[5px]"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center justify-center w-full overflow-scroll mt-[120px]">
        {employees && employees.length > 0 && (
          <Table header={header} rows={rows} deleteHandler={haldelDelete} />
        )}
      </div>
    </>
  );
};

export default EmployeeList;
