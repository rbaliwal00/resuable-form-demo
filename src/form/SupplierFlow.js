import React from 'react';
import BusinessForm from './BusinessForm'
import AddressForm from './AddressForm';
import ContactForm from './SupplierContactForm';
import GstPanCardForm from './GstPanCardForm'
import VisitingCardComponent from './CarouselScreen';
import { businessValidationSchema, addressValidationSchema, supplierContactValidationSchema, gstPanValidationSchema, SupplierThemeSelectionVaidationSchema } from './validationSchemas';
import MultiStepForm from './StepFormContainer';
import PropTypes from 'prop-types';

// Initial values for Formik
const formConfigs = [
  {
    Component: (props) => (
      <VisitingCardComponent {...props} type={"supplier"} />
    ),
    initialValues: {
      organization_auth_map: {
        data: {
          organization: {
            data: {
              vc_theme: "",
            },
          },
        },
      },
      profile: {
        data: {
          type: "supplier",
          sub_type: "supplier",
          website: "",
          image_url: "",
        },
      },
      type: 'supplier'
    },
    validationSchema: SupplierThemeSelectionVaidationSchema,
    key: "choose theme",
    type: "supplier",
  },
  {
    Component: BusinessForm,
    initialValues: {
      organization_auth_map: {
        data: {
          organization: {
            data: {
              brand_name: "",
              company_name: "",
              image_url: "",
              business_nature: "",
              no_of_employee: "",
            },
          },
        },
      },
    },
    validationSchema: businessValidationSchema,
    key: "business",
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
                  status: "",
                },
              },
            },
          },
        },
      },
    },
    validationSchema: gstPanValidationSchema,
    key: "Gst/Pan",
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
                          latitude: "",
                          longitude: "",
                          other: {},
                          type: "",
                        },
                      },
                      pincode: "",
                      state: "",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    validationSchema: addressValidationSchema,
    key: "address",
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
                  phone_number: "",
                },
              },
              suppliers: {
                data: {
                  area: "",
                  scale: "",
                },
              },
            },
          },
        },
      },
    },
    validationSchema: supplierContactValidationSchema,
    key: "supplierContact",
  },
];

const SupplierForm = ({ onSubmit, prefillData, user }) => {
  
  const handleSubmitFinal = (values) => {
    const areaList = values.organization_auth_map.data.organization.data.suppliers.data.coverage_area_list
    if(!Array.isArray(areaList)){
      values.organization_auth_map.data.organization.data.suppliers.data.coverage_area_list = [areaList]
    }
    console.log("check user here", user, values);
    onSubmit({ id: user.id, phone_number: user.phone_number, ...values })
  };

  return (
    <MultiStepForm
      formConfigs={formConfigs}
      prefillData={prefillData}
      onSubmitFinal={(values) => handleSubmitFinal(values)}
    />
  );
};

SupplierForm.propTypes = {
  onSubmit: PropTypes.func,
  prefillData: PropTypes.object,
  user: PropTypes.object
};

export default SupplierForm;
