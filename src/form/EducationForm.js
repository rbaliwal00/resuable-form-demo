import React from 'react';
import { Form } from 'formik';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import { levelOfEducation, nextBtn, renderBackButton } from './utilities';

const EducationForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {

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
                    type="select"
                    name="profile.data.education.data.level"
                    label="Level of Education"
                    options={levelOfEducation.map((item) => { return { value: item, label: item } })}
                    formik={formikProps}
                />
                <MaterialUIFieldAdapter
                    type="text"
                    name="profile.data.education.data.institution_name"
                    label="Name of Institution"
                    placeholder="Type"
                    formik={formikProps}
                />
                <MaterialUIFieldAdapter
                    formik={formikProps}
                    type="autocomplete"
                    name="profile.data.education.data.institution_city"
                    label="City of Institution"
                    placeholder="Current City"
                />
                <MaterialUIFieldAdapter
                    type="text"
                    name="profile.data.education.data.study_field"
                    label="Field of Study"
                    placeholder="Type"
                    fromik={formikProps}
                />
                <MaterialUIFieldAdapter
                    type="date"
                    name="profile.data.education.data.passout_year"
                    label="Passout Year"
                    formik={formikProps}
                />
                <Box display="flex" justifyContent="space-between" width="100%">
                    {nextBtn(isLastStep)}
                    {renderBackButton(onBack, step)}
                </Box>
            </Box>
        </Form>
    );
};

EducationForm.propTypes = {
    formikProps: PropTypes.object,
    onBack: PropTypes.func.isRequired,
    type: PropTypes.string,
    isLastStep: PropTypes.bool.isRequired,
    step: PropTypes.number
}

export default EducationForm;
