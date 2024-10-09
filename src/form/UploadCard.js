import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Paper, Dialog, DialogContent, DialogActions } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DeleteOutline } from '@mui/icons-material';
import Image from 'next/image';
import { Pancard, Gst } from '@public/assets/icons';

const GstInputComponent = ({ onFileSelect, docType, valueUrl }) => {
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [open, setOpen] = useState(false);

    const isDocGST = docType === 'gst'
    const label = isDocGST ? "Company's GST Document" : "Company's PAN Card";
    const btnText = isDocGST ?  "Upload GST" : 'Upload PAN'

    useEffect(() => {
        console.log("cehck url here", valueUrl);
        if (valueUrl) {
            setPreviewUrl(valueUrl);
            console.log("cehck preview --", previewUrl);
        }
    }, [valueUrl]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const fileUrl = URL.createObjectURL(selectedFile)
        setFile(selectedFile);
        onFileSelect(fileUrl)
        setPreviewUrl(fileUrl);
        // For demo purposes, we assume the GST number is extracted from the file
    };

    const styles = {
        contained: {
            borderRadius: '8px', maxHeight: '48px', py: '10px', width: '100%',
            backgroundColor: '#113B73',
            textTransform: 'none'
        },
        outlined: {
            textTransform: 'none', width: '100%',
            borderRadius: '8px', maxHeight: '48px', py: '10px', backgroundColor: '#fff', borderWidth: 1, borderColor: '#113B73'
        },
        iconBtn: { height: '42px', width: '42px', borderRadius: '21px', boxShadow: '0px 4px 25px 0px rgba(0, 0, 0, 0.05)' }
    }

    const handleDelete = () => {
        setFile(null);
        setPreviewUrl('');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3, textAlign: 'center', borderRadius: '10px' }}>
            <Typography fontSize={'18px'} fontWeight={'600'} sx={{ mb: '8px'}}>
                {label}
            </Typography>
            {previewUrl ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', mb: 2 }}>
                    <img src={previewUrl} alt="GST Document" style={{ width: '212px', height: 'auto', border: '1px solid #ccc', borderRadius: '10px', marginRight: '8px' }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '92px' }}>
                        <IconButton aria-label="view" onClick={handleClickOpen} style={styles.iconBtn}>
                            <VisibilityIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={handleDelete} color="error" style={styles.iconBtn}>
                            <DeleteOutline />
                        </IconButton>
                    </Box>
                </Box>
            ) : <Image src={isDocGST ? Gst : Pancard}/>}
            <Button variant={isDocGST ? "contained" : "outlined"} component="label" sx={isDocGST ? styles.contained : styles.outlined} >
                <Typography fontSize={'16px'} fontWeight={'600'} color={isDocGST ? '#fff' : '#113B73'}>{btnText}</Typography>
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogContent>
                    <img src={previewUrl} alt="GST Document" style={{ width: '100%', height: 'auto' }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} type='button' color="primary" sx={styles.contained}>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default GstInputComponent;
