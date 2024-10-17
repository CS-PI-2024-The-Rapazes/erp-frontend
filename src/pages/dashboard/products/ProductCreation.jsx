import React, { useState } from 'react';
import { styled } from '@mui/system';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box, Checkbox, FormControlLabel, Typography, Button, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import style from '../Index.module.css';
import { ArrowBackIosOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { save } from '../../../services/ProductService';
import { toast } from 'react-toastify';

const UploadBox = styled(Box)({
    border: '2px dashed #dbdbdb',
    borderRadius: '50%',
    width: '170px',
    height: '170px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    backgroundColor: '#f5f5f5',
    position: 'relative',
    overflow: 'hidden',
});

const ProductCreation = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [nome, setNome] = useState('');
    const [codigoListagem, setCodigoListagem] = useState('');
    const [categoria, setCategoria] = useState('');
    const [detalhes, setDetalhes] = useState('');
    const [preco, setPreco] = useState('');
    const [imagem, setImagem] = useState(null);
    const [status, setStatus] = useState(false);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImagem(file);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNavigateBack = () => {
        navigate(-1);
    };

    const handleSaveClick = async () => {

        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result.split(',')[1];

            const productData = {
                nome,
                codigoListagem,
                categoria,
                detalhes,
                preco: Number(preco),
                status,
                imagem: base64Image, 
            };

            try {
                await save(productData);
                toast.success("Produto salvo com sucesso!");

                // Resetar campos
                setNome('');
                setCodigoListagem('');
                setCategoria('');
                setDetalhes('');
                setPreco('');
                setStatus(false);
                setImagem(null);
                setImagePreview(null);

                navigate('/products');
            } catch (error) {
                toast.error("Erro ao salvar o produto!");
                console.error("Erro ao fazer requisição:", error);
            }
        };

        reader.readAsDataURL(imagem);
    };

    return (
        <>
            <Link onClick={handleNavigateBack} underline="none" className={style.backLink}>
                <ArrowBackIosOutlined fontSize="small" /> Voltar
            </Link>
            <Box className={style.newproductContainer}>
                <p className={style.productTitle}> Novo Produto</p>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Box className={style.uploadContainer}>
                            <UploadBox
                                sx={{ mb: 5 }}
                                onClick={() => document.getElementById('imageUpload').click()}
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Prévia" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <AddAPhotoIcon fontSize="large" sx={{ color: '#9e9e9e' }} />
                                )}
                            </UploadBox>
                            <input
                                type="file"
                                id="imageUpload"
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                            <Typography color="textSecondary" className={style.specifications}>
                                <p>Formatos</p>
                                <strong>JPG, JPEG e PNG</strong>
                            </Typography>
                            <Typography color="textSecondary" className={style.specifications}>
                                <p>Tamanho</p>
                                <strong>2MB</strong>
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <InputLabel required><strong>Nome</strong></InputLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel required><strong>Código</strong></InputLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={codigoListagem}
                                    onChange={(e) => setCodigoListagem(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel id="category-form" required><strong>Categoria</strong></InputLabel>
                                <Select
                                    fullWidth
                                    labelId="category-label"
                                    variant="outlined"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                >
                                    <MenuItem value=""><em><strong>Selecionar</strong></em></MenuItem>
                                    <MenuItem value={10}>Categoria 1</MenuItem>
                                    <MenuItem value={20}>Categoria 2</MenuItem>
                                </Select>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel required><strong>Detalhes</strong></InputLabel>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={detalhes}
                                    onChange={(e) => setDetalhes(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel required><strong>Preço</strong></InputLabel>
                                <TextField
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    value={preco}
                                    onChange={(e) => setPreco(e.target.value)}
                                    InputProps={{
                                        startAdornment: 'R$ ',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControlLabel
                                    required
                                    className={style.ActiveCheckbox}
                                    control={<Checkbox checked={status} onChange={(e) => setStatus(e.target.checked)} />}
                                    label="Ativo"
                                />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
                            <Button
                                className={style.saveNewProductButton}
                                onClick={handleSaveClick}
                            >
                                Salvar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}

export default ProductCreation;
