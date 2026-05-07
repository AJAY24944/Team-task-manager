import API from "../services/api";

function TaskCard({ task, fetchTasks }) {

    const deleteTask = async () => {

        const role = localStorage.getItem("role");

        try {

            await API.delete(`/tasks/${task.id}`);

            alert("Task Deleted");

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };

    const updateStatus = async (newStatus) => {

        try {

            await API.put(`/tasks/${task.id}`, {
                ...task,
                status: newStatus,
            });

            fetchTasks();

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div className="border rounded-lg p-4 shadow bg-white">

            <h2 className="text-xl font-bold">
                {task.title}
            </h2>

            <p className="mt-2">
                {task.description}
            </p>

            <p className="mt-2">
                Status:
                <span className="font-semibold ml-2">
                    {task.status}
                </span>
            </p>

            <p className="text-red-500">
                Priority: {task.priority}
            </p>

            <div className="flex gap-2 mt-4">

                <button
                    onClick={() => updateStatus("TODO")}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                    TODO
                </button>

                <button
                    onClick={() => updateStatus("IN_PROGRESS")}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                    Progress
                </button>

                <button
                    onClick={() => updateStatus("DONE")}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                >
                    Done
                </button>

            </div>

            {
                role === "ADMIN" && (

                    <button
                        onClick={deleteTask}
                        className="bg-red-600 text-white px-4 py-2 rounded mt-4"
                    >
                        Delete
                    </button>

                )
            }

        </div>
    );
}

export default TaskCard;