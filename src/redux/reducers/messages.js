import React from "react";
import { PENDING, FAILED, SUCCESS } from "../actions";
import { Toast } from "native-base";

const initialState = {
  message: "",
  status: "",
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SUCCESS:
      if (action.message)
        Toast.show({
          text: action.message,
          buttonText: "Okay",
          type: "success",
          duration: 3000,          
        });
      return {
        ...state,
        status: "success",
        message: action.message,
      };
    case PENDING:
      return {
        ...state,
        status: "pending",
        message: action.message,
      };
    case FAILED:
      if (action.message)
        Toast.show({
          text: action.message,
          buttonText: "Okay",
          type: "danger",
          duration: 3000,          
        });
      return {
        ...state,
        status: "failed",
        message: action.message,
      };
    default:
      return state;
  }
};
