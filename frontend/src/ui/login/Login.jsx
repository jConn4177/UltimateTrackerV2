import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/auth/authSlice";
import { useLoginMutation } from "../../services/apiSlice";
import LoginForm from "./LoginForm";
import { Card, Container, Image } from "react-bootstrap";
import "./Login.css";

const Login = () => {
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    errRef.current.focus();
  }, []);

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const userData = await login(values).unwrap();
      dispatch(
        setCredentials({
          user: userData.user,
          access_token: userData.access_token,
          refresh_token: userData.refresh_token,
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
        setErrors({ server: "Login Failed" });
      }
      setSubmitting(false);
      errRef.current.focus();
    }
  };

  return (
    <div className="custom-login">
      <Container className="login-container">
        <Card className="login-card">
          <Image className="login-logo" src="../images/image17.png" />
          <Card.Body>
            <LoginForm
              onSubmit={handleSubmit}
              isLoading={isLoading}
              errRef={errRef}
              navigate={navigate}
            />
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
