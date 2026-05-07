function Navbar() {

    return (

        <div className="bg-blue-600 text-white p-4 flex justify-between">

            <h1 className="text-2xl font-bold">
                Team Task Manager
            </h1>

            <button
                onClick={() => {

                    localStorage.removeItem("token");

                    window.location.href = "/";

                }}
                className="bg-white text-blue-600 px-4 py-1 rounded"
            >
                Logout
            </button>

        </div>
    );
}

export default Navbar;