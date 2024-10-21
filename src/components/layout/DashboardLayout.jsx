import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import Sidebar from '../drawer/Sidebar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            marginLeft: isSidebarOpen && !isMobile ? '240px' : '0',
            transition: 'margin-left 0.3s',
        },
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    return (
        <Box sx={styles.container}>
            <CssBaseline />
            <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
            <Box component="main" sx={styles.content}>
                <Toolbar />
                <div>{children}</div>
            </Box>
            <Footer />
        </Box>
    );
};

export default DashboardLayout;
