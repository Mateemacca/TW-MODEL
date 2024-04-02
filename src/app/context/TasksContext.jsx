import { createContext, useContext, useState } from "react";
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../../api/tasks";
const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("UseTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    setIsLoading(false);

    console.log(res);
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      console.log(res);
      if (res.status === 204) {
        setTasks(tasks.filter((task) => task._id !== id));
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      setIsLoading(false);
      return res.data;
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const updateTask = async (id, task) => {
    try {
      const res = await updateTaskRequest(id, task);

      setIsLoading(false);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        getTasks,
        deleteTask,
        getTask,
        updateTask,
        isLoading,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
