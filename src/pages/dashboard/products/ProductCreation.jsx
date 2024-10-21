import React, { useState } from 'react';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box, Checkbox, FormControlLabel, Typography, Button, Grid, InputLabel, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import style from '../Index.module.css';
import { ArrowBackIosOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { save } from '../../../services/ProductService';
import { toast } from 'react-toastify';
import { COLORS, UploadBox } from './TableCustom';

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

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setStatus(checked);
        console.log("Checkbox status:", checked);
    };

    const handleSaveClick = async () => {

        if (!nome || !categoria || !preco || !imagem) {
            toast.error("Todos os campos obrigatórios * devem ser preenchidos.");
            return;
        }

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

            console.log(productData);


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
                                    <img src={imagePreview} alt="Prévia" className={style.imagePreview} />
                                ) : (
                                    <AddAPhotoIcon fontSize="large" sx={{ color: COLORS.icon }} />
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
                        <p className={style.requiredImage}>O campo de imagem é obrigatório.</p>
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
                                <InputLabel><strong>Código</strong></InputLabel>
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
                                <InputLabel><strong>Detalhes</strong></InputLabel>
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
                                <Tooltip title="Ao marcar como ativo, o produto será exibido para os clientes." arrow>
                                    <FormControlLabel
                                        className={style.ActiveCheckbox}
                                        control={<Checkbox checked={status} onChange={handleCheckboxChange} />}
                                        label="Ativar produto"
                                    />
                                </Tooltip>
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
