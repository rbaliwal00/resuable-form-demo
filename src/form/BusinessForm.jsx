import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';  // Adjust import path as needed
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { natureOfBusiness, nextBtn, supplierNatureOfBusiness, renderBackButton } from './utilities';


const BusinessForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {
    console.log("cehck all steps here", isLastStep, step);
    const orgBusinessNature = (formikProps.values.type == 'supplier') ? supplierNatureOfBusiness : natureOfBusiness
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
                        py:{
                            xs: '16px',
                            sm: '30px'},
                        boxShadow: {
                            xs: 'none',
                            sm:'0px 4px 25px 0px rgba(0, 0, 0, 0.05)'},
                        borderRadius: {
                            xs: '0px',
                            sm: '12px'
                        },
                        bgcolor: 'background.paper',
                    }}>
                        <MaterialUIFieldAdapter
                            type="file"
                            name="organization_auth_map.data.organization.data.image_url"
                            label="Upload Company Logo"
                            formik={formikProps}
                        />
                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            name="organization_auth_map.data.organization.data.brand_name"
                            type="text"
                            label="Brand Name"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            name="organization_auth_map.data.organization.data.company_name"
                            type="text"
                            label="Company Name"
                            placeholder="Type"
                        />
                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            name="organization_auth_map.data.organization.data.nature_of_business"
                            type="multiselect"
                            maxMultipleLength={2}
                            label="Nature of Business"
                            options={orgBusinessNature.map((item) => { return { value: item, label: item } })}
                        />
                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            name="organization_auth_map.data.organization.data.no_of_employee"
                            type="select"
                            label="No. of Employees"
                            options={[{ value: '0-20', label: '0-20' },
                                    { value: '20-50', label: '20-50' },
                                    { value: '50-100', label: '50-100' },
                                    { value: '100-200', label: '100-200' },
                                    { value: '200-500', label: '200-500' },
                                    { value: '500+', label: '500+' }
                                    ]}
                        />
                        <Box display="flex" justifyContent="space-between" width="100%" fullWidth>
                            {nextBtn(isLastStep)}
                            {renderBackButton(onBack, step)}
                        </Box>
                        
                    </Box>
                    {/* <Persist name="business-form" /> */}
                </Form>
            )
};

BusinessForm.propTypes = {
    formikProps: PropTypes.object,
    onBack: PropTypes.func.isRequired,
    type: PropTypes.string,
    isLastStep: PropTypes.bool.isRequired,
    step: PropTypes.number
}

export default BusinessForm;
