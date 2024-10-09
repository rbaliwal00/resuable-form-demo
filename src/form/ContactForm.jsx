import React from 'react';
import { Formik, Form } from 'formik';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { nextBtn, renderBackButton } from './utilities';

const ContactForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {


    return (
                <Form {...formikProps}>
                    <Box sx={{
                        maxWidth: {
                            xs: '100%',  // If viewport width is below 600px, maxWidth is 100%
                            sm: '608px'  // If viewport width is above 600px, maxWidth is 608px
                        },
                        m: 'auto',
                        mt: {
                            xs: '8px',
                            sm: '32px',
                        },
                        px: {
                            xs: '16px',
                            sm: '35px'
                        },
                        py: {
                            xs: '16px',
                            sm: '30px'
                        },
                        boxShadow: {
                            xs: 'none',
                            sm: '0px 4px 25px 0px rgba(0, 0, 0, 0.05)'
                        },
                        borderRadius: {
                            xs: '0px',
                            sm: '12px'
                        },
                        bgcolor: 'background.paper',
                    }}>
                        <MaterialUIFieldAdapter 
                            formik={formikProps}
                            name="organization_auth_map.data.organization.data.contact.data.name"
                            type="text"
                            label="Contact Person Name"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            name="organization_auth_map.data.organization.data.contact.data.phone_number"
                            type="text"
                            label="Contact Number"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            name="organization_auth_map.data.organization.data.contact.data.email"
                            type="email"
                            label="Email"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            name="organization_auth_map.data.organization.data.contact.data.website"
                            type="text"
                            label="Website(Optional)"
                            placeholder="Type"
                        />
                        <Box display="flex" justifyContent="space-between" width="100%" fullWidth>
                            {nextBtn(isLastStep)}
                            {renderBackButton(onBack, step)}
                        </Box>
                    </Box>
                </Form>
            )
};

ContactForm.propTypes = {
    formikProps: PropTypes.object,
    onBack: PropTypes.func.isRequired,
    type: PropTypes.string,
    isLastStep: PropTypes.bool.isRequired,
    step: PropTypes.number
}

export default ContactForm;
