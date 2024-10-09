import React, { useState } from "react";
import MobileNumberForm from "./MobileForm";
import VerifyOTP from "./OtpForm";
import { useRouter } from "next/router";
import Toast from "@components/toast";

const OtpRegistrationFlow = (props) => {
  const { otpGenerate, otpValidate, otpResend } = props;
  const [showOtp, setShowOtp] = useState(false);
  const [mobile, setMobile] = useState("");
  const router = useRouter();

  const handleShowOtp = async (e) => {
    setMobile(e);
    const response = await otpGenerate(e);
    handleClick();
    if (!response) return false;
    setShowOtp(true);
    return true;
  };
  const hideOtp = () => {
    setShowOtp(false);
  };

  const handleVerify = async (otp) => {
    const response = await otpValidate(otp);
    if (!response) return false;
    router.push("/users/role-selection");
    return true;
  };

  const handleResend = async () => {
    await otpResend(mobile);
  };

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Toast
        type="success"
        text="Otp Sent"
        open={open}
        handleClose={handleClose}
      />
      {showOtp ? (
        <VerifyOTP
          onBack={hideOtp}
          callBack={handleVerify}
          mobile={mobile}
          resend={handleResend}
        />
      ) : (
        <MobileNumberForm
          open={open}
          handleClick={handleClick}
          handleClose={handleClose}
          callback={handleShowOtp}
          {...props}
        />
      )}
    </>
  );
};

export default OtpRegistrationFlow;
