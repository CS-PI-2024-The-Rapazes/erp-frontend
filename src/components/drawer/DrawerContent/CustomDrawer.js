import { Drawer } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomDrawer = styled(Drawer)(({ theme }) => ({
    flexShrink: 0,
    whiteSpace: 'nowrap',
    '& .MuiDrawer-paper': {
        width: 250,
        borderRight: 'none',
        boxSizing: 'border-box',
        transition: 'width 0.3s ease',
        backgroundColor: 'var(--background-drawer)',
    },
}));

export { CustomDrawer };
