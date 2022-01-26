import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import cogoToast from "cogo-toast";

import "./Register.css";

import HomeNav from "../HomeNav";
import Footer from "../Footer";
import TextError from "./TextError";

const SERVER_URL = "http://localhost:5000/"

const server = axios.create({
  baseURL: SERVER_URL,
});

function Register() {
  const history = useHistory();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("")
      .min(6, "Password is too short - should be 6 chars minimum."),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password must match")
      .required("Required"),
    role: Yup.string().required("Required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      await server.post("/api/auth/register", values);
      cogoToast.success("Account created successfully. Try log in now.");
      history.push("/login");
    } catch (error) {
      cogoToast.error(error.response.data.message);
    } finally {
      resetForm();
    }
  };

  return (
    <>
      <HomeNav />
      <main className="bg-dark register-page">
        <div className="row justify-content-center p-3">
          <div className="col-md-7">
            <div className="card shadow-lg border-0 rounded-lg">
              <div className="card-header">
                <h3 className="text-center font-weight-light my-4">
                  Create Account
                </h3>
              </div>
              <div className="card-body">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {(formik) => {
                    return (
                      <Form>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <Field
                                className="form-control"
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Enter your first name"
                                autoComplete="off"
                              />
                              <label htmlFor="firstName">First name</label>
                              <ErrorMessage
                                name="firstName"
                                component={TextError}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating">
                              <Field
                                className="form-control"
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Enter your last name"
                                autoComplete="off"
                              />
                              <label htmlFor="lastName">Last name</label>
                              <ErrorMessage
                                name="lastName"
                                component={TextError}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="form-floating mb-3">
                          <Field
                            className="form-control"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="name@example.com"
                            autoComplete="off"
                          />
                          <label htmlFor="email">Email address</label>
                          <ErrorMessage name="email" component={TextError} />
                        </div>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <Field
                                className="form-control"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Create a password"
                                autoComplete="off"
                              />
                              <label htmlFor="password">Password</label>
                              <ErrorMessage
                                name="password"
                                component={TextError}
                              />
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-floating mb-3 mb-md-0">
                              <Field
                                className="form-control"
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                placeholder="Confirm password"
                                autoComplete="off"
                              />
                              <label htmlFor="confirmPassword">
                                Confirm Password
                              </label>
                              <ErrorMessage
                                name="confirmPassword"
                                component={TextError}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="ps-2">
                          <h6 className="fw-bold mt-3">Role</h6>
                          <div className="form-check form-check-inline">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="role"
                              id="admin"
                              value="Admin"
                            />
                            <label className="form-check-label" htmlFor="role">
                              Admin
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="role"
                              id="manager"
                              value="Manager"
                            />
                            <label className="form-check-label" htmlFor="role">
                              Manager
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <Field
                              className="form-check-input"
                              type="radio"
                              name="role"
                              id="employee"
                              value="Employee"
                            />
                            <label className="form-check-label" htmlFor="role">
                              Employee
                            </label>
                          </div>
                          <ErrorMessage name="role" component={TextError} />
                        </div>
                        <div className="mt-4 mb-0">
                          <div className="d-grid">
                            <button
                              type="submit"
                              className="btn btn-success btn-block"
                              disabled={!formik.isValid}
                            >
                              Create Account
                            </button>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
              <div class="card-footer text-center py-3">
                <div class="small">
                  <Link to="/login">Already a customer? login to access</Link>
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

export default Register;
