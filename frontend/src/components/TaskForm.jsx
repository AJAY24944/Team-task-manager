import { useState } from "react";
import API from "../services/api";

function TaskForm({ fetchTasks }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post("/tasks", {
        title,
        description,
        priority,
        status,
        dueDate: "2026-05-10"
      });

      alert("Task Created");

      setTitle("");
      setDescription("");
      setPriority("");
      setStatus("");

      fetchTasks();

    } catch (error) {

      console.log(error);

      alert("Error Creating Task");
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white shadow p-4 rounded-lg mb-6"
    >

      <h2 className="text-2xl font-bold mb-4">
        Create Task
      </h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      >

        <option value="">Select Priority</option>

        <option value="HIGH">HIGH</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="LOW">LOW</option>

      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 w-full mb-3 rounded"
      >

        <option value="">Select Status</option>

        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>

      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Task
      </button>

    </form>
  );
}

export default TaskForm;