import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  removeTodo,
  toggleTodo,
  getTodosRequest,
  getTodosSuccess,
  getTodosFailure
} from "../redux/actions";
function TodoItem({ title, status, id, onDelete, onToggle }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        justifyContent: "center",
        margin: "10px"
      }}
    >
      <div>{title}</div>
      <div>{`${status}`}</div>
      <button onClick={() => onDelete(id)}>delete</button>
      <button onClick={() => onToggle(id)}>Toggle</button>
    </div>
  );
}

function TodoList() {
  const { todos, isLoading, isError } = useSelector((state) => state);
  const dispatch = useDispatch();

  const getTodos = () => {
    const requestAction = getTodosRequest();
    dispatch(requestAction);

    return fetch("https://json-server-mocker-masai.herokuapp.com/tasks")
      .then((res) => res.json())
      .then((res) => {
        const successAction = getTodosSuccess(res);
        dispatch(successAction);
      })
      .catch((res) => {
        const failureAction = getTodosFailure();
        dispatch(failureAction);
      });
  };
  useEffect(() => {
    getTodos();
  }, []);

  const handleDelete = (id) => {
    const action = removeTodo(id);
    dispatch(action);
  };
  const handleToggle = (id) => {
    const action = toggleTodo(id);
    dispatch(action);
  };
  return (
    <div>
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          {...item}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
export { TodoList };
