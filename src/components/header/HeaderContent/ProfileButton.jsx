import { customPaper } from '../headerStyles'
import style from '../Header.module.css'
import React from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Settings, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ButtonProfile = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const custompaper = customPaper();

    return (
        <>
            <Box sx={{ display: 'flow', alignItems: 'center', textAlign: 'center' }}>
                <ButtonBase
                    className={style.profileButton}
                    onClick={handleClick}
                    aria-label="open profile"
                    aria-haspopup="true"

                >
                    <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
                        <Avatar alt="profile user" src={""} size="sm" />
                        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
                            Luisao
                        </Typography>
                        <ExpandMoreIcon />
                    </Stack>
                </ButtonBase>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={custompaper}

                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Perfil
                </MenuItem>

                <Divider />
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Configurações
                </MenuItem>
                <MenuItem onClick={() => { handleLogout(); handleClose(); }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Sair
                </MenuItem>
            </Menu>
        </>
    );
}

export default ButtonProfile;