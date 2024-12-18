import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import { FirstPage, LastPage, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import styled from 'styled-components';


export const COLORS = {
    border: '#dbdbdb',
    background: '#f5f5f5',
    icon: '#9e9e9e',
};

export const UploadBox = styled(Box)({
    border: `2px dashed ${COLORS.border}`,
    borderRadius: '50%',
    marginTop: '10px',
    width: '170px',
    height: '170px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: COLORS.background,
    position: 'relative',
    overflow: 'hidden',
    transition: 'border 0.3s ease-in-out',

    '&:hover, &:focus': {
        border: `2px dashed #3f51b5`,
    },

    '@media (max-width: 600px)': {
        width: '140px',
        height: '140px',
    },
});


export const TablePaginationActions = (props) => {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <Tooltip title="Primeira página">
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="Primeira página"
                >
                    {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
                </IconButton>
            </Tooltip>

            <Tooltip title="Página anterior">
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="Página anterior"
                >
                    {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
                </IconButton>
            </Tooltip>

            <Tooltip title="Próxima página">
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Próxima página"
                >
                    {theme.direction === 'rtl' ? <ChevronLeft /> : <ChevronRight />}
                </IconButton>
            </Tooltip>

            <Tooltip title="Última página">
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="Última página"
                >
                    {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
                </IconButton>
            </Tooltip>
        </Box >
    );
};

export default TablePaginationActions;