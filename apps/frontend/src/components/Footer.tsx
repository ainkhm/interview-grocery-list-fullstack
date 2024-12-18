import { FC } from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { GitHub, LinkedIn } from '@mui/icons-material';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ width: '100%', bgcolor: 'black', py: 1.5, textAlign: 'left' }}>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
        maxWidth={'xl'}
      >
        <Typography color="white" variant="subtitle1">
          {`${currentYear} | Made with 🤞 by Andrey Khmelovsky`}
        </Typography>
        <Box>
          <IconButton
            href="https://github.com/ainkhm"
            target="_blank"
            style={{ color: 'white' }}
          >
            <GitHub />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/andrey-khmelovsky-696b73239/"
            target="_blank"
            style={{ color: 'white' }}
          >
            <LinkedIn />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
