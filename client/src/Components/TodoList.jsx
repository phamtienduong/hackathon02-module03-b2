import React, { useEffect, useState } from "react";
import privateAxios from "../config/privateAxios";
import publicAxios from "../config/publicAxios";
import "./TodoList.css"

function TodoList(props) {
  const [todo, setTodo] = useState({
    nameTodo: "",
  });
  const [allTodo, setAllTodo] = useState([]);
  const handleAddTodo = async () => {
    
    if (todo.nameTodo === "") return alert("Bạn cần điền công việc");

    if (!todo.id) {
      try {
        const response = await privateAxios.post("/todo", todo);
        alert(response.data.message);
        listTodo();
        setTodo({
          nameTodo: "",
        });
      } catch (error) {
        alert(error.response.data.message);
      }
    } else {
      try {
        const response = await privateAxios.put(`/todo/${todo.id}`, todo);
        // alert(response.data.message);
        listTodo();
        setTodo({
          nameTodo: "",
        });
      } catch (error) {
        alert(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    listTodo();
  }, []);

  const listTodo = async () => {
    try {
      const res = await publicAxios.get("/todo");
      setAllTodo(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    try {
      const res = await privateAxios.delete(`/todo/${id}`);
      // console.log(res);
      setAllTodo(res.data);
      confirm("Bạn có muốn xoá công việc này")
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  const handleEdit = async (item) => {
    console.log(item);
    setTodo(item);
  };

  return (
    <div className="container">
      <h1>Todolist</h1>
      <div>
        <input
          value={todo.nameTodo}
          type="text"
          onChange={(e) => setTodo({ ...todo, nameTodo: e.target.value })}
        />
        <button className="btn" onClick={handleAddTodo}>{todo.id ? "Sửa " : "Thêm"}</button>
      </div>
      <div>
        <table className="table-todo" cellPadding={"10px"} cellSpacing={"10px"} style={{border:"1px solid"}}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Task Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allTodo.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.nameTodo}</td>
                <td>
                  <button onClick={() => handleEdit(item)}>Sửa </button>
                  <button onClick={() => handleDelete(item.id)}>Xoá</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </div>
  );
}

export default TodoList;
