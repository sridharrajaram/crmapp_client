import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxiosInstance from "../../utils/useAxiosInstance";

import Sidebar from "../Sidebar";
import UserNav from "../UserNav";

function Users() {
  const [users, setUsers] = useState([]);
  const server = useAxiosInstance();

  useEffect(() => {
    const request = axios.CancelToken.source();

    server.get("/api/users").then((response) => {
      setUsers(response.data);
    });

    return () => {
      request.cancel();
    };
  }, []);

  return (
    <main className="d-flex m-0">
      <Sidebar />
      <div className="container-fluid d-flex flex-column px-4">
        <UserNav />
        <div className="card shadow mt-4">
          <div className="card-header py-3">
            <h6 className="m-0">Users</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered table-hover align-middle"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <caption>List of users</caption>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => {
                    return (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.firstName}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
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

export default Users;
