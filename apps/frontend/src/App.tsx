import { FC } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';
import Footer from './components/Footer';
import Header from './components/Header';
import GroceryTable from './components/GroceryTable';
import { CssBaseline } from '@mui/material';

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CssBaseline />
      <Header />
      <GroceryTable />
      <Footer />
    </QueryClientProvider>
  );
};

export default App;
