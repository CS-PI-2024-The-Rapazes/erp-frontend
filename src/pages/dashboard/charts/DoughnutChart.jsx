import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import style from '../Index.module.css';

const doughnutData = {
    labels: ['Tarde', 'Noite', 'Manhã'],
    datasets: [
        {
            data: [40, 32, 28],
            backgroundColor: ['#5C6BC0', '#7986CB', '#9FA8DA'],
            hoverBackgroundColor: ['#3F51B5', '#5C6BC0', '#7986CB'],
            borderWidth: 2,
            cutout: '70%',
        },
    ],
};

const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
};

const DoughnutChart = () => {
    return (
        <Grid item xs={12} md={6}>
            <Box sx={{ p: 2, borderLeft: '1px solid #e0e0e0', height: "100%" }} className={style.borderTableBottomMobile}>
                <Box className={style.containerHeaderCharts}>
                    <Box>
                        <Typography className={style.chartTitle}>Períodos Agendados</Typography>
                        <Typography className={style.chartCaption}>Agenda 1-12 Ago, 2024</Typography>
                    </Box>

                    <Button variant="outlined" size="small">Detalhes</Button>
                </Box>

                <Box sx={{ height: '250px', mt: 2 }}>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                </Box>

                <Box className={style.flexBoxCenter}>
                    <Box className={style.textCenter}>
                        <Box className={style.flexCenter}>
                            <Box className={`${style.circleDoughnut} ${style.afternoon}`} />
                            <Typography>Tarde</Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary">40%</Typography>
                    </Box>

                    <Box className={style.textCenter}>
                        <Box className={style.flexCenter}>
                            <Box className={`${style.circleDoughnut} ${style.night}`} />
                            <Typography>Noite</Typography>
                        </Box>
                        <Typography st variant="body2" color="textSecondary">32%</Typography>
                    </Box>

                    <Box className={style.textCenter}>
                        <Box className={style.flexCenter}>
                            <Box className={`${style.circleDoughnut} ${style.morning}`} />
                            <Typography>Manhã</Typography>
                        </Box>
                        <Typography variant="body2" color="textSecondary" className={style.percentText}>28%</Typography>
                    </Box>
                </Box>
            </Box>
        </Grid >
    )
}

export default DoughnutChart;