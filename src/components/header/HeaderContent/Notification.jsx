import style from "../Header.module.css";
import React from "react";
import { useState } from "react";
import { Badge } from "@mui/material";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import NotificationsIcon from '@mui/icons-material/Notifications';

const Notification = () => {
    const [read] = useState(2);
    return (
        <Box className={style.notificationButton}>
            <IconButton
                variant="light"
                aria-label="notification button"
                className={style.notificationIcon}
            >
                <Badge
                    badgeContent={read}
                    sx={{ fontSize: '0.3rem' }}
                >
                    <NotificationsIcon />
                </Badge>
            </IconButton>
        </Box>
    );
};

export default Notification;