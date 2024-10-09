import React from "react";
import { LinearProgress, Box, Typography, IconButton } from "@mui/material";
import { styles } from "./utilities";
import PropTypes from "prop-types";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/router";

const CustomProgressBar = ({progress, label, onBack, step}) => {
    const router = useRouter();

    const handleBackClick = () => {
        if(step>0) onBack();
        else router.back();
    }

    return (
        <Box sx={[styles.formContainers, { display: 'flex', 
            flexDirection: { 
                xs: 'column-reverse',
                sm: 'column'
            },
            paddingTop: {
                xs: '0px',
                sm: '10px'
            },
            boxShadow: {
                xs: 'none',
                sm:'none'
            },
            background: '#F9FAFB',
            paddingLeft: {
                xs: '20px',
            }
        }]}>
            <Box display={'flex'} sx={{ alignItems: 'center'}}>
                <IconButton  sx={{ height: '24px', width: '24px',  marginRight: '10px', display: { sm: 'none'}}} onClick={handleBackClick}>
                    <ArrowBackIcon color="#374151"/>
                </IconButton>
                <Typography sx={{ fontSize: '24px', fontWeight: '600', color: '#4B5563', textTransform: 'capitalize' }}>{label}</Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={progress}
                style={{ background: "#E5E7EB" }}
                sx={{ "& .MuiLinearProgress-bar": { backgroundColor: "#FE8B4C" } }}
            />
        </Box>
    )
}

CustomProgressBar.proptypes = {
    progress: PropTypes.number,
    label: PropTypes.string,
    onBack: PropTypes.func,
    step: PropTypes.number
}

export default CustomProgressBar;