// src/ui/header/SearchBar.jsx
import React from "react";
import { Form, Button, Image } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSearchInput } from "../../features/tournaments/searchSlice";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    dispatch(setSearchInput(e.target.value));
  };

  return (
    <Form className="custom-searchbar">
      {/* <Button className="custom-search-button">
        Search{" "}
        <Image
          className="magnifying-glass"
          src="/images/magnifying-glass.svg"
        />
      </Button> */}
      <Form.Control
        type="search"
        placeholder="Search for Tournaments"
        className="search-input"
        aria-label="Search"
        onChange={handleInputChange}
      />
    </Form>
  );
};

export default SearchBar;
