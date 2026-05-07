import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";

function Tasks() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const res = await API.get("/tasks");

      setTasks(res.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <div className="p-6">

          <h1 className="text-3xl font-bold mb-6">
            Tasks
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {
              tasks.map((task) => (

                <TaskCard
                  key={task.id}
                  task={task}
                  fetchTasks={fetchTasks}
                />

              ))
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default Tasks;