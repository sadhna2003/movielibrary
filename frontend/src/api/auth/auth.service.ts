import { apiFetch } from "../api-fetch";
import { API_PATHS } from "@/api/constant";
import { clearAuthData, getToken, setAuthData } from "@/api/utils";

export const userSignUp = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  const response = await apiFetch(API_PATHS.SIGN_UP, {
    method: "POST",
    body: JSON.stringify({ email, password, name }),
  });
  return response;
};

export const userSignIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<any> => {
  const response = (await apiFetch(API_PATHS.SIGN_IN, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })) as any;
  setAuthData(response.token, response.user);
  return response;
};

export const userSignOut = async () => {
  clearAuthData();
  window.location.href = "/";
};

export const changePassword = async (data: any) => {
  const token = getToken(); // get it fresh every time
  const response = await apiFetch(API_PATHS.CHANGE_PASSWORD, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return response;
};
