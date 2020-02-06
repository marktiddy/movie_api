//Import this to enable us to combine our reducers
import { combineReducers } from "redux";
//Import our actions
import {
  SET_FILTER,
  SET_MOVIES,
  SET_USER,
  LOGOUT_USER
} from "../actions/actions";

//Our reducer to filter the movies
function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}
//Our reducer for showing the movies
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = "", action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  visibilityFilter,
  movies,
  user
});

export default rootReducer;
