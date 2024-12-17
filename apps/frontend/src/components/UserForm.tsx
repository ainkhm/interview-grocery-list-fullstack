import React, { useEffect, useId } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Box,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useProfile, useUpdateUser } from '../hooks/useAuth';

interface UserFormProps {
  userFormToggle: boolean;
  handleUserForm: () => void;
}

enum FormFieldType {
  EMAIL = 'email',
  NAME = 'name',
  PASSWORD = 'password',
}
interface UserFormData {
  id: string;
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface FormField {
  name: keyof Omit<UserFormData, 'id'>;
  label: string;
  type: FormFieldType;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
  name: Yup.string()
    .max(30, 'Name cannot be longer than 30 characters')
    .required('Name is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const formFields: FormField[] = [
  { name: 'email', label: 'Email', type: FormFieldType.EMAIL },
  { name: 'name', label: 'Name', type: FormFieldType.NAME },

  { name: 'password', label: 'Password', type: FormFieldType.PASSWORD },
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: FormFieldType.PASSWORD,
  },
];

const UserForm: React.FC<UserFormProps> = ({
  userFormToggle,
  handleUserForm,
}) => {
  const { data } = useProfile();
  const { mutate, isPending, isError, error, isSuccess } = useUpdateUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UserFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: { ...data },
  });

  useEffect(() => {
    if (isSuccess) {
      handleUserForm();
    }
  }, [isSuccess, handleUserForm]);

  const onSubmit = (data: UserFormData) => {
    mutate(data);
  };

  useEffect(() => {
    if (isError && error?.status === 400) {
      setError('email', {
        type: 'manual',
        message: 'Email already in useю, please update it.',
      });
    }
  }, [isError, error, setError]);

  return (
    <Dialog open={userFormToggle} onClose={handleUserForm}>
      <DialogTitle>Update User Info</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formFields.map(({ name, label, type }) => {
            const keyId = useId();
            return (
              <Controller
                key={keyId}
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
            );
          })}

          <DialogActions style={{ flexDirection: 'column' }}>
            <Box display="flex" justifyContent="flex-end" width="100%">
              <Button onClick={handleUserForm} style={{ color: 'black' }}>
                Cancel
              </Button>
              <Button type="submit" style={{ color: 'black' }}>
                {isPending ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Save Changes'
                )}
              </Button>
            </Box>

            <Box width="100%" mt={2}>
              <Button
                //onClick={handleLogout}
                variant="contained"
                fullWidth
                size="large"
                style={{ backgroundColor: 'black' }}
              >
                Logout
              </Button>
            </Box>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserForm;
