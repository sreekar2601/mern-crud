import React from "react";
import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
}

function NavBarLoggedOutView({
  onSignUpClicked,
  onLoginClicked,
}: NavBarLoggedOutViewProps) {
  return (
    <>
      <Button onClick={onSignUpClicked}>Sign Up</Button>
      <Button onClick={onLoginClicked}>Login</Button>
    </>
  );
}

export default NavBarLoggedOutView;
