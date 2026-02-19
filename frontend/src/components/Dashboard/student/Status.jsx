import React, { useEffect, useState } from "react";

const Status = () => {
  const [applications, setApplications] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/applications/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setApplications(data);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const getStatusColor = (status) => {
    if (status === "pending") return "text-yellow-600";
    if (status === "selected") return "text-green-600";
    if (status === "rejected") return "text-red-600";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Application Status</h2>

      <div className="bg-white p-6 rounded-xl shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th>Role</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="border-b">
                <td>{app.job?.title}</td>
                <td>{app.job?.location}</td>
                <td className={getStatusColor(app.status)}>
                  {app.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <p className="text-gray-500 mt-4">No applications yet.</p>
        )}
      </div>
    </div>
  );
};

export default Status;
