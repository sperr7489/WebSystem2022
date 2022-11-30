import axios from "axios";

const initialState = { value: 0 };
export default function requestReducer(state = initialState, action) {
  if (action.type === "counter/incremented") {
    if (state.value > 9) {
      return {
        ...state,
        value: 10,
      };
    }
    return {
      ...state,
      value: state.value + 1,
    };
  }
  if (action.type === "counter/initiate") {
    return {
      ...state,
      value: 0,
    };
  }
  return state;
}
