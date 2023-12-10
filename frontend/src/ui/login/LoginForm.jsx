import React from "react";
import { Form as BootstrapForm, Button, Alert } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";

const LoginForm = ({ onSubmit, isLoading, errRef, navigate }) => (
  <Formik initialValues={{ username: "", password: "" }} onSubmit={onSubmit}>
    {({ isSubmitting, errors }) => (
      <Form className="login-form">
        {isLoading && <Alert variant="info">Loading...</Alert>}
        <ErrorMessage
          name="server"
          render={(msg) => <Alert variant="danger">{msg}</Alert>}
        />
        <BootstrapForm.Group className="mb-3">
          <BootstrapForm.Label htmlFor="username">
            Username:
          </BootstrapForm.Label>
          <Field
            name="username"
            as={BootstrapForm.Control}
            type="text"
            placeholder="Username"
          />
        </BootstrapForm.Group>
        <BootstrapForm.Group className="mb-3">
          <BootstrapForm.Label htmlFor="password">
            Password:
          </BootstrapForm.Label>
          <Field
            name="password"
            as={BootstrapForm.Control}
            type="password"
            placeholder="Password"
          />
        </BootstrapForm.Group>
        <div
          ref={errRef}
          className={errors.server ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          <ErrorMessage name="server" component="div" />
        </div>
        <div className="button-container">
          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="login-button"
          >
            Log-In
          </Button>
          <span className="text-center p-text-login">
            Or if you don't have an account, yet:
          </span>
          <Button
            className="register-button"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
