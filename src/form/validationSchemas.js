import * as Yup from 'yup';
import eighteenYearsAgo,{validateFile, phoneRegExp} from './utilities';

export const ThemeSelectionVaidationSchema = Yup.object().shape({
    profile: Yup.object().shape({
        data: Yup.object().shape({
            vc_theme: Yup.string()
                .required('Theme is required'),
        }),
    }),
});

export const SupplierThemeSelectionVaidationSchema = Yup.object().shape({
    organization_auth_map: Yup.object().shape({
        data: Yup.object().shape({
            organization: Yup.object().shape({
                data: Yup.object().shape({
                    vc_theme: Yup.string()
                        .required('Theme is required'),
                })
            })
        }),
    }),
});

export const registrationValidationSchema = Yup.object().shape({
    profile: Yup.object().shape({
        data: Yup.object().shape({
            image_url: Yup.string().required(),
            first_name: Yup.string()
                .required('First Name is required')
                .min(2, 'First Name must be at least 2 characters long'),
            last_name: Yup.string()
                .required('Last Name is required')
                .min(2, 'Last Name must be at least 2 characters long'),
            gender: Yup.string()
                .oneOf(['male', 'female', 'others'], 'Invalid gender')
                .required('Gender is required'),
            dob: Yup.date()
                .required('Date of birth is required')
                .max(eighteenYearsAgo, 'You must be at least 18 years old'),
            sub_type: Yup.string(),
            // current_city: Yup.string().when('sub_type', {
            //     is: () => 'fresher',
            //     then: () => Yup.string().required('Current city is required'),
            //     otherwise: () => Yup.string().notRequired(),
            // })
        }),
    }),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
});

export const educationValidationSchema = Yup.object().shape({
    profile: Yup.object().shape({
        data: Yup.object().shape({
            education: Yup.object().shape({
                data: Yup.object().shape({
                    institution_name: Yup.string().required('Institution Name is required'),
                    institution_city: Yup.string().required('City of Institution is required'),
                    level: Yup.string().required('Level of education is required'),
                    study_field: Yup.string().required('Field of study is required'),
                    passout_year: Yup.date()
                        .required('Passout year is required')
                        .typeError('Invalid date format'),
                })
            })
        }),
    }),
})

export const statusValidationSchema = Yup.object().shape({
    profile: Yup.object().shape({
        data: Yup.object().shape({
            experience: Yup.object().shape({
                data: Yup.object().shape({
                    brand_name: Yup.string()
                        .required('Brand Name is required')
                        .min(2, 'Brand Name must be at least 2 characters long')
                        .max(50, 'Brand Name cannot be longer than 50 characters'),
                    monthly_salary_text: Yup.string()
                        .required('Monthly Salary is required')
                }),
            }),
            currentCity: Yup.string()
        }),
    }),
});

export const workExperienceValidationSchema = Yup.object().shape({
    profile: Yup.object().shape({
        data: Yup.object().shape({
            experience: Yup.object().shape({
                data: Yup.object().shape({
                    work_experience: Yup.string().required('Work experience is required'),
                    department: Yup.string().required('Department is required'),
                    position: Yup.string().required('Position is required'),
                }),
            }),
        }),
    }),
});

export const businessValidationSchema = Yup.object({
    organization_auth_map: Yup.object({
        data: Yup.object({
            organization: Yup.object({
                data: Yup.object({
                    image_url: Yup.mixed()
                        .nullable()
                        .notRequired(), // Assuming this is a file upload field, and files are handled differently

                    brand_name: Yup.string()
                        .required('Brand Name is required')
                        .min(2, 'Brand Name must be at least 2 characters')
                        .max(100, 'Brand Name must not exceed 100 characters'),

                    company_name: Yup.string()
                        .required('Company Name is required')
                        .min(2, 'Company Name must be at least 2 characters')
                        .max(100, 'Company Name must not exceed 100 characters'),

                    nature_of_business: Yup.array()
                        .of(Yup.string())
                        .required('This field is required'),

                    no_of_employee: Yup.string()
                        .required('Please select the number of employees')
                })
            })
        })
    })
});

export const addressValidationSchema = Yup.object({
    organization_auth_map: Yup.object({
        data: Yup.object({
            organization: Yup.object({
                data: Yup.object({
                    organization_location_map: Yup.object({
                        data: Yup.object({
                            location: Yup.object({
                                data: Yup.object({
                                    area: Yup.string()
                                        .max(100, 'Area description must not exceed 100 characters'),
                                    block_number: Yup.string()
                                        .required('Block number is required')
                                        .max(50, 'Block number must not exceed 50 characters'),
                                    city: Yup.string()
                                        .required('City is required'),
                                    geolocation: Yup.object({
                                        data: Yup.object({
                                            latitude: Yup.number()
                                                .typeError('Latitude must be a number'),
                                            longitude: Yup.number()
                                                .typeError('Longitude must be a number'),
                                            other: Yup.object()
                                                .nullable(),
                                            type: Yup.string()
                                        })
                                    }),
                                    pincode: Yup.string()
                                        .required('Pincode is required')
                                        .matches(/^\d{6}$/, 'Pincode must be exactly 6 digits'), // Adjust regex according to your country's postal code standards
                                    state: Yup.string()
                                        .required('State is required')
                                })
                            })
                        })
                    })
                })
            })
        })
    })
});

