import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post("/auth/login", {
                email,
                password,
            });

            if (typeof res.data === "string") {

                localStorage.setItem("token", res.data.token);

                localStorage.setItem("role", res.data.role);

                localStorage.setItem("name", res.data.name);

                alert("Login Successful");

                navigate("/dashboard");

            } else {

                alert("Invalid Credentials");
            }

        } catch (error) {

            console.log(error);

            alert("Login Failed");
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-lg w-96"
            >

                <h1 className="text-3xl font-bold text-center mb-6">
                    Login
                </h1>

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
                    className="bg-blue-600 text-white w-full py-3 rounded hover:bg-blue-700"
                >
                    Login
                </button>

                <p className="text-center mt-4">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-1"
                    >
                        Register
                    </Link>

                </p>

            </form>

        </div>
    );
}

export default Login;