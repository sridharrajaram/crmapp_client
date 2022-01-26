import React, { useState, useEffect } from "react";
import axios from "axios";
import useAxiosInstance from "../../utils/useAxiosInstance";

import Sidebar from "../Sidebar";
import UserNav from "../UserNav";
import StatCard from "./StatCard";

function Dashboard() {
  const [stats, setStats] = useState([]);
  const server = useAxiosInstance();

  useEffect(() => {
    const request = axios.CancelToken.source();

    server.get("/api/stats").then((response) => {
      setStats(response.data);
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
        <h4 className="my-4">Dashboard</h4>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} count={stat.count} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
