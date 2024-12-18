import { apiClient } from '../utils/apiClient';
import { handleApiError } from '../utils/apiHandler';
import { env } from '../constants/env';

interface LoginResponse {
  access_token: string;
}
interface UserResponse {
  email: string;
  id: string;
  name: string;
  role: string;
}
interface UpdateUserRequest {
  id: string;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}
export const login = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await apiClient
      .post(`${env.API_URL}/auth/login`, {
        json: { email, password },
      })
      .json<LoginResponse>();

    return response;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

export const getProfile = async (): Promise<UserResponse> => {
  try {
    const response = await apiClient
      .get(`${env.API_URL}/profile`)
      .json<UserResponse>();

    return response;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

export const updateUser = async (
  data: UpdateUserRequest,
): Promise<UserResponse> => {
  try {
    const response = await apiClient
      .patch(`${env.API_URL}/users/${data.id}`, {
        json: { ...data },
      })
      .json<UserResponse>();

    return response;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};

export const getUser = async (id: string): Promise<UserResponse> => {
  try {
    const response = await apiClient
      .get(`${env.API_URL}/users/${id}`)
      .json<UserResponse>();

    return response;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};
