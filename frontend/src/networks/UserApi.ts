import { User } from "../models/users";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function getLoggedIn(): Promise<User> {
  const response = await fetchData("/api/user", { method: "GET" });
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function SignUp(user: SignUpCredentials): Promise<User> {
  const response = await fetchData("/api/user/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
}

export interface LoginBody {
  username: string;
  password: string;
}

export async function login(user: LoginBody): Promise<User> {
  const response = await fetchData("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return response.json();
}

export async function logout() {
  const response = await fetchData("/api/user/logout", {
    method: "POST",
  });
}
