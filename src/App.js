import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";

import HomePage from "./components/HomePage";
import Login from "./components/Authentication/Login";
import ForgetPassword from "./components/Authentication/ForgetPassword";
import Register from "./components/Authentication/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";
import Spinner from "./components/Spinner/Spinner";

const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));
const Users = lazy(() => import("./components/Users/Users"));
const Leads = lazy(() => import("./components/Leads/Leads"));
const CreateLead = lazy(() => import("./components/Leads/CreateLead"));
const EditLead = lazy(() => import("./components/Leads/EditLead"));
const Contacts = lazy(() => import("./components/Contacts/Contacts"));
const CreateContact = lazy(() => import("./components/Contacts/CreateContact"));
const EditContact = lazy(() => import("./components/Contacts/EditContact"));
const ServiceRequests = lazy(() =>
  import("./components/ServiceRequests/ServiceRequests")
);
const CreateServiceRequest = lazy(() =>
  import("./components/ServiceRequests/CreateServiceRequest")
);
const EditServiceRequest = lazy(() =>
  import("./components/ServiceRequests/EditServiceRequest")
);

const App = (props) => {
  let token = localStorage.getItem("token");

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {!token ? (
            <HomePage />
          ) : (
            <Suspense fallback={Spinner}>
              <Dashboard />
            </Suspense>
          )}
        </Route>
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/forget-password" component={ForgetPassword} exact />

        <ProtectedRoute path="/dashboard" exact>
          <Suspense fallback={Spinner}>
            <Dashboard />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/users" exact>
          <Suspense fallback={Spinner}>
            <Users />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/leads" exact>
          <Suspense fallback={Spinner}>
            <Leads />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/leads/create" exact>
          <Suspense fallback={Spinner}>
            <CreateLead />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/leads/edit/:id" exact>
          <Suspense fallback={Spinner}>
            <EditLead />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/contacts" exact>
          <Suspense fallback={Spinner}>
            <Contacts />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/contacts/create" exact>
          <Suspense fallback={Spinner}>
            <CreateContact />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/contacts/edit/:id" exact>
          <Suspense fallback={Spinner}>
            <EditContact />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/service-requests" exact>
          <Suspense fallback={Spinner}>
            <ServiceRequests />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/service-requests/create" exact>
          <Suspense fallback={Spinner}>
            <CreateServiceRequest />
          </Suspense>
        </ProtectedRoute>
        <ProtectedRoute path="/service-requests/edit/:id" exact>
          <Suspense fallback={Spinner}>
            <EditServiceRequest />
          </Suspense>
        </ProtectedRoute>
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;
