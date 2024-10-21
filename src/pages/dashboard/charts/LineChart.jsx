import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import style from '../Index.module.css';

const lineData = {
    labels: ['01', '02', '03', '04', '05', '06'],
    datasets: [
        {
            label: 'Atual',
            backgroundColor: '#3f51b5',
            borderColor: '#3f51b5',
            data: [500, 600, 800, 1000, 1200, 1500],
            fill: false,
        },
        {
            label: 'Mês anterior',
            backgroundColor: '#e0e0e0',
            borderColor: '#e0e0e0',
            data: [600, 700, 750, 850, 900, 950],
            fill: false,
        },
    ],
};

const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
};

const LineChart = () => {
    return (
        <Grid item xs={12} md={4}>
            <Box className={`${style.commonBoxStyles} ${style.borderTableBottomMobile}`} >
                <Box className={style.containerHeaderCharts}>
                    <Box>
                        <Typography className={style.chartTitle}>Faturamento</Typography>
                        <Typography variant="h6"> <strong>R$ 2.568</strong> </Typography>
                    </Box>
                    <Button variant="outlined" size="small">Detalhes</Button>
                </Box>
                <Typography className={style.captionLost}> 2.1% ao mês anterior </Typography>
                <Box sx={{ height: '165px', mt: 2 }}>
                    <Line data={lineData} options={lineOptions} />
                </Box>
                <Box sx={{ gap: 5 }} className={style.flexBoxLeft}>
                    <Box className={style.textCenter}>
                        <Box className={style.flexLeft}>
                            <Box className={`${style.monthCircle} ${style.current}`} />
                            <Typography>Atual</Typography>
                        </Box>
                    </Box>

                    <Box className={style.textCenter}>
                        <Box className={style.flexLeft}>
                            <Box className={`${style.monthCircle} ${style.previous}`} />
                            <Typography>Mês anterior</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default LineChart;