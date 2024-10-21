import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

// HEADER STYLEs
export const headerStyles = (isMobile, isSidebarOpen, theme) => ({
    appBar: {
        width: isMobile ? '100%' : isSidebarOpen ? `calc(100% - 240px)` : '100%',
        marginLeft: isMobile ? '0px' : isSidebarOpen ? '240px' : '70px',
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    iconButton: {
        marginRight: '1px',
    },
});

// SEARCH STYLE
export const CustomInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 5,
        backgroundColor: '#F3F6F9',
        border: 'none',
        borderColor: '#E0E3E7',
        fontSize: 16,
        padding: '10px 10px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.1rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

// PROFILE BUTTON
export const customPaper = () => ({
    paper: {
        elevation: 0,
        sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
            },
            '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
            },
        },
    },
});