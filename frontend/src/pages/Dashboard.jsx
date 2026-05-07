import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import DashboardCard from "../components/DashboardCard";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const role = localStorage.getItem("role");

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

    const totalTasks = tasks.length;

    const completedTasks =
        tasks.filter(task => task.status === "DONE").length;

    const pendingTasks =
        tasks.filter(task => task.status === "TODO").length;

    const progressTasks =
        tasks.filter(task => task.status === "IN_PROGRESS").length;

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}

            <Sidebar />

            {/* Main Content */}

            <div className="flex-1">

                <Navbar />

                <div className="p-6">

                    <h1 className="text-3xl font-bold mb-6">
                        Dashboard
                    </h1>

                    {/* Analytics */}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

                        <DashboardCard
                            title="Total Tasks"
                            value={totalTasks}
                        />

                        <DashboardCard
                            title="Completed"
                            value={completedTasks}
                        />

                        <DashboardCard
                            title="Pending"
                            value={pendingTasks}
                        />

                        <DashboardCard
                            title="In Progress"
                            value={progressTasks}
                        />

                    </div>

                    {/* Task Form */}

                    {
                        role === "ADMIN" && (
                            <TaskForm fetchTasks={fetchTasks} />
                        )
                    }

                    {/* Tasks */}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

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

export default Dashboard;