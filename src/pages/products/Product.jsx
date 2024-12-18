import React from 'react';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useNavigate } from 'react-router-dom';
import ProductTable from './ProductTable';
import style from '../dashboard/Index.module.css';

const Products = () => {
    const navigate = useNavigate();

    const toCreateProduct = () => {
        navigate('/new-product');
    };
    return (
        <>
            <div className={style.productHeader}>
                <p className={style.productTitle}>Lista Produtos</p>
                <div className={style.productButtons}>
                    <Button className={style.buttonFilterProduct} startIcon={<FilterAltIcon />}>
                        Filtro
                    </Button>
                    <Button className={style.buttonCreateProduct} startIcon={<AddIcon />} onClick={toCreateProduct}>
                        Adicionar Produto
                    </Button>

                </div>

                <div className={style.mobileButtons}>
                    <Button className={style.mobileFilterProd}>
                        <FilterAltIcon />
                    </Button>
                    <Button className={style.mobileCreateProd} onClick={toCreateProduct}>
                        <AddIcon />
                    </Button>
                </div>
            </div>

            <div className={style.productTableContainer}>
                <ProductTable />
            </div>
        </>
    );
};

export default Products;
