import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import OtpInput from "react-otp-input";
import OtpTimer from "otp-timer";
import * as Yup from "yup";
import { Box, Typography, Button, FormHelperText } from "@mui/material";
import { createTimer } from "./utilities";
import { useRouter } from "next/router";
import Image from "next/image";
import { addBanner } from "@public/assests";
import AdsSwiper from "@components/ads-swiper";

const validationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(4, "OTP must be exactly 4 digits"),
});

const VerifyOTP = ({ subHeader, onBack, callBack, mobile, resend }) => {
  const [timeLeft, setTimeLeft] = useState(30 / 6);
  const [resendStatus, setResendStatus] = useState("");

  const [seconds, setSeconds] = useState(10);

  const router = useRouter();

  const btnText = timeLeft > 0 ? `Resend OTP in ${timeLeft} sec` : "Resend OTP";
  const btnTextColor = timeLeft > 0 ? "#8899A8" : "#113B73";

  useEffect(() => {
    const timer = createTimer(30, (val) => setTimeLeft(val));

    return () => timer.stop(); // Cleanup function to stop the timer on unmount
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup function
  }, []);

  const resendOTP = () => {
    setSeconds(10);
  };

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 2,
        textAlign: "center",
        display: "flex", // Use Flexbox for alignment
        flexDirection: "column", // Stack children vertically
        alignItems: "center", // Center-align children horizontally
        justifyContent: "center",
        width: "100%",
      }}
    >
      <h4 className="text-center text-[33.18px] mt-10 font-semibold">
        Verify OTP
      </h4>
      <p className="text-[#C1C1C1] text-center mb-2 text-sm text-[16px] mb-4 font-normal">
        Enter the 4 digit code sent to {mobile}
      </p>
      {/* <Typography variant="body2" sx={{ mb: 2 }}>
        {subHeader || "We will send you a Confirmation Code"}
      </Typography> */}
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setResendStatus(false);
          setSubmitting(true);
          // if (values.otp >= 1000 && values.otp <= 9999) {
          callBack(values.otp).then((status) => {
            if (!status) setResendStatus(true);
          });
          // }
          setSubmitting(false);
        }}
      >
        {({ setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <Field name="otp">
              {({ field }) => (
                <Box>
                  <div className="grid justify-center gap-2 mt-12">
                    <OtpInput
                      {...field}
                      value={field.value}
                      onChange={(otp) => {
                        setFieldValue("otp", otp);
                        setResendStatus(false);
                      }}
                      inputType="number"
                      numInputs={4}
                      separator={<span>-</span>}
                      shouldAutoFocus
                      renderInput={(props) => <input {...props} />}
                      containerStyle={{ gap: "1rem" }}
                      inputStyle={{
                        width: "45px",
                        height: "45px",
                        margin: "0 5px",
                        fontSize: "20px",
                        borderRadius: "5px",
                        color: "black",
                        border: "1px solid rgba(0,0,0,0.3)",
                        border:
                          touched.otp && errors.otp
                            ? "1px solid red"
                            : "1px solid rgba(0,0,0,0.3)",
                      }}
                    />
                    <Box
                      sx={{
                        float: "right",
                        textAlign: "right",
                        marginBottom: "20px",
                      }}
                    >
                      <OtpTimer
                        // minutes={0}
                        textColor="#8899A8"
                        buttonColor="#8899A8"
                        background="white"
                        seconds={10}
                        text="Resend OTP in "
                        ButtonText="Resend"
                        resend={() => console.log("Resending OTP")}
                      />
                    </Box>
                  </div>
                  {touched.otp && errors.otp && (
                    <FormHelperText
                      sx={{ color: "error.main", textAlign: "right" }}
                    >
                      {errors.otp}
                    </FormHelperText>
                  )}
                  {resendStatus && (
                    <FormHelperText
                      sx={{ color: "error.main", textAlign: "right" }}
                    >
                      Invalid OTP
                    </FormHelperText>
                  )}
                  <Box
                    sx={{
                      display: {
                        xs: "block",
                        sm: "none",
                      },
                      marginTop: "20px",
                    }}
                  >
                    <AdsSwiper width={250} />
                  </Box>
                </Box>
              )}
            </Field>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              disabled={isSubmitting}
              sx={{
                width: {
                  xs: "100%",
                  sm: "282px",
                },
                alignSelf: "center",
                height: "48px",
                mt: "15px",
                mb: "16px",
                background: "#113B73",
                color: "white",
                ":hover": {
                  background: "#0A2C5A",
                },
              }}
            >
              Verify
            </Button>
          </Form>
        )}
      </Formik>
      <Button onClick={onBack} sx={{ color: "#113B73" }}>
        Back
      </Button>
    </Box>
  );
};

export default VerifyOTP;
