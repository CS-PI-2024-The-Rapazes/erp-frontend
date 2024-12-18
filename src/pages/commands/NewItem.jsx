import React, { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Grid, TextField, InputAdornment, IconButton, Box, Button, Tooltip, Divider, ButtonGroup, Radio, Switch, FormControlLabel} from '@mui/material';
import { getAllProducts } from "../../services/ProductService";
import { Search, Delete, Edit, ArrowRightAltOutlined, ArrowLeftOutlined } from "@mui/icons-material";
import style from './command.module.css'

const ProdutoCard = ({ nome, preco, imagem }) => (
    <Card sx={{ minWidth: 200 }}>
        <CardContent>
            <CardMedia
                component="img"
                sx={{ width: 50, height: 50, margin: '0 auto' }}
                image={imagem || 'https://via.placeholder.com/150'}
                alt="Ícone do produto"
            />
            <Typography variant="body1" gutterBottom>
                {nome}
            </Typography>
            <Typography variant="body2" color={preco === 'Calculando preço...' ? 'orange' : 'green'}>
                {preco ? `R$ ${preco.toFixed(2)}` : 'Calculando preço...'}
            </Typography>
        </CardContent>
    </Card>
);

const ResumoComanda = ({ isPagamento, handlePagamento, checked, handleSwitchChange }) => (
    <Box className={style.boxTickets}>
        <Typography className={style.tickeTittle} sx={{ mb: 1 }} variant="h6">Comanda 4</Typography>
        <Box className={style.boxTittleComanda}>
            <ButtonGroup
                fullWidth
                disableElevation
                variant="contained"
                aria-label="Button group for comanda"
            >
                <Button className={style.buttonWidth} disabled={!isPagamento}>Resumo</Button>
                <Button className={style.buttonWidth} disabled={isPagamento}>Pagamento</Button>
            </ButtonGroup>
        </Box>
        {isPagamento ? (
            <Box className={style.boxItens}>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2">pagamento parcial:</Typography>
                    <Typography className="box-pagamento" variant="body2">R$ 48,00</Typography>
                </Box>
            </Grid>
    <Grid container spacing={2}>
    <Grid item xs={12}>
        <Box display="flex" alignItems="center" gap={0.5}>
            <Tooltip title="Selecionar Dinheiro" arrow>
                <IconButton size="small" color="primary">
                    <Radio />
                </IconButton>
            </Tooltip>
            <Typography fontWeight="bold" variant="body2" color="textPrimary">
                dinheiro
            </Typography>
            <Typography variant="caption" color="textSecondary">
                troco para:
            </Typography>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
                <Typography variant="body2" className="box-pagamento">
                    R$ 0,00
                </Typography>
            </Grid>
        </Box>
    </Grid>
    <Grid item xs={12}>
        <Box display="flex" alignItems="center" gap={0.5}>
            <Tooltip title="Selecionar Cartão" arrow>
                <IconButton size="small" color="primary">
                    <Radio />
                </IconButton>
            </Tooltip>
            <Typography variant="body2" color="textPrimary">
                cartão
            </Typography>
        </Box>
        <Divider sx={{ marginY: 1.5 }} />
    </Grid>
</Grid>


    <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
            <Typography variant="body2">total consumido:</Typography>
            <Typography variant="body2">R$ 48,00</Typography>
        </Box>
        <Divider sx={{ marginY: 1.5 }} />
    </Grid>

    <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={2}>
            <Typography variant="body2">desconto:</Typography>
            <Box display="flex" alignItems="center" gap={0.5}>
                <Box className="box-pagamento">
                    <Typography variant="body2" color="textPrimary">
                        R$
                    </Typography>
                </Box>
                <Box className="box-pagamento">
                    <Typography variant="body2" color="textPrimary">
                        0%
                    </Typography>
                </Box>
            </Box>
        </Box>
        <Divider sx={{ marginY: 1.5 }} /> 
    </Grid>

    <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
            <Typography variant="body2">total devido:</Typography>
            <Typography variant="body2">R$ 48,00</Typography>
        </Box>
        <Divider sx={{ marginY: 1.5 }} /> 
    </Grid>

    <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
            <Typography variant="body2">pago:</Typography>
            <Typography variant="body2">R$ 0,00</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
            <Typography variant="body2">troco:</Typography>
            <Typography variant="body2">R$ 0,00</Typography>
        </Box>
        <Divider sx={{ marginY: 1.5 }} /> 
    </Grid>

    <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1} className="box-pagamento" sx={{ marginY: 1.5 }} >
            <Typography fontWeight="bold" variant="body2">total restante:</Typography>
            <Typography className={style.tickeTittle} variant="body2">R$ 48,00</Typography>
        </Box >
    </Grid >

    <Grid item xs={12}>
        <Box display="flex" justifyContent="space-between" alignItems="center" gap={1}>
        <FormControlLabel
            control={
              <Switch checked={checked} onChange={handleSwitchChange} size="small" color="primary" sx={{ml:1}}/>
            }
            label="concluir ao pagar totalmente"
          />
            <Button variant="contained" className={style.buttonSend}>
                Pagar
            </Button>
        </Box>
        <Divider sx={{ marginY: 1.5 }} />
    </Grid>
    <Box className={style.boxButton}>
            <Button variant="contained" className={style.buttonSend}>
                <ArrowLeftOutlined />
                Fechar conta
            </Button>
        </Box>
        </Box>
        
        ) : (
            <Box className={style.boxItens}>
                <Grid container alignItems="center" spacing={2}>
                <Grid item xs={1}>
                    <Typography variant="body2" color="#f50057">1x</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography variant="body2">Cento</Typography>
                    <Typography variant="caption" color="textSecondary">+ Frango</Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="body2" align="right">R$ 48,00</Typography>
                </Grid>
                <Divider></Divider>
                <Grid item xs={2}>
                    <Box display="flex" justifyContent="center" gap={1}>
                        <Tooltip title="Editar" arrow>
                            <IconButton size="small" color="primary">
                                <Edit />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Deletar" arrow>
                            <IconButton size="small" className={style.buttonDelete}>
                                <Delete />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ marginY: 1.5 }} />
            <Box className={style.boxInformation} sx={{ marginY: 1.5 }} >
            <Typography variant="subtitle1" gutterBottom><strong>Subtotal: </strong>R$ 48,00</Typography>
            <TextField
                fullWidth
                size="small"
                placeholder="Digite alguma observação no pedido"
                sx={{ mb: 1, backgroundColor: '#fff', borderRadius: 1 }}
                InputProps={{ style: { color: '#333' } }}
            />
            <Typography className={style.subTittle} gutterBottom>DESTINO DESTE PRODUTO</Typography>
            </Box>
            </Box>
        )}
        {!isPagamento && (
            <Box className={style.boxButton}>
                <Button
                    variant="contained"
                    className={style.buttonSend}
                    onClick={handlePagamento}
                >
                    Colocar na Comanda
                    <ArrowRightAltOutlined />
                </Button>
            </Box>
        )}
    </Box>
);


