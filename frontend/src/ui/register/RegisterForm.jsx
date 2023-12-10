// RegisterForm.jsx
import React from "react";
import { Form as BootstrapForm, Button, Alert } from "react-bootstrap";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema for the form
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const RegisterForm = ({ onSubmit, isLoading, errRef }) => (
  <Formik
    initialValues={{
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    }}
    validationSchema={RegisterSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting, errors }) => (
      <Form className="register-form">
        {isLoading && <Alert variant="info">Registering...</Alert>}
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
          <BootstrapForm.Label htmlFor="email">Email:</BootstrapForm.Label>
          <Field
            name="email"
            as={BootstrapForm.Control}
            type="email"
            placeholder="Email"
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
        <BootstrapForm.Group className="mb-3">
          <BootstrapForm.Label htmlFor="confirmPassword">
            Confirm Password:
          </BootstrapForm.Label>
          <Field
            name="confirmPassword"
            as={BootstrapForm.Control}
            type="password"
            placeholder="Confirm Password"
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
            className="register-button"
          >
            Register
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default RegisterForm;
