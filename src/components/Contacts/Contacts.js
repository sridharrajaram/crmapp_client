import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useAxiosInstance from "../../utils/useAxiosInstance";

import Sidebar from "../Sidebar";
import UserNav from "../UserNav";

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const server = useAxiosInstance();

  useEffect(() => {
    const request = axios.CancelToken.source();

    server.get("/api/contacts").then((response) => {
      setContacts(response.data);
    });

    return () => {
      request.cancel();
    };
  }, []);

  function deleteContact(id) {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact._id !== id)
    );
    server.delete(`/api/contacts/${id}`);
  }

  return (
    <main className="d-flex m-0">
      <Sidebar />
      <div className="container-fluid d-flex flex-column">
        <UserNav />
        <div className="card shadow mt-4">
          <div className="card-header py-3">
            <h6 className="m-0">Contacts</h6>
          </div>
          <div className="card-body">
            <Link className="btn btn-secondary mb-4" to="/contacts/create">
              Create Contact
            </Link>
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover align-middle"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <caption>List of contacts</caption>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Phone no</th>
                    <th>Email</th>
                    <th>Company</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map((contact, index) => {
                    return (
                      <tr key={contact._id}>
                        <td>{index + 1}</td>
                        <td>{contact.name}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.email}</td>
                        <td>{contact.company}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <Link
                              to={`/contacts/edit/${contact._id}`}
                              className="btn btn-sm btn-primary"
                            >
                              Edit
                            </Link>
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => {
                                deleteContact(contact._id);
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

export default Contacts;
