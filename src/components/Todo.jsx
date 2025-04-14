import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { addTask, deleteTask } from "../store";
const Todo = () => {
  const tasks = useSelector((state) => state.task);
  console.log(tasks);
  const [task, setTask] = useState("");

  const dispatch = useDispatch();
  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(addTask(task));
    return setTask("");
  };

  const handleTaskDelete = (id) => {
    return dispatch(deleteTask(id));
  };

  return (
    <>
      <h1>To-Do List</h1>
      <div className="container">
        <div style={{ display: "flex", flexDirection: "row" }}>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="add a new task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button>Add text</button>
          </form>
        </div>
        <ul id="list-container">
          {tasks.map((curTask, index) => {
            return (
              <li key={index} style={{ marginTop: "10px" }}>
                <span
                  style={{
                    marginRight: "10px",
                    padding: "10px",
                  }}
                >
                  {index} :{curTask}
                </span>
                <button onClick={() => handleTaskDelete(index)}>
                  <MdDeleteForever size="20px" />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Todo;
