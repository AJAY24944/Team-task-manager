import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="w-64 h-screen bg-gray-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        Task Manager
      </h1>

      <div className="flex flex-col gap-4">

        <Link
          to="/dashboard"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Tasks
        </Link>

      </div>

    </div>
  );
}

export default Sidebar;