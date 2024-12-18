import { handleApiError } from '../utils/apiHandler';
import { apiClient } from '../utils/apiClient';
import { env } from '../constants/env';

export interface GroceryResponse {
  id: string;
  name?: string;
  status?: 'RANOUT' | 'HAVE';
  priority?: number;
  quantity?: number;
}
export const getFilterGrocery = async (
  data: Partial<{
    userId: string;
    status: string;
    quantity: number;
    priority: number;
    name: string;
  }> = {},
): Promise<GroceryResponse> => {
  try {
    const response = await apiClient
      .post(`${env.API_URL}/grocery/filter`, {
        json: data,
      })
      .json<GroceryResponse>();

    return response;
  } catch (error: any) {
    handleApiError(error);
    throw error;
  }
};