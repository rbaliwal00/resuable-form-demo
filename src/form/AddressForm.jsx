import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import PropTypes from 'prop-types';
import { nextBtn, renderBackButton, states } from './utilities';


const AddressForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {
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
                            type="checkbox"
                            name="useMap"
                            label="Use Map"
                        />

                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            type="text"
                            name="organization_auth_map.data.organization.data.organization_location_map.data.location.data.pincode"
                            label="Pincode"
                        />

                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            type="autocomplete"
                            name="organization_auth_map.data.organization.data.organization_location_map.data.location.data.city"
                            label="City"
                        />

                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            type="select"
                            name="organization_auth_map.data.organization.data.organization_location_map.data.location.data.state"
                            label="State"
                            options={states.map((item) => {return { value: item, label: item}})} // Populate according to your data
                        />

                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            type="textarea"
                            name="organization_auth_map.data.organization.data.organization_location_map.data.location.data.block_number"
                            label="House / Flat / Block No."
                        />

                        <MaterialUIFieldAdapter
                            formik={formikProps}
                            type="textarea"
                            name="organization_auth_map.data.organization.data.organization_location_map.data.location.data.area"
                            label="Road / Area (Optional)"
                        />

                        <Box display="flex" justifyContent="space-between" width="100%" fullWidth>
                            {nextBtn(isLastStep)}
                            {renderBackButton(onBack, step)}
                        </Box>
                    </Box>
                </Form>
            )
}

AddressForm.propTypes = {
    formikProps: PropTypes.object,
    onBack: PropTypes.func.isRequired,
    type: PropTypes.string,
    isLastStep: PropTypes.bool.isRequired,
    step: PropTypes.number
}

export default AddressForm;
