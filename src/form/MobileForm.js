import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import MaterialUIFieldAdapter from "./MaterialUIFieldAdapter";
import PropTypes from "prop-types";
import Button from "@components/button";
import { addBanner } from "@public/assests";
import Image from "next/image";
import AdsSwiper from "@components/ads-swiper";
import Toast from "@components/toast";

// Validation schema
const validationSchema = Yup.object({
  mobileNumber: Yup.string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits"),
});

//header style
const resFontStyle = {
  fontSize: "24px",
  fontWeight: 600,
  "@media (min-width:600px)": {
    fontSize: "32px",
  },
};

const MobileNumberForm = ({
  header,
  subHeader,
  btnText,
  footerText,
  callback,
  handleClose,
  handleClick,
  open,
}) => (
  <Formik
    initialValues={{
      mobileNumber: "",
    }}
    validationSchema={validationSchema}
    onSubmit={(values, { setSubmitting, resetForm }) => {
      setSubmitting(true);
      const status = callback(values.mobileNumber);

      if (!status) resetForm();
      setSubmitting(false);
    }}
  >
    {() => (
      <Form style={{}}>
        <Box
          sx={{
            maxWidth: 400,
            m: "auto",
            px: "16px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: "27.65px",
                sm: "33.18px",
              },
              mt: {
                xs: "48px",
                sm: "16px",
              },
              fontWeight: "bold",
            }}
          >
            {header || "Enter Mobile Number"}
          </Typography>
          <Typography className="text-center font-[400] text-[13.33px] mb-20">
            {subHeader || "We will send you a Confirmation Code"}
          </Typography>
          <Box sx={{ marginY: "20px" }}>
            <MaterialUIFieldAdapter
              name="mobileNumber"
              type="text"
              label="Mobile Number"
              placeholder="+9876543210"
              // style={{ backgroundColor: "white" }}
            />
          </Box>
          <Box
            className="mb-4"
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
            }}
          >
            <AdsSwiper width={328} />
          </Box>
          <Button
            color="white"
            backgroundColor="#113B73"
            text="Get OTP"
            sx={{
              ":hover": {
                background: "#0A2C5A",
              },
            }}
          />
          <Typography
            variant="caption"
            display="block"
            align="center"
            fontSize={10}
            fontWeight={400}
            sx={{ marginTop: "30px" }}
            color={"#8899A8"}
          >
            {footerText || "By continuing agree to Horecah"} <br></br>
            <Typography fontWeight={600} fontSize={10} color={"#8899A8"}>
              <Link href="#" underline="always">
                Terms of Use & Privacy Policy
              </Link>
            </Typography>
          </Typography>
        </Box>
      </Form>
    )}
  </Formik>
);

MobileNumberForm.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
  footerText: PropTypes.string,
  btnText: PropTypes.string,
  callback: PropTypes.func,
};

export default MobileNumberForm;