export const contactValidationSchema = Yup.object({
    organization_auth_map: Yup.object({
        data: Yup.object({
            organization: Yup.object({
                data: Yup.object({
                    contact: Yup.object({
                        data: Yup.object({
                            name: Yup.string()
                                .required('Contact Person Name is required')
                                .min(2, 'Name must be at least 2 characters long')
                                .max(50, 'Name can be no longer than 50 characters'),

                            phone_number: Yup.string()
                                .required('Contact Number is required')
                                .matches(phoneRegExp, 'Invalid phone number'),

                            email: Yup.string()
                                .required('Email is required')
                                .email('Invalid email address'),

                            website: Yup.string()
                                .nullable()
                                .notRequired()
                        })
                    })
                })
            })
        })
    })

});

export const supplierContactValidationSchema = Yup.object({
    organization_auth_map: Yup.object({
        data: Yup.object({
            organization: Yup.object({
                data: Yup.object({
                    contact: Yup.object({
                        data: Yup.object({
                            name: Yup.string()
                                .required('Contact Person Name is required')
                                .min(2, 'Name must be at least 2 characters long')
                                .max(50, 'Name can be no longer than 50 characters'),

                            phone_number: Yup.string()
                                .required('Contact Number is required')
                                .matches(phoneRegExp, 'Invalid phone number'),

                            email: Yup.string()
                                .email('Invalid email address')
                                .required('Email is required'),

                            website: Yup.string()
                                .url('Enter a valid URL')
                                .notRequired() // Makes it optional
                        })
                    }),
                    suppliers: Yup.object({
                        data: Yup.object({
                            area: Yup.string()
                                .required('Selecting an area of coverage is required'),
                            scale: Yup.string()
                                .required('Selecting a scale of supply is required')
                        })
                    })
                })
            })
        })
    })
});

export const preferenceValidationSchema = Yup.object({
    profile: Yup.object({
        data: Yup.object({
            preference: Yup.object({
                data: Yup.object({
                    working_city: Yup.string().required('City is required'),
                    one_day_job: Yup.boolean().required('Please specify if you want a one-day job'),
                    internship: Yup.boolean().required('Please specify if you want an internship'),
                    partime_job: Yup.boolean().required('Please specify if you want a part-time job'),
                    aadhar: Yup.string()
                        .when('idType', {
                            is: 'Aadhar',
                            then: sch => sch.string()
                                .matches(/^\d{12}$/, 'Aadhar serial number must be 12 digits')
                                .required('Aadhar serial number is required'),
                            otherwise: sch => sch.notRequired(),
                        }),
                    passport: Yup.string()
                        .when('idType', {
                            is: 'Passport',
                            then: sch => sch.string()
                                .matches(/^[A-Z0-9]{8,12}$/, 'Passport serial number must be between 8 and 12 characters')
                                .required('Passport serial number is required'),
                            otherwise: sch => sch.notRequired(),
                        }),
                }),
            }),
        }),
    }),
    idType: Yup.string().required('ID type is required'),
});

export const experiencedPreferenceValidationSchema = Yup.object({
    profile: Yup.object({
        data: Yup.object({
            preference: Yup.object({
                data: Yup.object({
                    working_city: Yup.string().required('City is required'),
                    one_day_job: Yup.boolean().required('Please specify if you want a one-day job'),
                    internship: Yup.boolean().notRequired(),
                    partime_job: Yup.boolean().required('Please specify if you want a part-time job'),
                    aadhar: Yup.string()
                        .when('idType', {
                            is: 'Aadhar',
                            then: sch => sch.string()
                                .matches(/^\d{12}$/, 'Aadhar serial number must be 12 digits')
                                .required('Aadhar serial number is required'),
                            otherwise: sch => sch.notRequired(),
                        }),
                    passport: Yup.string()
                        .when('idType', {
                            is: 'Passport',
                            then: sch => sch.string()
                                .matches(/^[A-Z0-9]{8,12}$/, 'Passport serial number must be between 8 and 12 characters')
                                .required('Passport serial number is required'),
                            otherwise: sch => sch.notRequired(),
                        }),
                }),
            }),
        }),
    }),
    idType: Yup.string().required('ID type is required'),
});

export const gstPanValidationSchema = Yup.object().shape({
    organization_auth_map: Yup.object({
        data: Yup.object({
            organization: Yup.object({
                data: Yup.object({
                    gst_pan: Yup.object({
                        data: Yup.object({
                            gst: Yup.mixed().test(
                                'gst-or-pan-required',
                                'Either GST or PAN file must be attached',
                                function (value) {
                                    const { pan } = this.parent;
                                    return value || pan; // GST file should be present if PAN file is not, or vice versa
                                }
                            ),
                            pan: Yup.mixed().test(
                                'gst-or-pan-required',
                                'Either GST or PAN file must be attached',
                                function (value) {
                                    const { gst } = this.parent;
                                    return value || gst; // PAN file should be present if GST file is not, or vice versa
                                }
                            ),
                            status: Yup.string().nullable().notRequired() // Assuming status is a string and is optional
                        })
                    })
                })
            })
        })
    })
});