import React, { useState } from 'react';
import MultiStepForm from './StepFormContainer';
import RegistrationForm from './RegistrationForm';
import StatusForm from './StatusForm';
import WorkExperienceForm from './ExperienceForm';
import PreferenceForm from './PreferenceForm';
import VisitingCardComponent from './CarouselScreen'
import PropTypes from 'prop-types';

import { statusValidationSchema, workExperienceValidationSchema, registrationValidationSchema, experiencedPreferenceValidationSchema, ThemeSelectionVaidationSchema } from './validationSchemas';

const formConfigs = [
    {
        Component: (props) => (
            <VisitingCardComponent {...props} type={'jobSeeker'}/>),
            initialValues: {
                profile: {
                    data: {
                        vc_theme: '',
                        type: "jobSeeker",
                        sub_type: 'experienced'
                    },
                },
                type: 'jobSeeker'
            },
        validationSchema: ThemeSelectionVaidationSchema,
        key: 'choose theme',
        type: 'experienced'
    },
    {
        Component: RegistrationForm,
        initialValues: {
            profile: {
                data: {
                    image_url: '', // Changed from `image` to `imageUrl`
                    first_name: '',
                    last_name: '',
                    gender: '',
                    dob: '',
                    type: "jobSeeker",
                    sub_type: 'experienced'
                },
            },
            email: '', // Moved `email` under `profile`
        },
        validationSchema: registrationValidationSchema,
        key: 'registration', 
        type: 'experienced'   
    },
    {
        Component: StatusForm,
        initialValues: {
            profile: {
                data: {
                    type: "jobSeeker",
                    sub_type: 'experienced',
                    current_city: '',
                    experience: {
                        data: {
                            brand_name: '',
                            monthly_salary_text: '',
                        }
                    }
                }
            },
        },
        validationSchema: statusValidationSchema,
        key: 'status'
    },
    {
        Component: WorkExperienceForm,
        initialValues: {
            profile: {
                data: {
                    type: "jobSeeker",
                    sub_type: 'experienced',
                    experience: {
                        data: {
                            work_experience: '',
                            department: '',
                            position: '',
                            type: ''
                        }
                    }
                }
            }
        },
        validationSchema: workExperienceValidationSchema,
        key: 'workExperience' 
    },
    {
        Component: PreferenceForm,
        initialValues: {
            profile: {
                data: {
                    type: "jobSeeker",
                    sub_type: 'experienced',
                    preference: {
                        data: {
                            aadhar: '',
                            internship: false,
                            one_day_job: false,
                            partime_job: false,
                            passport: '',
                            working_city: ''
                        }
                    }
                }
            }
        },
        validationSchema: experiencedPreferenceValidationSchema,
        key: 'preference',
        type: 'experienced'
    }
];

// Initial values for Formik
const ExperiencedForm = ({onSubmit, prefillData, user}) => {
    
    const handleSubmitFinal = (values) => {
        delete values.idType;
        delete values.profile.email;
        delete values.currentCity;
        //values['phone_number'] = '8919729964';
        //values.profile.data.experience.data.from_date = "02/03/2012"
        // values.profile.data.education.data.cgpa = '6';
        if (values.profile.data.type != 'jobSeeker') {
            delete values.organization_auth_map
        }
        console.log("check entered onSubmit expereienced---")
        onSubmit({ id: user.id ,phone_number: user.phone_number, ...values })
    }

    return (
        <MultiStepForm formConfigs={formConfigs} prefillData={prefillData} onSubmitFinal={(values) => handleSubmitFinal(values)} />
    );
};

ExperiencedForm.propTypes = {
    onSubmit: PropTypes.func,
    prefillData: PropTypes.object,
    user: PropTypes.object
}

export default ExperiencedForm;
