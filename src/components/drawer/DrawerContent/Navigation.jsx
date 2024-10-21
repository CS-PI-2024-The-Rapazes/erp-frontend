import style from '../Sidebar.module.css';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, Tooltip } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { ListItemText } from '@mui/material';
import { ListSubheader } from '@mui/material';
import { Info, InsertChart, Person, Settings, ShoppingCart, TableView, Wallet, Fastfood } from '@mui/icons-material';

const menuItems = [
    { text: 'Visão Geral', icon: <InsertChart />, path: '/dashboard' },
    { text: 'Balcão', icon: <ShoppingCart />, path: '/balcon' },
    { text: 'Comandas', icon: <TableView />, path: '/commands' },
    { text: 'Carteiras', icon: <Wallet />, path: '/wallet' },
    { text: 'Produtos', icon: <Fastfood />, path: '/products' },
];

const otherItems = [
    { text: 'Configurações', icon: <Settings />, path: '#' },
    { text: 'Clientes', icon: <Person />, path: '#' },
    { text: 'Ajuda', icon: <Info />, path: '#' },
];

const Navigation = ({ isOpen, toggleSidebar, isMobile }) => {
    const [selectedIndex, setSelectedIndex] = useState();

    const handleListItemClick = (index) => {
        setSelectedIndex(index);
        if (isMobile) {
            toggleSidebar();
        }
    };

    const renderListItems = (items, offset = 0) =>
        items.map((item, index) => (
            <Tooltip title={isOpen ? '' : item.text} key={item.text}>
                <ListItem
                    button
                    component={Link}
                    className={style.listItem}
                    to={item.path}
                    selected={selectedIndex === index + offset}
                    onClick={() => handleListItemClick(index + offset)}
                >
                    <ListItemIcon className={style.listItemIcon}>{item.icon}</ListItemIcon>
                    {isOpen && <ListItemText primary={item.text} />}
                </ListItem>
            </Tooltip>
        ));

    return (
        <List className={style.containerListSidebar} sx={{ width: '100%', maxWidth: 370 }} component="nav">
            <ListSubheader className={style.sidebarHeader} component="div">
                Menu
            </ListSubheader>
            {renderListItems(menuItems)}

            <ListSubheader className={style.sidebarHeader} component="div">
                Outros
            </ListSubheader>
            {renderListItems(otherItems, menuItems.length)}
        </List>
    );
};

export default Navigation;
