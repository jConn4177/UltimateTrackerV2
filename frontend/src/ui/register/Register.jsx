import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../services/apiSlice.js";
import RegisterForm from "./RegisterForm";
import { Card, Container, Image } from "react-bootstrap";
import "./Register.css";
import { setCredentials } from "../../features/auth/authSlice";

const Register = () => {
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    errRef.current.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    const { confirmPassword, ...userData } = values;
    try {
      const response = await register(userData).unwrap();
      dispatch(
        setCredentials({
          user: response.user,
          access_token: response.access_token,
          refresh_token: response.refresh_token,
        })
      );
      navigate("/");
    } catch (err) {
      if (!err?.originalStatus) {
        setErrors({ server: "No Server Response" });
      } else if (err.originalStatus === 400) {
        setErrors({ server: "Missing Username or Password" });
      } else if (err.originalStatus === 401) {
        setErrors({ server: "Unauthorized" });
      } else {
        setErrors({ server: "Register Failed" });
      }
      setSubmitting(false);
      errRef.current.focus();
    }
  };

  return (
    <div className="custom-register">
      <Container className="register-container">
        <Card className="register-card">
          <Image className="register-logo" src="../images/image17.png" />
          <Card.Body>
            <RegisterForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              errRef={errRef}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Register;
