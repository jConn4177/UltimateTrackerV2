import React from "react";
import { Button, Image } from "react-bootstrap";
import "./NavigationButton.css";

const NavigationButton = ({ onClick, imagePath, buttonText }) => (
  <Button className={`${buttonText.toLowerCase()}-button`} onClick={onClick}>
    {buttonText}
    <Image className={`${buttonText.toLowerCase()}-image`} src={imagePath} />
  </Button>
);

export default NavigationButton;
