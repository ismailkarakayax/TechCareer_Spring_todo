import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function TodoUpdate() {
  const { id } = useParams();
  const [task, setTask] = useState('');
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Burada, verilen "id" ile mevcut todo öğesini getirin ve başlangıç değerlerini ayarlayın
    axios
      .get(`http://localhost:8080/api/todos/get/${id}`)
      .then((response) => {
        const todo = response.data;
        setTask(todo.task);
        setCompleted(todo.completed);
        
      })
      .catch((error) => {
        console.error('Error fetching todo:', error);
      });
  }, [id]);

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleCompletedChange = (checked) => {
    setCompleted(checked);
  };

  const handleSubmit = () => {
    // Güncellenmiş ToDoItemDto nesnesini oluşturun
    const updatedTodo = {
      task: task,
      completed: completed,
    };

    // API'ye güncelleme isteği gönderin
    axios
      .put(`http://localhost:8080/api/todos/update/${id}`, updatedTodo)
      .then((response) => {
        // Başarıyı işleyin, yönlendirme veya liste güncelleme gibi işlemleri gerçekleştirin
        console.log('Todo updated successfully', response.data);
        // İhtiyaca göre yönlendirme veya liste güncelleme yapın
        navigate("/todos/list")
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
      });
  };

  return (
    <div className='form-button-group'>
      <h1>Update Todo</h1>
      <div className='form-group'>
        <label>Task:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a to do"
          value={task}
          onChange={handleTaskChange}
        />
      </div>
      <div class="custom-checkbox">
        <input type="checkbox" id="completedCheckbox" checked={completed} onChange={() => handleCompletedChange(!completed)} />
        <label for="completedCheckbox">Completed</label>
      </div>

      <button
        onClick={handleSubmit}
        className="btn btn-primary"
        >Update Todo</button>
    </div>
  );
}

export default TodoUpdate;
