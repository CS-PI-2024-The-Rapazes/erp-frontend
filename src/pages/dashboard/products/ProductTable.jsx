import AlertDelete from './ConfirmDeleteBox';
import { getAllProducts } from '../../../services/ProductService';
import React, { Fragment, useEffect, useState } from 'react';
import style from '../Index.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { Delete, Edit } from '@mui/icons-material';
import { ButtonGroup, Tooltip, Typography, IconButton, TableCell, CircularProgress } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { TablePaginationActions } from './TableCustom';
import { useNavigate } from 'react-router-dom';

const ProductTable = () => {
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [productToDelete, setProductToDelete] = useState(null);
    const [openAlert, setOpenAlert] = useState(false);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalElements, setTotalElements] = useState(0);

    const fetchProducts = async (page = 0, size = 10) => {
        setLoading(true);
        try {
            const productsData = await getAllProducts(page, size);
            setProdutos(productsData.content);
            setTotalElements(productsData.totalElements);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const handleDeleteClick = (id, product) => {
        setProductToDelete({ id, product });
        setOpenAlert(true);
    };

    const handleEditClick = (productId) => {
        console.log('productId', productId);
        navigate('/edit-product', { state: { productId } });
    };

    const handleCloseAlert = () => {
        setOpenAlert(false);
        setProductToDelete(null);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const setStatusColor = (status) => {
        return status ? 'green' : 'red';
    };

    const renderTableContent = () => {
        if (loading) {
            return (
                <TableRow>
                    <TableCell colSpan={5} align="center">
                        <Box role="progressbar" sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box>
                    </TableCell>
                </TableRow>
            );
        }

        if (produtos.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={5} align="center">
                        <Typography variant="body1">Nenhum produto cadastrado.</Typography>
                    </TableCell>
                </TableRow>
            );
        }

        return produtos.map((produto) => {
            return (
                <TableRow key={produto.id}>
                    <TableCell className={style.tableNameProduct} component="th" scope="row" style={{ color: produto.status === 'Oculto' ? 'red' : 'inherit' }}>
                        {produto.idProduto}
                        <img src={produto.imagem ? `data:image/jpeg;base64,${produto.imagem}` : 'https://via.placeholder.com/150'} className={style.tableProductimg} alt={produto.nome} />
                        {produto.nome}
                    </TableCell>
                    <TableCell align="right">{produto.categoria}</TableCell>
                    <TableCell align="right">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
                    </TableCell>
                    <TableCell align="right" style={{ color: setStatusColor(produto.status) }}>
                        {produto.status ? 'Ativo' : 'Oculto'}
                    </TableCell>
                    <TableCell align="right">
                        <ButtonGroup disableElevation variant="contained" aria-label="Botões de ação">
                            <Tooltip title="Editar" arrow>
                                <IconButton 
                                    className={style.tableButtonEdit} 
                                    onClick={() => handleEditClick(produto.idProduto)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Excluir" arrow>
                                <IconButton
                                    aria-label={`Botão de deletar, produto selecionado: ${produto.nome}`}
                                    className={style.tableButtonDelete}
                                    onClick={() => handleDeleteClick(produto.idProduto, produto.nome)}
                                >
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </ButtonGroup>
                    </TableCell>
                </TableRow>
            );
        });
    };

    return (
        <Fragment>
            <TableContainer className={style.tableContainer} component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="table">
                    <TableHead className={style.tableHeader}>
                        <TableRow>
                            <TableCell>Produto</TableCell>
                            <TableCell align="right">Categoria</TableCell>
                            <TableCell align="right">Preço</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{renderTableContent()}</TableBody>
                </Table>

                <TablePagination
                    component="div"
                    count={totalElements}
                    page={page}
                    rowsPerPageOptions={[10, 25, 50]}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Produtos por página"
                    ActionsComponent={TablePaginationActions}
                />
            </TableContainer>

            {productToDelete && (
                <AlertDelete
                    id={productToDelete.id}
                    product={productToDelete.product}
                    fetchProducts={fetchProducts}
                    open={openAlert}
                    onClose={handleCloseAlert}
                />
            )}
        </Fragment>
    );
};

export default ProductTable;
