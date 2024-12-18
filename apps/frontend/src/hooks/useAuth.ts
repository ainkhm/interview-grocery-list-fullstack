import { useMutation, useQuery } from '@tanstack/react-query';
import { login, getProfile, updateUser, getUser } from '../services/auth';
import { setToken, getToken } from '../utils/tokenManager';
import { queryClient } from '../utils/queryClient';

export const useLogin = () => {
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await login(email, password);
      return response;
    },
    onSuccess: async (data) => {
      setToken(data.access_token);
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
  };
};

export const useProfile = () => {
  const token = getToken();

  const { data, isSuccess, isError, isLoading, error } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!token,
  });

  if (isLoading) {
    return { profileData: null, isLoading, isError, error };
  }

  if (isError) {
    return { profileData: null, isLoading, isError, error };
  }

  return { data, isError, isLoading, error };
};

export const useUpdateUser = () => {
  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: async (data: {
      id: string;
      email: string;
      name: string;
      password: string;
      confirmPassword: string;
    }) => {
      const response = await updateUser(data);
      return response;
    },
    onSuccess: async (updatedUser) => {
      const user = await getUser(updatedUser.id);
      queryClient.setQueryData(['profile'], user);
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
  };
};
