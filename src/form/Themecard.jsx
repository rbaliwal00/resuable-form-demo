import React, { useState } from "react";
import {
  Box,
  Card,
  Typography,
  Grid,
  CardContent,
  Container,
  Avatar,
} from "@mui/material";
import PropTypes from "prop-types";

const styles = {
  label: {
    fontSize: "8px",
    color: "#8899A8",
    fontWeight: "400",
  },
  valueTxt: {
    fontSize: "11px",
    color: "#4B5563",
    fontWeight: "500",
  },
  nameTxt: {
    fontSize: "16px",
    color: "#4B5563",
    fontWeight: "500",
  },
};

const renderCard = (type, formDetails, color) => {
  const { phone_number, email, profile, organization_auth_map } =
    formDetails || {};
  const {
    education,
    experience,
    preference,
    image_url,
    first_name,
    last_name,
    sub_type,
  } = profile[0] || [];
  const {
    brand_name = "",
    business_nature = "",
    company_name = "",
    no_of_employee = "",
    organization_location_map = "",
    contact = [],
    image_url: orgImgUrl,
  } = organization_auth_map[0]?.organization || [];
  const { block_number, area, city } =
    organization_location_map[0]?.location || [];
  const checkIfexperienced = sub_type === "experienced";
  if (type === "job")
    return (
      <Card
        style={{
          width: "100%",
          minWidth: "320px",
          px: {
            xs: "8px",
            sm: "32px",
          },
          py: "16px",
          backgroundColor: color,
          boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        <CardContent sx={{ m: 0 }}>
          <Grid container>
            <Grid item xs={6} sm={6} style={{ textAlign: "left" }}>
              <Box>
                <Typography sx={styles.label}>
                  {checkIfexperienced ? "Department" : "Education"}
                </Typography>
                <Typography sx={styles.valueTxt}>
                  {checkIfexperienced
                    ? experience[0]?.department
                    : education[0]?.level}
                </Typography>
              </Box>
              <Box style={{ marginTop: "8px" }}>
                <Typography sx={styles.label}>
                  {checkIfexperienced ? "Position" : "Institution"}
                </Typography>
                <Typography sx={styles.valueTxt}>
                  {checkIfexperienced
                    ? experience[0]?.position
                    : education[0]?.institution_name}
                </Typography>
              </Box>
              <Box style={{ marginTop: "8px" }}>
                <Typography sx={styles.label}>Current Location</Typography>
                <Typography sx={styles.valueTxt}>{"Bangalore"}</Typography>
              </Box>
              <Box style={{ marginTop: "8px" }}>
                <Typography sx={styles.label}>Preferred Location</Typography>
                <Typography sx={styles.valueTxt}>
                  {(preference && preference[0]?.working_city) || "hyderabad"}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sm={6}
              style={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {image_url && (
                <Avatar
                  alt={first_name + last_name || ""}
                  src={image_url} // Update with your avatar path
                  style={{
                    width: 80,
                    height: 80,
                    marginLeft: "auto",
                    marginBottom: "10px",
                  }}
                />
              )}
              <Typography sx={styles.nameTxt} component="div">
                {first_name + last_name}
              </Typography>
              <Typography sx={styles.valueTxt}>
                {(experience && experience[0]?.work_experience) ||
                  "experienced"}
              </Typography>
              <Typography sx={styles.label}>Contact No.</Typography>
              <Typography sx={styles.valueTxt} color="text.primary">
                {phone_number || "8208363654"}
              </Typography>
              <Typography sx={styles.label}>Email</Typography>
              <Typography sx={styles.valueTxt} color="text.primary">
                {email || "check@gmail.com"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  else
    return (
      <Card
        style={{
          width: "100%",
          px: {
            xs: "16px",
            sm: "32px",
          },
          minWidth: "320px",
          py: "16px",
          boxShadow: "0px 4px 25px 0px rgba(0, 0, 0, 0.05)",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              sm={6}
              style={{
                textAlign: "right",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              {orgImgUrl && (
                <Avatar
                  alt={brand_name || ""}
                  src={orgImgUrl} // Update with your avatar path
                  style={{
                    width: 80,
                    height: 80,
                    marginLeft: "auto",
                    marginBottom: "10px",
                  }}
                />
              )}
              <Typography sx={styles.nameTxt}>{brand_name}</Typography>
              <Typography sx={styles.valueTxt}>{company_name}</Typography>
              <Typography sx={styles.label} style={{ marginTop: "8px" }}>
                Contact Person
              </Typography>
              <Typography sx={styles.valueTxt}>{contact[0].name}</Typography>
              <Typography sx={styles.label} style={{ marginTop: "8px" }}>
                Contact No.
              </Typography>
              <Typography sx={styles.valueTxt}>
                {contact[0].phone_number}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} style={{ textAlign: "left" }}>
              <Box>
                <Typography sx={styles.label}>Nature of Business</Typography>
                <Typography sx={styles.valueTxt}>{business_nature}</Typography>
              </Box>
              <Box style={{ marginTop: "8px" }}>
                <Typography sx={styles.label}>Nunber of Employees</Typography>
                <Typography sx={styles.valueTxt}>{no_of_employee}</Typography>
              </Box>
              <Box style={{ marginTop: "8px" }}>
                <Typography sx={styles.label}>Current Location</Typography>
                <Typography sx={styles.valueTxt}>
                  {block_number + city + area}
                </Typography>
              </Box>
              <Box style={{ marginTop: "8px" }}>
                <Typography sx={styles.label}>Email</Typography>
                <Typography sx={styles.valueTxt}>{contact[0].email}</Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
};

const ThemeCard = ({ type, formDetails }) => {
  // const [color, setColor] = useState("red");

  // const handleColorChange = (col) => {
  //   setColor(col);
  // };

  // console.log(color);

  return (
    <Container
      sx={{
        maxWidth: { xs: "328px", sm: "328px" },
        minWidth: { xs: "180px", sm: "300px" },
        p: "4px",
        mt: "32px",
        width: "100%",
      }}
    >
      {renderCard(type, formDetails)}
      {/* <h2 className="text-base font-semibold">Choose Color</h2>
      <div className="grid grid-flow-col gap-4 pb-4 w-full justify-between">
        {["yellow", "red"].map((curr) => (
          <div
            key={curr}
            className={`bg-[${curr}] cursor-pointer shadow-[0px_4px_4px_0px_#00000040] w-[20px] h-[20px] rounded-[50%] ${
              color === curr ? "border-2 border-solid border-[#484848]" : ""
            }`}
            onClick={() => handleColorChange(curr)}
          />
        ))}
      </div> */}
    </Container>
  );
};

ThemeCard.proptypes = {
  type: PropTypes.string,
  formDetails: PropTypes.object,
};

export default ThemeCard;
