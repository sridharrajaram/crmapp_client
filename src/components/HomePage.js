import React from "react";

import "./HomePage.css";

import HomeNav from "./HomeNav";
import Footer from "./Footer";

function HomePage() {
  return (
    <>
      <HomeNav />
      <main>
        <div className="jumbotron">
          <div className="container">
            <h1 className="display-3">CRM Application</h1>
            <p className="col-md-8 fs-5">
              Customer relationship management (CRM) is a process in which a
              business or other organization administers its interactions with
              customers, typically using data analysis to study large amounts of
              information.
            </p>
            <p>
              <a
                className="btn btn-success btn-lg"
                href="https://en.wikipedia.org/wiki/Customer_relationship_management"
                role="button"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn more »
              </a>
            </p>
          </div>
        </div>
        <div className="container testimonial pb-sm-5">
          <h2 className="text-center pb-4">Customer Reviews</h2>
          <div className="row text-center">
            <div className="col-lg-4 mb-3">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                className="rounded-circle"
                width="110"
                height="110"
                title="Customer"
                alt="Customer"
              />
              <h4 className="py-2">Customer 1</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="col-lg-4 mb-3">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                className="rounded-circle"
                width="110"
                height="110"
                title="Customer"
                alt="Customer"
              />
              <h4 className="py-2">Customer 2</h4>
              <p>
                Dignissim cras tincidunt lobortis feugiat vivamus at augue eget.
                Nunc sed velit dignissim sodales ut eu. Tincidunt lobortis
                feugiat vivamus at augue eget. Interdum velit euismod in
                pellentesque massa placerat.
              </p>
            </div>
            <div className="col-lg-4 mb-3">
              <img
                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                className="rounded-circle"
                width="110"
                height="110"
                title="Customer"
                alt="Customer"
              />
              <h4 className="py-2">Customer 3</h4>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default HomePage;
