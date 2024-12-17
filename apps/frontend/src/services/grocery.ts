import ky from 'ky';
import { apiClient } from '../utils/apiClient';
import { env } from '../constants/env';

interface LoginResponse {
  access_token: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient
      .post(`${env.API_URL}/auth/login`, {
        json: { email, password },
      })
      .json<LoginResponse>();

    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw new Error('Failed to login. Please try again later.');
  }
};

// export const getGroceryList = async (params: {
//   priority?: number;
//   status?: string;
//   name?: string;
// }) => {
//   const searchParams = new URLSearchParams(params as Record<string, string>);
//   const response = await ky
//     .get(`${env.API_URL}/grocery`, { searchParams })
//     .json<{ data: any[] }>();

//   return response.data;
// };

// export const createGroceryItem = async (groceryItem: GroceryFormItem) => {
//   const response = await ky
//     .post(`${env.API_URL}/grocery`, { json: groceryItem })
//     .json<{ data: GroceryItem }>();

//   return response.data;
// };
