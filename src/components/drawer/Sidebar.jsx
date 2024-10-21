import style from './Sidebar.module.css'
import React from 'react';
import { Typography, Box } from '@mui/material';
import LogoSVG from '../Img/logo.svg';
import Navigation from './DrawerContent/Navigation';
import { CustomDrawer } from './DrawerContent/CustomDrawer'

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
    return (
        <CustomDrawer
            variant={isMobile ? 'temporary' : 'persistent'}
            open={isOpen}
            onClose={toggleSidebar}
            ModalProps={{ keepMounted: true }}
        >
            <Box className={style.logoContainer}>
                <img className={style.logo} src={LogoSVG} alt="Logo" />
                <Typography className={style.title} >
                    snacktime
                </Typography>
            </Box>
            <Navigation isOpen={isOpen} toggleSidebar={toggleSidebar} isMobile={isMobile} />
        </CustomDrawer>
    );
};

export default Sidebar;
