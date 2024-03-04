import {
  ALL_EMPLOYEE_FAIL,
  ALL_EMPLOYEE_REQUEST,
  ALL_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  NEW_EMPLOYEE_REQUEST,
  NEW_EMPLOYEE_SUCCESS,
  NEW_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
} from "../constant/employeeConstant";
import backend from "../helper/axios";

// New Employee
export const createEmployee =
  (name, email, mobileNo, designation, gender, course, img) =>
  async (dispatch) => {
    try {
      dispatch({ type: NEW_EMPLOYEE_REQUEST });

      const config = {
        header: { "content-type": "application/json" },
      };

      const { data } = await backend.post(
        `/api/v1/employee/new`,
        { name, email, mobileNo, designation, gender, course, img },
        config
      );

      dispatch({ type: NEW_EMPLOYEE_SUCCESS, payload: data.employee });
    } catch (error) {
      dispatch({
        type: NEW_EMPLOYEE_FAIL,
        payload: error,
      });
    }
  };

// Get All Products
export const getEmployee = (keyword) => async (dispatch) => {
  try {
    dispatch({ type: ALL_EMPLOYEE_REQUEST });

    let link = `/api/v1/employees?keyword=${keyword}`;

    const { data } = await backend.get(link);

    dispatch({ type: ALL_EMPLOYEE_SUCCESS, payload: data.employees });
  } catch (error) {
    dispatch({
      type: ALL_EMPLOYEE_FAIL,
      payload: error,
    });
  }
};

// Get Employee Details
export const getEmployeeDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: EMPLOYEE_DETAILS_REQUEST });

    const { data } = await backend.get(`/api/v1/employee/${id}`);

    dispatch({ type: EMPLOYEE_DETAILS_SUCCESS, payload: data.employee });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_DETAILS_FAIL,
      payload: error,
    });
  }
};

//Delete Employee
export const deleteEmployee = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EMPLOYEE_REQUEST });

    const { data } = await backend.delete(`/api/v1/employee/${id}`);

    dispatch({ type: DELETE_EMPLOYEE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_EMPLOYEE_FAIL,
      payload: error,
    });
  }
};

// Update Employee
export const updateEmployee =
  (id, name, email, mobileNo, designation, gender, course, img) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_EMPLOYEE_REQUEST });

      const config = {
        header: { "content-type": "application/json" },
      };

      const { data } = await backend.put(
        `/api/v1/employee/${id}`,
        { name, email, mobileNo, designation, gender, course, img },
        config
      );

      dispatch({ type: UPDATE_EMPLOYEE_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_EMPLOYEE_FAIL,
        payload: error,
      });
    }
  };
