import { useEffect, useState } from "react";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Projects() {

    const [projects, setProjects] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        fetchProjects();

    }, []);

    const fetchProjects = async () => {

        try {

            const res = await API.get("/projects");

            setProjects(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    const createProject = async () => {

        try {

            await API.post("/projects", {
                name,
                description,
            });

            alert("Project Created");

            setName("");
            setDescription("");

            fetchProjects();

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
                        Projects
                    </h1>

                    <div className="bg-white shadow p-4 rounded mb-6">

                        <input
                            type="text"
                            placeholder="Project Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-2 w-full mb-3 rounded"
                        />

                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="border p-2 w-full mb-3 rounded"
                        />

                        <button
                            onClick={createProject}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Create Project
                        </button>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                        {
                            projects.map((project) => (

                                <div
                                    key={project.id}
                                    className="border rounded-lg p-4 shadow bg-white"
                                >

                                    <h2 className="text-xl font-bold">
                                        {project.name}
                                    </h2>

                                    <p className="mt-2">
                                        {project.description}
                                    </p>

                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Projects;