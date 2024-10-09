import React, { useState } from "react";
import { Formik } from "formik";
import { Box } from "@mui/material";
import CustomProgressBar from "./CustomProgressBar";
import { deepMerge } from "./utilities";
import PropTypes from "prop-types";

const MultiStepForm = ({ formConfigs, onSubmitFinal, prefillData }) => {
  const [step, setStep] = useState(0); // Current form step
  const [formData, setFormData] = useState(prefillData || {});
  const isLastStep = step === formConfigs.length - 1;

  const currentConfig = formConfigs[step];
  const CurrentForm = currentConfig.Component;
  const deleteFunction = currentConfig.deleteFunction;

  const progress = Math.floor(((step + 1) / formConfigs.length) * 100);

  const handleNext = async (values, actions) => {
    const newFormData = deepMerge(formData, values);
    setFormData(newFormData);
    console.log("handleNext", newFormData, isLastStep, step);

    if (!isLastStep) {
      const errors = await actions.validateForm();
      if (Object.keys(errors).length === 0) {
        setStep((step) => step + 1);
      } else {
        actions.setTouched(errors);
      }
    } else {
      await onSubmitFinal(newFormData); // Final submission handler
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const getInitialValues = () => {
    return deepMerge(currentConfig.initialValues, formData);
  };

  return (
    <Box sx={{ background: "#fff", mb: { xs: '100px', sm: '24px'} }}>
      <CustomProgressBar
        progress={progress}
        label={currentConfig.key}
        onBack={handleBack}
        step={step}
      />
      <Formik
        key={step}
        initialValues={getInitialValues()}
        validationSchema={currentConfig.validationSchema}
        onSubmit={handleNext}
      >
        {(formikProps) => {
          return (
            <CurrentForm
              {...formikProps}
              deleteFunction={deleteFunction}
              name={currentConfig.name}
              type={currentConfig.type}
              onBack={handleBack}
              isLastStep={isLastStep}
              step={step}
            />
          );
        }}
      </Formik>
    </Box>
  );
};

MultiStepForm.propTypess = {
  prefillData: PropTypes.object,
  onSubmitFinal: PropTypes.func,
};

export default MultiStepForm;
