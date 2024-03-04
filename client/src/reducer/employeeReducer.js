import {
  ALL_EMPLOYEE_FAIL,
  ALL_EMPLOYEE_REQUEST,
  ALL_EMPLOYEE_SUCCESS,
  DELETE_EMPLOYEE_FAIL,
  DELETE_EMPLOYEE_REQUEST,
  DELETE_EMPLOYEE_RESET,
  DELETE_EMPLOYEE_SUCCESS,
  EMPLOYEE_DETAILS_FAIL,
  EMPLOYEE_DETAILS_REQUEST,
  EMPLOYEE_DETAILS_SUCCESS,
  UPDATE_EMPLOYEE_FAIL,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_RESET,
  UPDATE_EMPLOYEE_SUCCESS,
} from "../constant/employeeConstant";

export const employeeReducer = (state = { employees: [] }, action) => {
  switch (action.type) {
    case ALL_EMPLOYEE_REQUEST:
      return {
        loading: true,
        employees: [],
      };
    case ALL_EMPLOYEE_SUCCESS:
      return {
        loading: false,
        employees: action.payload,
      };

    case ALL_EMPLOYEE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const employeeDetailsReducer = (state = { employee: {} }, action) => {
  switch (action.type) {
    case EMPLOYEE_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case EMPLOYEE_DETAILS_SUCCESS:
      return {
        loading: false,
        employee: action.payload,
      };
    case EMPLOYEE_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const deleteUpdateEmployeeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_EMPLOYEE_REQUEST:
    case UPDATE_EMPLOYEE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };

    case UPDATE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };

    case DELETE_EMPLOYEE_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_EMPLOYEE_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_EMPLOYEE_FAIL:
    case UPDATE_EMPLOYEE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
