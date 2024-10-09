import  { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [task, setTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const InputChange = (e) => {
    setTask(e.target.value);
    
  };

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((_, i) => i === index);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      
      <div className="input-area">
        <input 
          type="text" 
          value={task} 
          onChange={InputChange} 
          placeholder="Enter a new task" 
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="task-list">
        {tasks.map((task, index) => (
          <li key={index} className="task-item">
            <span 
              className={task.completed ? 'completed' : ''}
            >
              {task.text}
            </span>
            <div className="btns">
            <button  
              onClick={() => toggleTaskCompletion(index)}>Done</button>
            <button onClick={() => removeTask(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
