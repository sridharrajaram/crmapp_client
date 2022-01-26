import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useAxiosInstance from "../../utils/useAxiosInstance";
import cogoToast from "cogo-toast";

import Sidebar from "../Sidebar";
import UserNav from "../UserNav";

function CreateServiceRequest() {
  const [requestedBy, setRequestedBy] = useState("");
  const [subject, setSubject] = useState("");
  const [assigned, setAssigned] = useState("");
  const [priority, setPriority] = useState("Low");
  const [status, setStatus] = useState("Created");
  const [dueDate, setDueDate] = useState("");
  const history = useHistory();
  const server = useAxiosInstance();

  async function submitHandler(event) {
    try {
      event.preventDefault();
      const serviceRequest = {
        requestedBy,
        subject,
        assigned,
        priority,
        status,
        dueDate,
        createdAt: new Date().toISOString().split("T")[0],
      };
      await server.post("/api/serviceRequests", serviceRequest);
      cogoToast.success("Service Request added successfully!");
      history.push("/service-requests");
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  return (
    <main className="d-flex m-0">
      <Sidebar />
      <div className="container-fluid d-flex flex-column">
        <UserNav />
        <form onSubmit={submitHandler}>
          <div className="container">
            <h3 className="h3 my-4 text-gray-800">Create Service Request</h3>
            <div className="row g-3">
              <div className="col-lg-6">
                <label htmlFor="name">Requested By</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={requestedBy}
                  placeholder="Enter Name"
                  onChange={(event) => {
                    setRequestedBy(event.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="form-control"
                  value={subject}
                  placeholder="Enter Subject"
                  onChange={(event) => {
                    setSubject(event.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="assignee">Assigned</label>
                <input
                  type="text"
                  id="assigned"
                  name="assigned"
                  className="form-control"
                  value={assigned}
                  placeholder="Enter Assigned Name"
                  onChange={(event) => {
                    setAssigned(event.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="priority">Priority</label>
                <select
                  id="priority"
                  name="priority"
                  className="form-select"
                  value={priority}
                  onChange={(event) => {
                    setPriority(event.target.value);
                  }}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="col-lg-6">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  className="form-select"
                  value={status}
                  onChange={(event) => {
                    setStatus(event.target.value);
                  }}
                >
                  <option value="Created">Created</option>
                  <option value="Open">Open</option>
                  <option value="In Process">In Process</option>
                  <option value="Released">Released</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Confirmed">Confirmed</option>
                </select>
              </div>
              <div className="col-lg-6">
                <label htmlFor="date">Due Date</label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="form-control"
                  value={dueDate}
                  onChange={(event) => {
                    setDueDate(event.target.value);
                  }}
                  required
                />
              </div>
              <div className="col-lg-12">
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-primary mt-3"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CreateServiceRequest;
