import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateEmployee from "./views/createEmployee";
import EditEmployee from "./views/editEmployee";
import EmployeeList from "./views/employeeList";
import Header from "./components/header";
import Login from "./views/login";
import Navbar from "./components/navbar";
import ProtectedRoute from "./helper/protectedRoute";
import Home from "./views/home";

import store from "./store/store";
import { loadUser } from "./action/userAction";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <div className="relative">
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />

          <Route
            path="/createemployee"
            element={
              <ProtectedRoute>
                <CreateEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editemployee/:id"
            element={
              <ProtectedRoute>
                <EditEmployee />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employeelist"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employeelist/:keyword"
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