const NewItem = () => {
    const [produtos, setProdutos] = useState([]);
    const [isPagamento, setIsPagamento] = useState(false);
    const [checked, setChecked] = useState(false);

    const fetchProducts = async () => {
        try {
            const productsData = await getAllProducts();
            setProdutos(productsData.content || []);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const handleSwitchChange = (event) => {
        setChecked(event.target.checked);
      };

    const handlePagamento = () => {
        setIsPagamento(true); 
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Grid container spacing={2} sx={{ p: 2 }}>
            <Grid item xs={12} md={7}>
                <div>
                    <Typography variant="h5" gutterBottom>Adicionar Item</Typography>
                    <TextField
                        fullWidth
                        id="outlined-size-small"
                        size="small"
                        placeholder="digite o nome ou código do produto"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton>
                                        <Search />
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />
                </div>

                <div>
                    <Typography variant="h6" gutterBottom>Produtos</Typography>
                    <Grid container spacing={2}>
                        {produtos.map((produto) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={produto.idProduto}>
                                <ProdutoCard
                                    nome={produto.nome}
                                    preco={produto.preco}
                                    imagem={produto.imagem}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </Grid>
            <Grid item xs={12} md={5} mb={5}>
                <ResumoComanda
                 isPagamento={isPagamento} 
                 handlePagamento={handlePagamento} 
                  />
            </Grid>
        </Grid>
    );
};

export default NewItem;
