import React from "react";
import { User } from "../models/users";
import { useForm } from "react-hook-form";
import { LoginBody } from "../networks/UserApi";
import * as UserApi from "../networks/UserApi";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import stylesUtils from "../styles/utils.module.css";

interface LoginProps {
  onDismiss: () => void;
  onLoginSuccessful: (user: User) => void;
}

function Login({ onDismiss, onLoginSuccessful }: LoginProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginBody>();

  async function onLogin(credentials: LoginBody) {
    try {
      const loggedInUser = await UserApi.login(credentials);
      onLoginSuccessful(loggedInUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onLogin)}>
          <TextInputField
            name="username"
            label="username"
            type="text"
            placeholder="Enter Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />

          <TextInputField
            name="password"
            label="password"
            type="password"
            placeholder="Enter Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            className={stylesUtils.width100}
          >
            Login
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default Login;
