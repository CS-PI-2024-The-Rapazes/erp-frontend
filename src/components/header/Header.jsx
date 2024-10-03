import style from './Header.module.css';
import { headerStyles } from './headerStyles';

import React from 'react';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import ButtonProfile from './HeaderContent/ProfileButton';
import Search from './HeaderContent/Search';
import Notification from './HeaderContent/Notification';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import clsx from 'clsx';

const Header = ({ isSidebarOpen, toggleSidebar }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const config = headerStyles(isMobile, isSidebarOpen, theme);

    return (
        <AppBar
            position="fixed"
            sx={config.appBar}
            className={clsx(style.topbar,
                { 'expanded': isSidebarOpen, 'collapsed': !isSidebarOpen })}
        >
            <Toolbar sx={config.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleSidebar}
                    sx={config.iconButton}
                >
                    <MenuOpenIcon />
                </IconButton>
                <Search />
                <div className={style.buttonsContainer}>
                    <ButtonProfile />
                    <Notification />
                </div>
            </Toolbar>
        </AppBar >
    );
};

export default Header;
