import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Box,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import { connect, getIn } from "formik";
import { responsiveFontSize } from "./utilities";

const MaterialUIFieldAdapter = ({
  formik,
  type,
  name,
  label,
  placeholder,
   options, 
  style,
}) => {
  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox" ? event.target.checked : event.target.value;
    formik.setFieldValue(name, value);
  };

  const handleBlur = () => {
    formik.setFieldTouched(name, true);
  };

  const renderComponent = () => {
  
    const { values, errors, touched } = formik;
    const value = getIn(values, name);
    const error = getIn(errors, name);
    const touch = getIn(touched, name);

    switch (type) {
      case "text":
      case "number":
      case "email":
        return (
          <Box alignSelf={"center"} sx={{ mb: "24px" }} fontFamily={''}>
            {label && (
              <Typography
                textAlign={"left"}
                color={"#9CA3AF"}
                sx={[{ responsiveFontSize }, { mb: '8px' }]}
              >
                {label}
              </Typography>
            )}
            <TextField
              type={type}
              fullWidth
              sx={[
                {
                  background: "white",
                  width: "100%",
                  borderRadius: "6px",
                  maxHeight: "48px",
                  borderWidth: 1,
                  borderColor: "#F3F4F6",
                  "& .MuiInputBase-root": {
                    borderColor: "#F3F4F6", // Default border color
                    "&.Mui-focused": {
                      borderColor: "#113B73", // Border color when focused
                    },
                    "&.Mui-error": {
                      borderColor: "#f44336", // Border color when error
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#4B5563", // Changes the text color
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#D1D5DB", // Changes the placeholder color
                  },
                  background: '#fff'
                },
                { ...style },
              ]}
              name={name}
              value={value || ""}
              InputLabelProps={{ shrink: false }}
              placeholder={placeholder}
              inputProps={{ maxlength: type === 'number' ? 10 : 100 }}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touch && Boolean(error)}
              helperText={touch && error}
              FormHelperTextProps={{
                textAlign: "left", // This style will align the helper text to the right
              }}
            />
          </Box>
        );
      case "textarea":
        return (
          <Box alignSelf={"center"} fullWidth sx={{ mb: "24px" }}>
            {label && (
              <Typography sx={responsiveFontSize} textAlign={"left"}>
                {label}
              </Typography>
            )}
            <TextField
              multiline
              maxRows={5}
              fullWidth
              sx={{
                minWidth: "328px",
                borderRadius: "6px",
                maxHeight: "120px",
                "& .MuiInputBase-input": {
                  color: "#4B5563", // Changes the text color
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "#D1D5DB", // Changes the placeholder color
                },
                background: '#fff'
              }}
              name={name}
              value={value || ""}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={handleBlur}
              inputProps={{
                maxLength: 50,
              }}
              helperText={`${(value || '').length}/50`}
              FormHelperTextProps={{
                xs: { textAlign: "right" }, // This style will align the helper text to the right
              }}
              error={touch && Boolean(error)}
            />
          </Box>
        );

      case "checkbox":
        return (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={value || false}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name={name}
                />
              }
              label={label}
            />
          </FormGroup>
        );

      case "select":
        return (
          <Box alignSelf={"center"} sx={{ mb: "24px" }}>
            {label && (
              <Typography
                sx={[responsiveFontSize, { mb: '8px' }]}
                textAlign={"left"}
                color={"#9CA3AF"}
              >
                {label}
              </Typography>
            )}
            <Select
              fullWidth
              sx={{
                borderRadius: "6px",
                maxHeight: "48px",
                border: "1px solid #D1D5DB", // Adding border to match screenshot
                "& .MuiSelect-select": {
                  color: "#4B5563", // Changes color based on if value is selected
                },
                "& .MuiInputBase-root": {
                  color: "#D1D5DB", // Placeholder and input text color
                  "&.Mui-focused": {
                    color: "#113B73", // Color when the select is focused
                    borderColor: "#113B73", // Border color when focused
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#9CA3AF", // Label color
                  "&.Mui-focused": {
                    color: "#113B73", // Color when the select is focused
                  },
                },
                "& .MuiMenuItem-root": {
                  "&.Mui-selected": {
                    backgroundColor: "#113B73", // Background color for selected item
                    color: "#fff", // Text color for selected item
                    "&:hover": {
                      backgroundColor: "#174291", // Darker on hover
                    },
                  },
                  "&:hover": {
                    backgroundColor: "#e0e0e0", // Background color on hover for items
                    color: "#113B73", // Text color change on hover
                  },
                },
              }}
              name={name}
              value={value || ""}
              onChange={handleChange}
              onBlur={handleBlur}
              displayEmpty
              error={touch && Boolean(error)}
              placeholder="Select"
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Typography>{option.label}</Typography>
                </MenuItem>
              ))}
            </Select>
            {touch && error && <Typography color="error">{error}</Typography>}
          </Box>
        );

      // case "multiselect":
        return (
          <Box alignSelf={"center"} fullWidth sx={{ mb: "24px" }}>
            {label && (
              <Typography
                sx={responsiveFontSize}
                textAlign={"left"}
                color={"#9CA3AF"}
              >
                {label}
              </Typography>
            )}
            <Select
              multiple
              fullWidth
              sx={{ borderRadius: "6px", maxHeight: "48px", overflow: "auto" }}
              name={name}
              value={(name === 'organization_auth_map.data.organization.data.suppliers.data.coverage_area_list') ? areaList : selected} // Ensure the value is an array for multiple selections
              onChange={handleMultipleSelect}
              onBlur={handleBlur}
              renderValue={(selected) =>
                Array.isArray(selected)
                  ? selected
                    .map(
                      (item) =>
                        (
                          options.find((option) => option.value === item) ||
                          {}
                        ).label,
                    )
                    .join(", ")
                  : selected
              }
              error={touch && Boolean(error)}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Typography>{option.label}</Typography>
                </MenuItem>
              ))}
            </Select>
            {touch && error && <Typography color="error">{error}</Typography>}
          </Box>
        );
  };
}
return renderComponent();
};

MaterialUIFieldAdapter.propTypes = {
  formik: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  style: PropTypes.object,
};

const ConnectedMaterialUIFieldAdapter = connect(MaterialUIFieldAdapter);

export default ConnectedMaterialUIFieldAdapter;
