import { composeWithDevTools } from "@redux-devtools/extension";
import { applyMiddleware, createStore } from "redux";
import { thunk } from "redux-thunk";

const ADD_TASK = "task/add";
const DELETE_TASK = "task/delete";
const FETCH_TASK = "task/fetch";

export const addTask = (data) => {
  return { type: ADD_TASK, payload: data };
};

export const deleteTask = (id) => {
  return { type: DELETE_TASK, payload: id };
};

const initialState = {
  task: [],
};
const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        task: [...state.task, action.payload],
      };
    case DELETE_TASK:
      const updatedTask = state.task.filter((curTask, index) => {
        return index !== action.payload;
      });
      return {
        ...state,
        task: updatedTask,
      };
    case FETCH_TASK:
      return {
        ...state,
        task: [...state.task, ...action.payload],
      };
    default:
      return state;
  }
};

export const store = createStore(
  taskReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
console.log(store);

store.dispatch(addTask("Buy me a coffee"));
console.log("updated state: ", store.getState());
store.dispatch(addTask("buy a mango"));
console.log("updated state: ", store.getState());
store.dispatch(addTask("buy a orange"));
console.log("updated state: ", store.getState());
store.dispatch(addTask("buy a banana"));
console.log("updated state: ", store.getState());

store.dispatch(deleteTask(1));
console.log("deleted state: ", store.getState());

export const fetchTask = () => {
  return async (dispatch) => {
    try {
      const res = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=3"
      );
      const task = await res.json();
      dispatch({ type: FETCH_TASK, payload: task.map((curr) => curr.title) });
    } catch (error) {
      console.log(error);
    }
  };
};
