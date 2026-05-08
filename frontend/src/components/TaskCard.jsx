import API from "../services/api";

function TaskCard({ task, fetchTasks }) {
    const role = localStorage.getItem("role") ?? "";

    const deleteTask = async () => {
        if (!window.confirm("Are you sure you want to delete this task?")) return;
        try {
            await API.delete(`/tasks/${task.id}`);
            fetchTasks();
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    const updateStatus = async (newStatus) => {
        if (task.status === newStatus) return;
        try {
            await API.put(`/tasks/${task.id}`, {
                ...task,
                status: newStatus,
            });
            fetchTasks();
        } catch (error) {
            console.error("Status update failed:", error);
        }
    };

    const statusColor = {
        TODO: "bg-yellow-100 text-yellow-800",
        IN_PROGRESS: "bg-blue-100 text-blue-800",
        DONE: "bg-green-100 text-green-800",
    };

    const priorityColor = {
        LOW: "text-green-500",
        MEDIUM: "text-yellow-500",
        HIGH: "text-red-500",
    };

    return (
        <div className="border rounded-lg p-4 shadow bg-white hover:shadow-md transition">

            <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-gray-800">{task.title}</h2>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${statusColor[task.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {task.status}
                </span>
            </div>

            <p className="mt-2 text-gray-600">{task.description}</p>

            <p className={`mt-2 text-sm font-semibold ${priorityColor[task.priority] ?? "text-gray-500"}`}>
                Priority: {task.priority}
            </p>

            <div className="flex gap-2 mt-4 flex-wrap">
                <button
                    onClick={() => updateStatus("TODO")}
                    disabled={task.status === "TODO"}
                    className="bg-yellow-500 disabled:opacity-40 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                    TODO
                </button>
                <button
                    onClick={() => updateStatus("IN_PROGRESS")}
                    disabled={task.status === "IN_PROGRESS"}
                    className="bg-blue-500 disabled:opacity-40 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                    In Progress
                </button>
                <button
                    onClick={() => updateStatus("DONE")}
                    disabled={task.status === "DONE"}
                    className="bg-green-500 disabled:opacity-40 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                    Done
                </button>
            </div>

            {role === "ADMIN" && (
                <button
                    onClick={deleteTask}
                    className="bg-red-600 text-white px-4 py-2 rounded mt-4 hover:bg-red-700 transition w-full"
                >
                    Delete Task
                </button>
            )}

        </div>
    );
}

export default TaskCard;