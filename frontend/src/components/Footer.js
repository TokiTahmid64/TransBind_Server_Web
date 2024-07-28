import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        p: 2,
        mt: 2,
        textAlign: 'center',
      }}
    >
      <Typography variant="body1">
        © 2024 RNA Binding Protein Site. All rights reserved.
      </Typography>
      <Typography variant="body2">
        <Link href="#" color="inherit">
          Privacy Policy
        </Link>{' '}
        |{' '}
        <Link href="#" color="inherit">
          Terms of Service
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
