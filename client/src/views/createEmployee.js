import React, { useState } from "react";

import { createEmployee } from "../action/employeeAction";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const CreateEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [designation, setDesignation] = useState("HR");
  const [gender, setGender] = useState("male");
  const [course, setCourse] = useState("MCA");
  const [img, setImg] = useState("");

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
      createEmployee(name, email, mobileNo, designation, gender, course, img)
    );
    navigate("/");
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
            className="border-[1px] border-black w-[200px] focus:outline-none rounded-[5px] px-[5px]"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[200px]">Email</div>
          <input
            className="border-[1px] border-black w-[200px] focus:outline-none rounded-[5px] px-[5px]"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="flex mt-[20px]">
          <div className="w-[200px]">Mobile No</div>
          <input
            className="border-[1px] border-black w-[200px] focus:outline-none rounded-[5px] px-[5px]"
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
                onChange={(e) => setGender(e.target.value)}
              />
              <label>Male</label>
            </div>
            <div>
              <input
                type="radio"
                name="gender"
                value="female"
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
            className="w-[200px] focus:outline-none "
            type="file"
            onChange={handleFileUpload}
          />
        </div>
        <input
          className="bg-green-400 w-[200px] ml-[200px] rounded-[5px]"
          type="submit"
          value="submit"
        />
      </form>
    </div>
  );
};

export default CreateEmployee;
