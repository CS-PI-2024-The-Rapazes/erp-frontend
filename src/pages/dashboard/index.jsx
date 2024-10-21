import style from './Index.module.css'
import React from 'react';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import { Typography } from '@mui/material';
import { List } from '@mui/material';
import { ListItem } from '@mui/material';
import { ListItemAvatar } from '@mui/material';
import { Avatar } from '@mui/material';
import { ListItemText } from '@mui/material';
import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement } from 'chart.js';
import BarChart from './charts/BarChart';
import DoughnutChart from './charts/DoughnutChart';
import LineChart from './charts/LineChart';

Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement);


const clients = [
    { name: 'Joao', amount: 'R$ 1.500,00' },
    { name: 'Gustavo', amount: 'R$ 1.000,00' },
    { name: 'Mateus', amount: 'R$ 997,00' },
    { name: 'Daniel', amount: 'R$ 750,00' },
];

const products = [
    { name: 'Tábua de Frios', amount: 'R$ 9.000,00' },
    { name: 'Bolo prestígio', amount: 'R$ 3.000,00' },
    { name: 'Torta de palmito', amount: 'R$ 450,00' },
    { name: 'Bolinho de Aipim', amount: 'R$ 300,00' },
];

const commonBoxStyles = { p: 2, height: '100%' };

const Dashboard = () => {
    return (
        <Box sx={{ p: 1 }} >
            <Grid spacing={4}>
                <Grid container>
                    {/* Internal Import BarChart from Charts */}
                    <BarChart />
                    {/* Internal Import DoughnutChart from Charts */}
                    <DoughnutChart />
                </Grid>

                <Grid container sx={{ width: '100%' }} className={style.commonBoxTable}>
                    <Grid item xs={12} md={4} >
                        <Box sx={commonBoxStyles} className={style.borderTableBottomMobile}>
                            <Typography className={style.chartTitle}>Clientes que mais compram</Typography>
                            <Typography className={style.chartCaption}>
                                Vendas 1-12 Ago, 2024
                            </Typography>
                            <List>
                                {clients.map((client, index) => (
                                    <ListItem key={index} className={style.listItensMostSales}>
                                        <Box className={style.containerListSalesAvatar}>
                                            <ListItemAvatar>
                                                <Avatar className={style.listSalesAvatarColor} />
                                            </ListItemAvatar>
                                            <ListItemText primary={client.name} />
                                        </Box>
                                        <Typography>{client.amount}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box className={style.borderTableBottomMobile}
                            sx={{ p: 2, borderLeft: '1px solid #e0e0e0', borderRight: '1px solid #e0e0e0' }}>
                            <Typography className={style.chartTitle} >Produtos mais vendidos</Typography>
                            <Typography className={style.chartCaption}>
                                Vendas 1-12 Ago, 2024
                            </Typography>
                            <List>
                                {products.map((product, index) => (
                                    <ListItem key={index} className={style.listItensMostSales}>
                                        <Box className={style.containerListSalesAvatar}>
                                            <ListItemAvatar>
                                                <Avatar className={style.listSalesAvatarColor} />
                                            </ListItemAvatar>
                                            <ListItemText primary={product.name} />
                                        </Box>
                                        <Typography>{product.amount}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Grid>
                    {/* Internal Import LineChart from Charts */}
                    <LineChart />
                </Grid>
            </Grid>
        </Box >
    );
};

export default Dashboard;