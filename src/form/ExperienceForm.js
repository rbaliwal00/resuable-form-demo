import React from 'react';
import { Form, Field } from 'formik';
import { Box, Button } from '@mui/material';
import MaterialUIFieldAdapter from './MaterialUIFieldAdapter';
import PropTypes from 'prop-types';
import { nextBtn, renderBackButton } from './utilities';

const experienceOptions = [
    { value: '1-3', label: '1-3 years' },
    { value: '4-6', label: '4-6 years' },
    { value: '7-9', label: '7-9 years' },
    { value: '10-12', label: '10-12 years' },
    { value: '13-15', label: '13-15 years' },
    { value: '16-18', label: '16-18 years' },
    { value: '19-21', label: '19-21 years' },
    { value: '22-24', label: '22-24 years' },
    { value: '25+', label: '25+ years' }
];


const WorkExperienceForm = ({ onBack, isLastStep, type, step, ...formikProps }) => {

    console.log("formikProps5555", formikProps)

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
                        <Box>
                            <MaterialUIFieldAdapter
                                formik={formikProps}
                                type="select"
                                name="profile.data.experience.data.work_experience"
                                label="Work Experience"
                                options={experienceOptions}
                            />
                        </Box>
                        <MaterialUIFieldAdapter
                            type="categoryAutocomplete"
                            name="profile.data.experience.data.department"
                            subCategoryName="profile.data.experience.data.sub_category"
                            positionName="profile.data.experience.data.position"
                            customValue={
                                {
                                  department: formikProps.values.profile.data.experience.data.department,
                                  subCategory: formikProps.values.profile.data.experience.data.sub_category,
                                  position: formikProps.values.profile.data.experience.data.position
                                }
                              }

                        />
                        <Box display="flex" justifyContent="space-between" width="100%" fullWidth>
                            {nextBtn(isLastStep)}
                            {renderBackButton(onBack, step)}
                        </Box>
                    </Box>
                </Form>
    );
};

WorkExperienceForm.propTypes = {
    onBack: PropTypes.func,
    step: PropTypes.number,
    isLastStep: PropTypes.bool,
    formikProps: PropTypes.object
}

export default WorkExperienceForm;
