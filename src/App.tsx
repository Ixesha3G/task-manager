import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Task } from './interfaces/Task';

function App() {
  const [taskList ,setTaskList] = useState<Task[]>(JSON.parse(localStorage.getItem('taskList') || '[]'))

    useEffect(() => {
      localStorage.setItem('taskList', JSON.stringify(taskList))
    }, [taskList])

  return (
    <>
      <TaskForm taskList={taskList} setTaskList={setTaskList} />
      <TaskList taskList={taskList} setTaskList={setTaskList} />
    </>
  )
}

export default App
