import React, { useRef } from "react";
import ThemeCard from "./Themecard";
import PropTypes from "prop-types";
import { IconButton, Box, Button, Typography } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ShareIcon from "@mui/icons-material/Share";
import { toPng } from "html-to-image";
import { saveAs } from "file-saver";
import Link from "next/link";
import { useRouter } from "next/router";
import { jobThemeColors, orgThemeColors } from "./utilities";

const ButtonStack = ({ updateType, handleDownloadImage, userId, isPublic }) => {
  const nextRoute =
    (typeof window !== "undefined"
      ? "https://" + window.location.hostname
      : "") +
    "/users/vc/" +
    userId;

  const updateRoute =
    "/users/update" + updateType.charAt(0).toUpperCase() + updateType.slice(1);
  const fullMsg = `${
    isPublic ? "Checkout this profile!!" : "Check my VC card here"
  } ${nextRoute}`;
  const shareOnWatsapp = () => {
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      fullMsg,
    )}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <Box
      display="flex"
      sx={{
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        left: "372px",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <IconButton
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.05)",
          marginBottom: "16px",
          "&:hover": {
            backgroundColor: "white",
          },
          borderWidth: "1px",
          borderColor: "#EFEFEF",
        }}
        onClick={handleDownloadImage}
      >
        <FileDownloadOutlinedIcon sx={{ color: "black" }} />
      </IconButton>

      {!isPublic && (
        <Link href={updateRoute}>
          <IconButton
            sx={{
              backgroundColor: "white",
              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.05)",
              marginBottom: "16px",
              "&:hover": {
                backgroundColor: "white",
              },
              borderWidth: "1px",
              borderColor: "#EFEFEF",
            }}
          >
            <EditOutlinedIcon sx={{ color: "black" }} />
          </IconButton>
        </Link>
      )}

      <IconButton
        sx={{
          backgroundColor: "white",
          boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.05)",
          marginBottom: "16px",
          "&:hover": {
            backgroundColor: "white",
          },
          borderWidth: "1px",
          borderColor: "#EFEFEF",
        }}
        onClick={shareOnWatsapp}
      >
        <ShareIcon sx={{ color: "#FF7E41" }} />
      </IconButton>
    </Box>
  );
};

const FilledCard = ({ type, formDetails, isPublic }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { profile } = formDetails;
  const updateType = formDetails?.profile[profile.length - 1].sub_type;

  const userType =
    formDetails?.type ?? formDetails?.profile[profile.length - 1].type;

  const backgroundIndex =
    userType == "jobSeeker"
      ? formDetails?.profile[0].vc_theme.split("_")[1]
      : formDetails?.organization_auth_map[0]?.organization?.vc_theme.split(
          "_",
        )[1];
  const colorArray = userType == "jobSeeker" ? jobThemeColors : orgThemeColors;

  const redirectToDashboard = () => {
    router.push("/users/dashboard/job-seeker");
  };

  const handleDownloadImage = async () => {
    if (cardRef.current === null) {
      return;
    }

    const dataUrl = await toPng(cardRef.current, {
      width: cardRef.current.scrollWidth,
      height: cardRef.current.scrollHeight,
    });
    saveAs(dataUrl, "theme-card.png");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Box
        display={"flex"}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          padding: "16px",
          maxWidth: {
            xs: "360px",
            sm: "472px",
          },
          minWidth: {
            xs: "100%",
            sm: "376px",
          },
          m: "auto",
          mt: "32px",
        }}
      >
        <div ref={cardRef}>
          <ThemeCard
            bgColor={colorArray[backgroundIndex]?.background}
            type={updateType}
            formDetails={formDetails}
          />
        </div>
        <ButtonStack
          updateType={updateType}
          handleDownloadImage={handleDownloadImage}
          userId={formDetails.id}
          isPublic={isPublic}
        />
      </Box>
      {!isPublic && (
        <Button
          variant="contained"
          onClick={redirectToDashboard}
          sx={{
            borderRadius: "8px",
            maxHeight: "48px",
            py: "10px",
            width: {
              xs: "100%",
              sm: "79%",
            },
            backgroundColor: "#113B73",
            textTransform: "none",
            maxWidth: {
              xs: "328px",
              sm: "608px",
            },
            boxShadow: "none",
            mt: "48px",
            alignSelf: "center",
          }}
        >
          <Typography
            fontSize={"16px"}
            fontWeight={"600"}
            color={"#fff"}
            fontFamily={"Poppins"}
          >
            Dashboard
          </Typography>
        </Button>
      )}
    </Box>
  );
};

FilledCard.propTypes = {
  type: PropTypes.string,
  formDetails: PropTypes.object,
};

export default FilledCard;
