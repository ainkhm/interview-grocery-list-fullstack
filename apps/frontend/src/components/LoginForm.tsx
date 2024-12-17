import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useLogin } from '../hooks/useAuth';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  loginFormToogle: boolean;
  handleLoginForm: () => void;
}

interface FormField {
  name: keyof LoginFormData;
  label: string;
  type: 'email' | 'password';
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

const formFields: FormField[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
  },
];

const LoginForm: React.FC<LoginFormProps> = ({
  loginFormToogle,
  handleLoginForm,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
  });

  const { mutate, isPending, isError, error, isSuccess } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    mutate(data);
  };

  useEffect(() => {
    if (isError && error?.status === 401) {
      setError('email', {
        type: 'manual',
        message: 'Invalid email or password.',
      });
      setError('password', {
        type: 'manual',
        message: 'Invalid email or password.',
      });
    }
  }, [isError, error, setError]);

  useEffect(() => {
    if (isSuccess) {
      handleLoginForm();
    }
  }, [isSuccess, handleLoginForm]);

  return (
    <Dialog open={loginFormToogle} onClose={handleLoginForm}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formFields.map(({ name, label, type }) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={label}
                  type={type}
                  fullWidth
                  margin="dense"
                  error={!!errors[name]}
                  helperText={errors[name]?.message}
                />
              )}
            />
          ))}
          <DialogActions>
            <Button onClick={handleLoginForm}>Cancel</Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Login'
              )}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
