import React, { useEffect, useState } from "react";
import { Box, Button, Container, IconButton } from "@mui/material";
import PropTypes from "prop-types";
import { nextBtn, renderBackButton, jobThemeColors, formDetails, orgThemeColors } from "./utilities";
import { Carousel } from "@components/look";
import { Form, Field } from "formik";
import ThemeCard from "./Themecard";

const CarouselProps = {
  // data: [{
  //         image: 'https://picsum.photos/id/237/200/300',
  //         title: 'theme1'
  //     },
  //     {
  //         image: 'https://picsum.photos/id/237/200/300',
  //         title: 'theme2'
  //     },
  //     {
  //         image: 'https://picsum.photos/id/237/200/300',
  //         title: 'theme3'
  //     },
  // ],
  label: "check carousel",
  heading: "Theme Selection",
  subheading: "select a card",
  // slideNum: 3,
  autoplay: false,
  autoplaySpeed: 3,
  // centerMode: true
};

const CarouselComponent = ({ field, setFieldValue, name, type, handleColor, color }) => {

  const handleFieldValue = (item) => {
    const themeType = type + '_' + item;
    setFieldValue(name, themeType);
    handleColor(item)
  };

  const colorBtns = (color) => {
    return (
      <Box sx={{ height: '24px', width: '24px', borderRadius: '12px', background: color, cursor: 'pointer'}}/>
    )
  }

  const colors = type == 'jobSeeker' ? jobThemeColors : orgThemeColors;

  return (
    
    <Box {...field}>
      <ThemeCard
        type={type}
        bgColor={color || '#fff'}
        formDetails={formDetails.data.user_auth[1]}
      />
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', maxWidth: '328px', m: 'auto', mt: '24px'}}>
        {colors.map((cl, index) => {
        return (
          <Box key={'color_' + index} onClick={() => handleFieldValue(index)}>
            {colorBtns(cl.background)}
          </Box>
        )})}
      </Box>
    </Box>
  );
};

const VisitingCardComponent = ({
  type,
  isLastStep,
  onBack,
  step,
  ...formikProps
}) => {
  const fieldName =
    type === "jobSeeker"
      ? "profile.data.vc_theme"
      : "organization_auth_map.data.organization.data.vc_theme";

      const themeColors = type == 'jobSeeker' ? jobThemeColors : orgThemeColors;

      const [color, setColor] = useState('');
      const handleColorChange = (ind) => {
        setColor(themeColors[ind].background)
      }

  return (
    <Form {...formikProps}>
      <Box>
        <Field
          name={fieldName}
          component={(fieldProps) => (
            <CarouselComponent
              {...fieldProps}
              setFieldValue={formikProps.setFieldValue}
              name={fieldName}
              handleColor={handleColorChange}
              color={color}
              type={type}
            />
          )}
        />
        <Box
          display="flex"
          justifyContent="center"
          width="100%"
          fullWidth
          sx={{
            m: "auto",
            mt: "32px",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: { xs: "328px", sm: "608px" },
          }}
        >
          {nextBtn(isLastStep)}
          {renderBackButton(onBack, step)}
        </Box>
      </Box>
    </Form>
  );
};

VisitingCardComponent.propTypes = {
  formikProps: PropTypes.object,
  isLastStep: PropTypes.bool,
  step: PropTypes.number,
  type: PropTypes.string.isRequired,
  onBack: PropTypes.func,
};

export default VisitingCardComponent;
