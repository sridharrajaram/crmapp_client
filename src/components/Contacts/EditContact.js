import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import useAxiosInstance from "../../utils/useAxiosInstance";
import cogoToast from "cogo-toast";

import Sidebar from "../Sidebar";
import UserNav from "../UserNav";

function EditContact(props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const history = useHistory();
  const server = useAxiosInstance();

  const { id } = useParams();

  useEffect(() => {
    const request = axios.CancelToken.source();

    server
      .get(`/api/contacts/${id}`)
      .then((response) => {
        const data = response.data;
        setName(data.name);
        setPhone(data.phone);
        setEmail(data.email);
        setCompany(data.company);
      })
      .catch(() => history.push("/NotFound"));

    return () => {
      request.cancel();
    };
  }, [id]);

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const contact = { name, phone, email, company };
      await server.put(`/api/contacts/${id}`, contact);
      cogoToast.success("Contact edited successfully!");
      history.push("/contacts");
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
            <h3 className="h3 my-4 text-gray-800">Edit Contact</h3>
            <div className="row g-3">
              <div className="col-lg-6">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  value={name}
                  placeholder="Enter Person Name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  pattern="(?:\(?\+\d{2}\)?\s*)?\d+(?:[ -]*\d+)*"
                  placeholder="Enter Phone Number"
                  className="form-control"
                  value={phone}
                  onChange={(event) => {
                    setPhone(event.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  className="form-control"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                  autoComplete="off"
                  required
                />
              </div>
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

export default EditContact;
