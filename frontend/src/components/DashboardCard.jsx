function DashboardCard({ title, value }) {

  return (

    <div className="bg-blue-600 text-white shadow rounded-lg p-6">

      <h2 className="text-lg">
        {title}
      </h2>

      <h1 className="text-4xl font-bold mt-2">
        {value}
      </h1>

    </div>
  );
}

export default DashboardCard;