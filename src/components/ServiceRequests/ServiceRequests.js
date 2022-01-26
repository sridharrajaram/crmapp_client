import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxiosInstance from "../../utils/useAxiosInstance";

import Sidebar from "../Sidebar";
import UserNav from "../UserNav";

function ServiceRequests() {
  const [serviceRequests, setServiceRequests] = useState([]);
  const server = useAxiosInstance();

  useEffect(() => {
    const request = axios.CancelToken.source();

    server.get("/api/serviceRequests").then((response) => {
      setServiceRequests(response.data);
    });

    return () => {
      request.cancel();
    };
  }, []);

  function deleteServiceRequest(id) {
    setServiceRequests((prevServiceRequests) =>
      prevServiceRequests.filter((sr) => sr._id !== id)
    );
    server.delete(`/api/serviceRequests/${id}`);
  }

  return (
    <main className="d-flex m-0">
      <Sidebar />
      <div className="container-fluid d-flex flex-column">
        <UserNav />
        <div className="card shadow mt-4">
          <div className="card-header py-3">
            <h6 className="m-0">Service Requests</h6>
          </div>
          <div className="card-body">
            <Link
              className="btn btn-secondary mb-4"
              to="/service-requests/create"
            >
              Create Service Request
            </Link>
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover align-middle"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <caption>List of service requests</caption>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Requested By</th>
                    <th>Subject</th>
                    <th>Assigned</th>
                    <th>Priority</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Due Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {serviceRequests.map((sr, index) => {
                    return (
                      <tr key={sr._id}>
                        <td>{index + 1}</td>
                        <td>{sr.requestedBy}</td>
                        <td>{sr.subject}</td>
                        <td>{sr.assigned}</td>
                        <td>{sr.priority}</td>
                        <td>{sr.status}</td>
                        <td>
                          {new Date(sr.createdAt).toISOString().split("T")[0]}
                        </td>
                        <td>
                          {new Date(sr.dueDate).toISOString().split("T")[0]}
                        </td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <Link
                              to={`/service-requests/edit/${sr._id}`}
                              className="btn btn-sm btn-primary"
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                deleteServiceRequest(sr._id);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ServiceRequests;
