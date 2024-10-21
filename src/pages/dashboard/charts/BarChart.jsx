import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import style from '../Index.module.css';

const barData = {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    datasets: [
        {
            label: 'Atual',
            backgroundColor: '#3f51b5',
            data: [500, 700, 1000, 800, 1200, 1300, 1100, 950, 1150, 1450, 1200, 1300],
        },
        {
            label: 'Mês anterior',
            backgroundColor: '#e0e0e0',
            data: [400, 650, 800, 750, 900, 1100, 950, 850, 1000, 1200, 950, 1100],
        },
    ],
};

const barOptions = {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
};

const BarChart = () => {
    return (
        <Grid item xs={12} md={6}>
            <Box className={`${style.commonBoxStyles} ${style.borderTableBottomMobile}`}>
                <Box className={style.containerHeaderCharts}>
                    <Box>
                        <Typography className={style.chartTitle}>Vendas</Typography>
                        <Typography variant="h6"><strong>R$ 9.999,99</strong></Typography>
                    </Box>
                    <Button variant="outlined" size="small">Detalhes</Button>
                </Box>
                <Typography className={style.salesCaption}>Vendas 1-12 Ago, 2024</Typography>
                <Box sx={{ height: '250px', mt: 2 }}>
                    {/* Bar Chart */}
                    <Bar data={barData} options={barOptions} />
                </Box>
                <Box sx={{ gap: 5 }} className={style.flexBoxLeft}>
                    <Box className={style.textLeft}>
                        <Box className={style.flexLeft}>
                            <Box className={`${style.monthCircle} ${style.current}`} />
                            <Typography>Atual</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ gap: 5 }} className={style.textLeft}>
                        <Box className={style.flexLeft}>
                            <Box className={`${style.monthCircle} ${style.previous}`} />
                            <Typography>Mês anterior</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default BarChart;
