import { useMutation, useQuery } from '@tanstack/react-query'

import { createGroceryItem, getGroceryList } from '../services/grocery'
import { queryClient } from '../utils/queryClient'




export const useGroceryList = (params?: { priority?: number; status?: string; perPage?: number }, enabled = true) => {
  return useQuery({
    queryKey: ['groceryList'],
    queryFn: () => getGroceryList({ ...params }),
    enabled,
  })
}

export const useCreateGrocery = () => {
  return useMutation({
    mutationKey: ['createGrocery'],
    mutationFn: (groceryItem: GroceryFormItem) => createGroceryItem(groceryItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groceryList'] })
    },
  })
}