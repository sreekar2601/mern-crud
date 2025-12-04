import { Container } from "react-bootstrap";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import { useEffect, useState } from "react";
import { User } from "./models/users";
import * as UserApi from "./networks/UserApi";
import SignUp from "./components/SignUp";
import NotesPageLoggedInView from "./components/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesPageLoggedOutView";

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  useEffect(() => {
    async function loggedInUser() {
      try {
        const response = await UserApi.getLoggedIn();
        setLoggedInUser(response);
      } catch (error) {
        alert(error);
        console.error(error);
      }
    }
    loggedInUser();
  }, []);

  return (
    <div>
      <NavBar
        loggedInUser={loggedInUser}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLoginClicked={() => setShowLoginModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      ></NavBar>

      <Container>
        <>
          {loggedInUser ? (
            <NotesPageLoggedInView />
          ) : (
            <NotesPageLoggedOutView />
          )}
        </>
      </Container>
      {showSignUpModal && (
        <SignUp
          onDismiss={() => setShowSignUpModal(false)}
          onSignUpSuccessful={(user) => {
            setLoggedInUser(user);
            setShowSignUpModal(false);
          }}
        ></SignUp>
      )}

      {showLoginModal && (
        <Login
          onDismiss={() => setShowLoginModal(false)}
          onLoginSuccessful={(user) => {
            setLoggedInUser(user);
            setShowLoginModal(false);
          }}
        ></Login>
      )}
    </div>
  );
}

export default App;
