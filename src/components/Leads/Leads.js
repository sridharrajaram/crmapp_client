import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxiosInstance from "../../utils/useAxiosInstance";

import Sidebar from "../Sidebar";
import UserNav from "../UserNav";

function Leads() {
  const [leads, setLeads] = useState([]);
  const server = useAxiosInstance();

  useEffect(() => {
    const request = axios.CancelToken.source();

    server.get("/api/leads").then((response) => {
      setLeads(response.data);
    });

    return () => {
      request.cancel();
    };
  }, []);

  function deleteLead(id) {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead._id !== id));
    server.delete(`/api/leads/${id}`);
  }

  return (
    <main className="d-flex m-0">
      <Sidebar />
      <div className="container-fluid d-flex flex-column">
        <UserNav />
        <div className="card shadow mt-4">
          <div className="card-header py-3">
            <h6 className="m-0">Leads</h6>
          </div>
          <div className="card-body">
            <Link className="btn btn-secondary mb-4" to="/leads/create">
              Create Lead
            </Link>
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover align-middle"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <caption>List of leads</caption>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Company Name</th>
                    <th>Location</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => {
                    return (
                      <tr key={lead._id}>
                        <td>{index + 1}</td>
                        <td>{lead.company}</td>
                        <td>{lead.location}</td>
                        <td>
                          {new Date(lead.date).toISOString().split("T")[0]}
                        </td>
                        <td>{lead.status}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <Link
                              to={`/leads/edit/${lead._id}`}
                              className="btn btn-sm btn-primary"
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                deleteLead(lead._id);
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

export default Leads;
