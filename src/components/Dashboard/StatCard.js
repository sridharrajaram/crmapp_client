import React from "react";

function StatCard(props) {
  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{props.title}</h4>
          <p className="fs-3 card-text">{props.count}</p>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
