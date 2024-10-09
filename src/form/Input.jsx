import * as React from 'react';
import  Input  from '@mui/material/Input';


const InputComponent = ({ label, ...props }) => {
    return (
        <Input placeholder="Type in here…" variant="solid" />

    );
}

export default InputComponent;