import React, { useEffect, useState } from "react";
import { login, register } from "../action/userAction";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [formType, setFormType] = useState("Login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  //handle submit
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  //handleRegister
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    dispatch(register(registerEmail, registerPassword));
  };
  return (
    <div className="flex justify-center w-full h-[100vh] absolute top-0 left-0 bg-orange-500">
      <div className="mt-[150px]">
        <div className="flex justify-around bg-yellow-300 rounded-t-[20px] pt-[20px]">
          <button onClick={() => setFormType("Register")}>Register</button>
          <button onClick={() => setFormType("Login")}>Login</button>
        </div>
        {formType === "Login" && (
          <form
            className="bg-yellow-300 w-[500px] px-[20px] py-[40px] rounded-b-[20px]"
            onSubmit={handleSubmitLogin}
          >
            <div className="flex justify-center">
              <div className="w-[200px]">User Name</div>
              <input
                className="border-[1px] border-black w-[200px] rounded-[5px] px-[5px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email..."
              />
            </div>
            <div className="flex justify-center mt-[40px]">
              <div className="w-[200px]">Password</div>
              <input
                className="border-[1px] border-black w-[200px] rounded-[5px] px-[5px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter Password..."
              />
            </div>
            <div>
              <input
                type="submit"
                value="Login"
                className="bg-green-400 w-[200px] ml-[230px] mt-[40px] rounded-[5px]"
              />
            </div>
          </form>
        )}
        {formType === "Register" && (
          <form
            className="bg-yellow-300 w-[500px] px-[20px] py-[40px] rounded-b-[20px]"
            onSubmit={handleSubmitRegister}
          >
            <div className="flex justify-center">
              <div className="w-[200px]">User Name</div>
              <input
                className="border-[1px] border-black w-[200px] rounded-[5px] px-[5px]"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder="Enter Email..."
              />
            </div>
            <div className="flex justify-center mt-[40px]">
              <div className="w-[200px]">Password</div>
              <input
                className="border-[1px] border-black w-[200px] rounded-[5px] px-[5px]"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                type="password"
                placeholder="Enter Password..."
              />
            </div>
            <div>
              <input
                type="submit"
                value="Register"
                className="bg-green-400 w-[200px] ml-[230px] mt-[40px] rounded-[5px]"
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
