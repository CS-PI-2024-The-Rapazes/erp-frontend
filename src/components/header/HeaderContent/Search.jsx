import { CustomInput } from '../headerStyles';
import style from '../Header.module.css';
import React, { useState } from 'react';
import { FormControl, IconButton, ClickAwayListener } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Box from '@mui/material/Box';
import { SearchOutlined, Close } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const Search = () => {
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSearchClick = () => {
        setShowSearch(true);
    };

    const handleCloseSearch = () => {
        setShowSearch(false);
        setSearch('');
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <Box sx={{ width: '100%', position: 'relative' }}>
            {isMobile && !showSearch ? (
                <IconButton onClick={handleSearchClick} aria-label="search">
                    <SearchOutlined />
                </IconButton>
            ) : null}

            {isMobile && showSearch && (
                <ClickAwayListener onClickAway={handleCloseSearch}>
                    <FormControl className={style.searchInput}>
                        <CustomInput
                            size="small"
                            placeholder="Buscar"
                            className={style.searchIcon}
                            value={search}
                            onChange={handleSearchChange}
                            endAdornment={(
                                <InputAdornment position="end">
                                    <IconButton onClick={handleCloseSearch}>
                                        <Close />
                                    </IconButton>
                                </InputAdornment>
                            )}
                        />
                    </FormControl>
                </ClickAwayListener>
            )}

            {!isMobile && (
                <FormControl className={style.searchInput}>
                    <CustomInput
                        size="small"
                        placeholder="Buscar"
                        className={style.searchIcon}
                        value={search}
                        onChange={handleSearchChange}
                        endAdornment={(
                            <InputAdornment position="start">
                                <IconButton className={style.searchIconButton}>
                                    <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        )}
                    />
                </FormControl>
            )}
        </Box>

    );
};

export default Search;