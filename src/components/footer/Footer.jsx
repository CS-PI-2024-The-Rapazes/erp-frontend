import './Footer.css';
import React from 'react';
import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Link } from '@mui/material';

const Footer = () => {
    return (
        <Box
            component="footer"
            className='footer-container'
        >
            <Typography variant="body2" color="text.secondary">
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/CS-PI-2024-The-Rapazes">
                    The Rapazes.
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </Box>
    );
}

export default Footer;