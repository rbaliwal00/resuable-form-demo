import React from 'react';
import { Box } from '@mui/material';
import BusinessForm from './BusinessForm'
import AddressForm from './AddressForm';
import ContactForm from './ContactForm';
import MultiStepForm from './StepFormContainer';
import GstPanCardForm from './GstPanCardForm'
import VisitingCardComponent from './CarouselScreen';
import PropTypes from 'prop-types';
import { businessValidationSchema, addressValidationSchema, contactValidationSchema, gstPanValidationSchema, SupplierThemeSelectionVaidationSchema  } from './validationSchemas';

// Initial values for Formik
const formConfigs = [
    {
        Component: (props) => (
            <VisitingCardComponent {...props} type={'recruiter'}/>),
        initialValues: {
            organization_auth_map: {
                data: {
                    organization: {
                        data: {
                            vc_theme: ''
                        }
                    }
                }
            },
            profile: {
                data: {
                    type: "recruiter",
                    sub_type: 'recruiter',
                    // website: 'dummyData.com',
                    // image_url: 'jbjbjbjbj'
                },
            },
            type: 'recruiter'
        },
        validationSchema: SupplierThemeSelectionVaidationSchema,
        key: 'choose theme',
        type: 'recruiter'  
    },
    {
        Component: BusinessForm,
        initialValues: {
            organization_auth_map: {
                data: {
                    organization: {
                        data: {
                            brand_name: '',
                            company_name: '',
                            image_url: '',
                            nature_of_business: [],
                            no_of_employee: ''
                        }
                    }
                }
            }
        },
        validationSchema: businessValidationSchema,
        key: 'business',   
    },
    {
        Component: GstPanCardForm,
        initialValues: {
            organization_auth_map: {
                data: {
                    organization: {
                        data: {
                            gst_pan: {
                                data: {
                                    gst: "",
                                    pan: "",
                                    status: ""
                                }
                            }
                        }
                    }
                }
            }
        },
        validationSchema: gstPanValidationSchema,
        key: 'Gst/Pan'
    },
    {
        Component: AddressForm,
        initialValues: {
            organization_auth_map: {
                data: {
                    organization: {
                        data: {
                            organization_location_map: {
                                data: {
                                    location: {
                                        data: {
                                            area: "",
                                            block_number: "",
                                            city: "",
                                            geolocation: {
                                                data: {
                                                    "latitude": "",
                                                    "longitude": "",
                                                    "other": {},
                                                    "type": ""
                                                }
                                            },
                                            pincode: "",
                                            state: ""
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        validationSchema: addressValidationSchema,
        key: 'address'
    },
    {
        Component: ContactForm,
        initialValues: {
            organization_auth_map: {
                data: {
                    organization: {
                        data: {
                            contact: {
                                data: {
                                    name: "",
                                    email: "",
                                    website: "",
                                    phone_number: ""
                                }
                            }
                        }
                    }
                }
            }
        },
        validationSchema: contactValidationSchema,
        key: 'contact'
    }
];

const RecruiterForm = ({prefillData, onSubmit, user}) => {
   
    const handleSubmitFinal = (values) => {
        // values.profile.data.first_name = 'saksham';
        // values.profile.data.last_name = 'meher';
        // values.profile.data.gender = 'male';
        // values.profile.data.dob = '22/5/1999';
        // values.profile.data.cv_theme = 'theme 1'
        console.log("cehck user before creating a profile", user);
        onSubmit({ id: user.id, phone_number: user.phone_number, ...values})
    }

    return (
        <Box sx={{ flex: 1 }}>
            <MultiStepForm formConfigs={formConfigs} prefillData={prefillData} onSubmitFinal={(values) => handleSubmitFinal(values)} />
        </Box>
    );
};

RecruiterForm.propTypes = { 
    onSubmit: PropTypes.func,
    prefillData: PropTypes.object,
    user: PropTypes.object
}

export default RecruiterForm;
