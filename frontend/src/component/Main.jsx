import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withTranslation } from 'react-i18next'
import { useNavigate, Link } from 'react-router-dom'
import './main.css';


function Main() {
  const navigate = useNavigate();
  const [TodoStateApi, setTodoStateApi] = useState([]);
  const [task, setTask] = useState('');
  const mainurl="http://localhost:8080/api/todos/getall";

  
  
 /* useEffect(() => {
    const asd = getListTodo();
    
  }, []);*/

 /* useEffect(() => {
    axios.get("http://localhost:8080/api/todos/completed")
      .then((response) => {
        console.log(response.data);
        setTodoStateApi(response.data);
      })
      .catch((err) => { console.error(err); });
  }, []);
*/

  const createTodo = () => {
    const todoItem = {
      task: task
    };

    axios
      .post('http://localhost:8080/api/todos/create', todoItem)
      .then((response) => {
        console.log('Todo created successfully', response.data);
        navigate("/todos/getall");
      })
      .catch((error) => {
        console.error('Error creating todo:', error);
      });
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };


  // LIST
  const getListTodo = (() => {
    axios.get("http://localhost:8080/api/todos/getall")
      .then((response) => {
        console.log(response.data);
        setTodoStateApi(response.data);
      })
      .catch((err) => { console.error(err); });
  });
  const getUnDoneListTodo = (() => {
    axios.get("http://localhost:8080/api/todos/undone")
      .then((response) => {
        console.log(response.data);
        setTodoStateApi(response.data);
      })
      .catch((err) => { console.error(err); });
  });

  
  const getCompletedListTodo = (() => {
    axios.get("http://localhost:8080/api/todos/completed")
      .then((response) => {
        console.log(response.data);
        setTodoStateApi(response.data);
       
      })
      .catch((err) => { console.error(err); });
  });

  // DELETE
  const setDeleteTodo = (id) => {
    if (window.confirm("Silmek istediğinizden emin misiniz ?")) {
      axios.delete(`http://localhost:8080/api/todos/delete/${id}`)
        .then(() => {
          getListTodo();
          navigate("/todos/getall");
        })
        .catch((error) => {
          console.error("Error deleting todo:", error);
        });
    } else {
      alert("Silinmedi.");
    }
  };

  const setDeleteCompletedTodo = (id) => {
    if (window.confirm("Silmek istediğinizden emin misiniz ?")) {
      axios.delete(`http://localhost:8080/api/todos/deletecompleted`)
        .then(() => {
          getListTodo();
          navigate("/todos/getall");
        })
        .catch((error) => {
          console.error("Error deleting todo:", error);
        });
    } else {
      alert("Silinmedi.");
    }
  };

  //UPDATE
  const setUpdateTodo = (data) => {
    let { id, task, completed } = data;
    localStorage.setItem("todo_update_id", id);
    localStorage.setItem("todo_update_task", task);
    localStorage.setItem("todo_update_completed", completed);
  }

  // ... diğer kodlar

  return (
    <React.Fragment>
      
      <h2 className="display-3 mt-4">TodoInput</h2>
      <div className='form-button-group'>
        
        <div className="form-group">
          <label>Task:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter a to do"
            required={true}
            value={task}
            onChange={handleTaskChange}
          />
        </div>
        <button 
          onClick={createTodo}
          className="btn btn-primary"
        >
          Create Todo
        </button>
      </div>
      <h1 className="text-center display-3">Todo List</h1>
      <div className='table-group'>
      <div className="button-group">
        <button className='btn btn-primary' onClick={getListTodo}>All Todo</button>
        <button className='btn btn-primary' onClick={getCompletedListTodo}>Completed Todo</button>
        <button className='btn btn-primary' onClick={getUnDoneListTodo}>Undone Todo</button>
      
      </div>
      <table className="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th>ID</th>
            <th>TASK</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody className='column'>
          {
            TodoStateApi.map((data) =>
              <tr key={data.id}>
                <td>{data.id}</td>
                <td style={data.completed ? { textDecoration: 'line-through' } : {}}>{data.task}</td>
                <td>
                  <Link to={`/todos/update/${data.id}`}>
                    <i onClick={() => setUpdateTodo(data)} className="fa-solid fa-pen-to-square text-primary"></i>
                  </Link>
                </td>
                <td>
                  <Link to={`/todos/delete/${data.id}`}>
                    <i onClick={() => setDeleteTodo(data.id)} className="fa-solid fa-trash text-danger"></i>
                  </Link>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <Link to={`/todos/completed`}>
        <i onClick={() => setDeleteCompletedTodo()} className="btn btn-primary">Delete Done Todos</i>
      </Link>
      </div>
      
      
    </React.Fragment>
  );
}

export default withTranslation()(Main);
