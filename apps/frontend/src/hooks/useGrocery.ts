import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '../utils/queryClient';
import { getFilterGrocery, GroceryResponse } from '../services/grocery';

export interface FilterData extends Omit<GroceryResponse, 'id'> {
  userId?: string;
}

export const useFilterGrocery = () => {
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: async (filterData: FilterData = {}) => {
      const response = await getFilterGrocery(filterData);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceryList'] });
    },
    onError: (error: any) => {
      return error;
    },
  });

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
    error,
    data,
  };
};
