import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeeDetails, updateEmployee } from "../action/employeeAction";
import { UPDATE_EMPLOYEE_RESET } from "../constant/employeeConstant";

const EditEmployee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [course, setCourse] = useState("");
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const { employee } = useSelector((state) => state.employee);
  const { isUpdated } = useSelector((state) => state.update);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (employee && employee._id !== id) {
      dispatch(getEmployeeDetails(id));
    } else {
      setName(employee.name);
      setEmail(employee.email);
      setMobileNo(employee.mobileNo);
      setDesignation(employee.designation);
      setGender(employee.gender);
      setCourse(employee.course);
      setImg(employee.imgpath);
    }
    if (isUpdated) {
      navigate("/employeelist");
      dispatch({ type: UPDATE_EMPLOYEE_RESET });
      dispatch(getEmployeeDetails(id));
    }
  }, [id, dispatch, employee, isUpdated, navigate]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateEmployee(
        id,
        name,
        email,
        mobileNo,
        designation,
        gender,
        course,
        img
      )
    );
  };
  return (
    <div className="flex justify-center w-full">
      <form
        className="bg-yellow-300 w-[500px] mt-[50px] px-[50px] py-[10px] rounded-[20px]"
        onSubmit={handleSubmit}
      >
        <div className="flex mt-[20px]">
          <div className="w-[200px]">Name</div>
          <input
            className="border-2 border-black w-[200px] focus:outline-none px-[5px]"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[200px]">Email</div>
          <input
            className="border-2 border-black w-[200px] focus:outline-none  px-[5px]"
            value={email}
            readOnly
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[200px]">Mobile No</div>
          <input
            className="border-2 border-black w-[200px] focus:outline-none px-[5px]"
            type="number"
            value={mobileNo}
            onChange={(e) => {
              setMobileNo(e.target.value);
            }}
          />
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[200px]">Designation</div>
          <select
            className="w-[200px] px-[5px]"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
          >
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Manager">Manager</option>
          </select>
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[200px]">Gender</div>
          <div className="w-[200px] flex justify-around">
            <div>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label>Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
              />
              <label>Female</label>
            </div>
          </div>
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[200px]">course</div>
          <select
            className="w-[200px] px-[5px]"
            value={designation}
            onChange={(e) => setCourse(e.target.value)}
          >
            <option value="MCA">MCA</option>
            <option value="BSC">BSC</option>
            <option value="BCA">BCA</option>
          </select>
        </div>
        <div className="flex mt-[20px] mb-[20px]">
          <div className="w-[200px]">Img</div>
          <input
            className="w-[200px] focus:outline-none"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </div>
        <input
          className="bg-green-400 w-[200px] ml-[200px] rounded-[5px]"
          type="submit"
          value="update"
        />
      </form>
    </div>
  );
};

export default EditEmployee;
