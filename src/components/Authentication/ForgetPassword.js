import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

import "./ForgetPassword.css";

import HomeNav from "../HomeNav";
import Footer from "../Footer";
import TextError from "./TextError";

const SERVER_URL = "https://sridharrajaram-crmapp.herokuapp.com";
//const SERVER_URL = "http://localhost:5000";

const server = axios.create({
  baseURL: SERVER_URL,
});

function ForgetPassword() {
  const style = {
    textDecoration: "none",
  };

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      const response = await server.post("/api/auth/forget-password", values);
      alert(response.data);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      resetForm();
    }
  };

  return (
    <>
      <HomeNav />
      <main className="bg-dark forget-password-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header">
                  <h3 className="text-center font-weight-light my-4">
                    Password Recovery
                  </h3>
                </div>
                <div className="card-body">
                  <div className="small mb-3 text-muted">
                    Enter your email address and we will send you a link to
                    reset your password.
                  </div>
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {(formik) => {
                      return (
                        <Form>
                          <div className="form-floating mb-3">
                            <Field
                              type="email"
                              name="email"
                              id="email"
                              className="form-control"
                              placeholder="name@example.com"
                              autoComplete="off"
                            />
                            <label htmlFor="email">Email address</label>
                            <ErrorMessage name="email" component={TextError} />
                          </div>
                          <div
                            className="
                          d-flex
                          align-items-center
                          justify-content-between
                          mt-4
                          mb-0
                        "
                          >
                            <Link to="/login" className="small" style={style}>
                              Return to login
                            </Link>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              disabled={!formik.isValid}
                            >
                              Reset Password
                            </button>
                          </div>
                        </Form>
                      );
                    }}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ForgetPassword;
