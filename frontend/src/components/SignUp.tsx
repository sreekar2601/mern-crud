import React from "react";
import { useForm } from "react-hook-form";
import { SignUpCredentials } from "../networks/UserApi";
import { User } from "../models/users";
import * as UserApi from "../networks/UserApi";
import { Button, Form, Modal } from "react-bootstrap";
import TextInputField from "./form/TextInputField";
import stylesUtils from "../styles/utils.module.css";

interface SignUpModal {
  onDismiss: () => void;
  onSignUpSuccessful: (user: User) => void;
}

function SignUp({ onDismiss, onSignUpSuccessful }: SignUpModal) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpCredentials>();

  async function onSubmit(credentials: SignUpCredentials) {
    try {
      const newUser = await UserApi.SignUp(credentials);
      onSignUpSuccessful(newUser);
    } catch (error) {
      alert(error);
      console.error(error);
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>SignUp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
            name="email"
            label="email"
            type="email"
            placeholder="Enter Email"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.email}
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
            SignUp
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignUp;
