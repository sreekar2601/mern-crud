import React from "react";
import { User } from "../models/users";
import * as UserApi from "../networks/UserApi";
import { Button, Navbar } from "react-bootstrap";

interface NavBarLoggedInViewProps {
  user: User;
  onLogoutSuccessful: () => void;
}

function NavBarLoggedInView({
  user,
  onLogoutSuccessful,
}: NavBarLoggedInViewProps) {
  async function logout() {
    try {
      await UserApi.logout();
      onLogoutSuccessful();
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <>
      <Navbar.Text className="me-2">Signed in as : {user.username}</Navbar.Text>
      <Button onClick={logout}> Logout </Button>
    </>
  );
}

export default NavBarLoggedInView;
