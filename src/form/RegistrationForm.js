import React from "react";
import { Form } from "formik";
import MaterialUIFieldAdapter from "./MaterialUIFieldAdapter";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { nextBtn, renderBackButton } from "./utilities";

const RegistrationForm = ({
  onBack,
  isLastStep,
  type,
  step,
  ...formikProps
}) => {
  console.log("check all values here", formikProps.values);

  return (
    <Form {...formikProps}>
      <Box
        sx={{
          maxWidth: {
            xs: "100%", // If viewport width is below 600px, maxWidth is 100%
            sm: "608px", // If viewport width is above 600px, maxWidth is 608px
          },
          m: "auto",
          mt: {
            xs: "8px",
            sm: "32px",
          },
          px: {
            xs: "16px",
            sm: "35px",
          },
          py: {
            xs: "16px",
            sm: "30px",
          },
          boxShadow: {
            xs: "none",
            sm: "0px 4px 25px 0px rgba(0, 0, 0, 0.05)",
          },
          borderRadius: {
            xs: "0px",
            sm: "12px",
          },
          bgcolor: "background.paper",
        }}
      >
        <MaterialUIFieldAdapter
          formik={formikProps}
          type="file"
          name="profile.data.image_url"
          label="Upload Image"
        />
        <Box
          fullWidth
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ width: "48%" }}>
            <MaterialUIFieldAdapter
              formik={formikProps}
              type="text"
              name="profile.data.first_name"
              label="First Name"
              placeholder="Type"
            />
          </Box>
          <Box sx={{ width: "48%" }}>
            <MaterialUIFieldAdapter
              formik={formikProps}
              type="text"
              name="profile.data.last_name"
              label="Last Name"
              placeholder="Type"
              value={formikProps?.profile?.lastName || ""}
            />
          </Box>
        </Box>
        <Box>
          <MaterialUIFieldAdapter
            formik={formikProps}
            type="email"
            name="email"
            label="Email"
            placeholder="Type"
          />
        </Box>
        <Box>
          <MaterialUIFieldAdapter
            formik={formikProps}
            type="radio"
            name="profile.data.gender"
            label="Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "others", label: "Others" },
            ]}
          />
        </Box>
        <Box>
          <MaterialUIFieldAdapter
            formik={formikProps}
            type="date"
            name="profile.data.dob"
            label="Date of Birth"
            placeholder="DD/MM/YYYY"
            isDob
          />
        </Box>

        {type === "fresher" && (
          <Box>
            <MaterialUIFieldAdapter
              formik={formikProps}
              type="autocomplete"
              name="profile.data.current_city"
              label="Current City"
              placeholder="Current City"
            />
          </Box>
        )}

        <Box display="flex" justifyContent="space-between" width="100%">
          {nextBtn(isLastStep)}
          {renderBackButton(onBack, step)}
        </Box>
      </Box>
    </Form>
  );
};

RegistrationForm.propTypes = {
  type: PropTypes.string,
  onBack: PropTypes.func,
  isLastStep: PropTypes.bool,
  step: PropTypes.number.isRequired,
};

export default RegistrationForm;
