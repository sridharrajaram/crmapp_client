import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useAxiosInstance from "../../utils/useAxiosInstance";
import cogoToast from "cogo-toast";

import Sidebar from "../Sidebar";
import UserNav from "../UserNav";

function EditLead(props) {
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const history = useHistory();
  const server = useAxiosInstance();

  const { id } = useParams();

  useEffect(() => {
    const request = axios.CancelToken.source();

    server
      .get(`/api/leads/${id}`)
      .then((response) => {
        const data = response.data;
        setCompany(data.company);
        setLocation(data.location);
        setDate(new Date(data.date).toISOString().split("T")[0]);
        setStatus(data.status);
      })
      .catch(() => history.push("/NotFound"));

    return () => {
      request.cancel();
    };
  }, [id]);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const lead = { company, location, date, status };
      await server.put(`/api/leads/${id}`, lead);
      cogoToast.success("Lead edited successfully!");
      history.push("/leads");
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
            <h3 className="h3 my-4 text-gray-800">Edit Lead</h3>
            <div className="row g-3">
              <div className="col-lg-6">
                <label htmlFor="company">Company Name</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  className="form-control"
                  value={company}
                  placeholder="Enter Company Name"
                  onChange={(event) => {
                    setCompany(event.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-control"
                  value={location}
                  placeholder="Enter Location"
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="form-control"
                  value={date}
                  onChange={(event) => {
                    setDate(event.target.value);
                  }}
                  required
                />
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
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Lost">Lost</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Confirmed">Confirmed</option>
                </select>
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

export default EditLead;
