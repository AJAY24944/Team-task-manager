import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await API.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Registration Successful");

      navigate("/");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white w-full py-3 rounded hover:bg-green-700"
        >
          Register
        </button>

        <p className="text-center mt-4">

          Already have an account?

          <Link
            to="/"
            className="text-blue-600 ml-1"
          >
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;