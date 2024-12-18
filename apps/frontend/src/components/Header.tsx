import React, { useState, useEffect, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Select,
  MenuItem,
  TextField,
  Box,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useProfile } from '../hooks/useAuth';

import LoginForm from '../components/LoginForm';
import UserForm from '../components/UserForm';
import { createPortal } from 'react-dom';
import { useFilterGrocery, FilterData } from '../hooks/useGrocery';

const Header: React.FC = () => {
  const [loginFormToogle, setLoginFormToogle] = useState<boolean>(false);
  const [userFormToggle, setUserFormToggle] = useState<boolean>(false);
  const { data } = useProfile();
  const {
    mutate: filterGrocery,
    isPending,
    data: groceryData,
  } = useFilterGrocery();
  const filterItems = async (params: FilterData) => {
    return filterGrocery(params);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await filterGrocery({});
      console.log(data);
    };

    fetchData();
  }, [data]);

  useEffect(() => {
    console.log(groceryData);
  }, [groceryData]);

  const handleLoginForm = useCallback(() => {
    setLoginFormToogle((prevState) => !prevState);
  }, []);
  const handleUserForm = useCallback(() => {
    setUserFormToggle((prevState) => !prevState);
  }, []);

  const handleStatusChange = ({
    target: { value },
  }: React.ChangeEvent<{ value: string }>) => {
    filterItems({ name: value });
  };

  const handlePriorityChange = ({
    target: { value },
  }: React.ChangeEvent<{ value: number }>) => filterItems({ priority: value });

  const handleNameChange = ({
    target: { value },
  }: React.ChangeEvent<{ value: string }>) => {
    filterItems({ name: value });
  };

  //   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setSearch(event.target.value);
  //   };
  const useFormPortal =
    userFormToggle &&
    createPortal(
      <UserForm
        userFormToggle={userFormToggle}
        handleUserForm={handleUserForm}
      />,
      document.getElementById('modal-root')!,
    );
  const loginFormPortal =
    loginFormToogle &&
    createPortal(
      <LoginForm
        loginFormToogle={loginFormToogle}
        handleLoginForm={handleLoginForm}
      />,
      document.getElementById('modal-root')!,
    );

  return (
    <>
      <AppBar sx={{ backgroundColor: 'black' }} position="sticky">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: 0,
            }}
            disableGutters
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Grocery App
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Select
                value={status}
                onChange={handleStatusChange}
                displayEmpty
                sx={{ minWidth: 200 }}
                size="small"
                slotProps={{
                  root: {
                    style: { backgroundColor: 'white' },
                  },
                }}
              >
                <MenuItem value="" disabled>
                  Status
                </MenuItem>
                <MenuItem value="RANOUT">RANOUT</MenuItem>
                <MenuItem value="HAVE">HAVE</MenuItem>
              </Select>

              <Select
                // value={priority}
                //   onChange={handlePriorityChange}
                displayEmpty
                sx={{ minWidth: 200 }}
                size="small"
                slotProps={{
                  root: {
                    style: { backgroundColor: 'white' },
                  },
                }}
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  Priority
                </MenuItem>
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>

              <Select
                // value={name}
                //   onChange={handleNameChange}
                displayEmpty
                sx={{ minWidth: 200 }}
                size="small"
                slotProps={{
                  root: {
                    style: { backgroundColor: 'white' },
                  },
                }}
                defaultValue=""
              >
                <MenuItem value="" disabled>
                  Name
                </MenuItem>
                <MenuItem value="John">John</MenuItem>
                <MenuItem value="Alice">Alice</MenuItem>
                <MenuItem value="Bob">Bob</MenuItem>
              </Select>

              <TextField
                // value={search}
                slotProps={{
                  input: {
                    style: { backgroundColor: 'white' },
                  },
                }}
                //   onChange={handleSearchChange}
                label="Search"
                variant="outlined"
                size="small"
                sx={{ width: 200 }}
              />
            </Box>

            {!data && (
              <Button
                onClick={handleLoginForm}
                variant="contained"
                style={{ marginLeft: '4rem', backgroundColor: '#00e676' }}
              >
                Login
              </Button>
            )}

            {data && (
              <Tooltip title={data.email} arrow>
                <IconButton
                  style={{ marginLeft: '4rem', backgroundColor: '#00e676' }}
                  sx={{
                    width: 40,
                    height: 40,
                  }}
                  onClick={handleUserForm}
                >
                  <AccountCircleIcon
                    sx={{ fontSize: 30 }}
                    style={{ color: 'black' }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {loginFormPortal}
      {useFormPortal}
    </>
  );
};

export default Header;
