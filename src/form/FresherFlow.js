import React from "react";
import RegistrationForm from "./RegistrationForm";
import EducationForm from "./EducationForm";
import MultiStepForm from "./StepFormContainer";
import PreferenceForm from "./PreferenceForm";
import { preferenceValidationSchema } from "./validationSchemas";
import PropTypes from "prop-types";
import {
  registrationValidationSchema,
  educationValidationSchema,
  ThemeSelectionVaidationSchema,
} from "./validationSchemas";
import VisitingCardComponent from "./CarouselScreen";

// Initial values for Formik
const FresherForm = ({ onSubmit, prefillData, user }) => {
  // Define form configurations with specific props
  const formConfigs = [
    {
      Component: (props) => <VisitingCardComponent {...props} type={"jobSeeker"} />,
      initialValues: {
        profile: {
          data: {
            vc_theme: "",
            type: "jobSeeker",
            sub_type: "fresher",
          },
        },
        type: 'jobSeeker'
      },
      validationSchema: ThemeSelectionVaidationSchema,
      key: "choose theme",
      type: "fresher",
    },
    {
      Component: RegistrationForm,

      initialValues: {
        profile: {
          data: {
            image_url: "",
            first_name: "",
            last_name: "",
            gender: "",
            dob: "",
            type: "jobSeeker",
            sub_type: "fresher",
            current_city: "",
          },
        },
        email: "",
      },
      validationSchema: registrationValidationSchema,
      key: "registration",
      type: "fresher",
    },
    {
      Component: EducationForm,
      initialValues: {
        profile: {
          data: {
            type: "jobSeeker",
            sub_type: "fresher",
            education: {
              data: {
                level: "",
                institution_name: "",
                institution_city: "",
                study_field: "",
                passout_year: "",
              },
            },
          },
        },
      },
      validationSchema: educationValidationSchema,
      key: "education",
    },
    {
      Component: PreferenceForm,
      initialValues: {
        profile: {
          data: {
            type: "jobSeeker",
            sub_type: "fresher",
            preference: {
              data: {
                aadhar: "",
                internship: "",
                one_day_job: "",
                partime_job: "",
                passport: "",
                working_city: "",
              },
            },
          },
        },
        idType: "",
      },
      validationSchema: preferenceValidationSchema,
      key: "preference",
    },
  ];

  const handleSubmitFinal = (values) => {
    try {
      delete values.idType;
      delete values.profile.email;

      delete values.__typename;
      // values.profile.data.education.data.cgpa = '6';
      // values.profile.data.education.data.from_date = "2023/05/01";
      // values.profile.data.education.data.to_date = '2024/03/01'
      if (values.profile.data.type == "jobSeeker") {
        delete values.organization_auth_map;
      }
    } catch (e) {
      console.log(e);
    }
    console.log("🚀 ~ handleSubmitFinal  FresherFlow~ values:", values, user);
    onSubmit({ id: user.id, phone_number: user.phone_number, ...values });
  };

  return (
    <MultiStepForm
      formConfigs={formConfigs}
      prefillData={prefillData}
      onSubmitFinal={(values) => handleSubmitFinal(values)}
    />
  );
};

FresherForm.propTypes = {
  onSubmit: PropTypes.func,
  prefillData: PropTypes.object,
  user: PropTypes.object,
};

export default FresherForm;
