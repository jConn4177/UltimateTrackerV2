import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./NavbarMain.css";
import { useDispatch, useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import NavigationButton from "./NavigationButton";
import SearchBar from "./SearchBar";
import UserControls from "./UserControls";

const NavbarMain = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = !!user; // Authentication status inferred from the presence of a user

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleSearchClick = () => {
    navigate("/");
  };

  return (
    <Navbar expand="lg" fixed="top" className="custom-navbar">
      <NavigationButton
        onClick={handleHomeClick}
        imagePath="/images/logo.png"
        buttonText=""
        alt="home-logo"
      />
      <Container fluid className="custom-container">
        <Navbar.Toggle aria-controls="navbarScroll" className="ms-auto" />
        <Navbar.Collapse id="navbarScroll">
          <SearchBar />
        </Navbar.Collapse>
        <Nav className="ms-auto" style={{ maxHeight: "100px" }} navbarScroll>
          <UserControls
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
            onLogin={handleLogin}
          />
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarMain;
