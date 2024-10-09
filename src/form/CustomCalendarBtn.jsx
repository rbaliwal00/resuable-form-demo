import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PropTypes from 'prop-types';
import moment from 'moment';

const CustomDatePicker = ({ value, onChange, placeholder, label, isDob }) => {

    const handleDateChange = (newValue) => {
        // Ensure newValue is converted to the expected format or dayjs object before passing up
        onChange(newValue ? moment(newValue).format('YYYY-MM-DD') : '');
    };

    const maxDateDob = moment().subtract(18, 'years');

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <Box>
                {label && <Typography color={'#9CA3AF'} sx={{ mb: '8px' }}>{label}</Typography>}
                <DatePicker
                    value={value ? moment(value, 'YYYY-MM-DD') : null}
                    sx={{ width: '100%' }}
                    onChange={handleDateChange}
                    maxDate={isDob && maxDateDob}
                    inputFormat="YYYY-MM-DD"
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            placeholder={placeholder}
                            sx={[{
                                width: "100%", borderRadius: '6px', maxHeight: '48px', borderWidth: 1, borderColor: '#F3F4F6',
                                '& .MuiInputBase-input': {
                                    color: '#4B5563', // Changes the text color
                                },
                                '& .MuiInputBase-input::placeholder': {
                                    color: '#D1D5DB', // Changes the placeholder color
                                }
                            }]}
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {params.InputProps.endAdornment}
                                        <EventNoteIcon color="#6B7280" style={{ marginRight: 8 }} />
                                    </>
                                ),
                            }}
                            variant="outlined"
                            fullWidth
                        />
                    )}
                />
            </Box>
        </LocalizationProvider>
    );
}

CustomDatePicker.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    isDob: PropTypes.bool
};

export default CustomDatePicker;
