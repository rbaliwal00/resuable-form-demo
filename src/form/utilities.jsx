import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";
// import { useRouter } from "next/router";

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

export default eighteenYearsAgo;

export const validateFile = (file, maxSize) => {
  if (!file) return true; // Skip if no file is uploaded
  const sizeInBytes = maxSize * 1024 * 1024; // Convert MB to bytes
  return (
    file.size <= sizeInBytes &&
    ["image/jpeg", "image/png", "image/gif"].includes(file.type)
  );
};

export const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

export const nextBtn = (isLast) => {
  const text = isLast ? "Confirm" : "Next";

  const matches = useMediaQuery("(min-width:600px)");

  return matches ? (
    <Button
      type="submit"
      variant="contained"
      sx={{
        borderRadius: "8px",
        maxHeight: "48px",
        display: {
          xs: "inline-block",
          sm: "inherit",
        },
        margin: "auto",
        py: "10px",
        width: {
          xs: "90%",
          sm: "79%",
        },
        backgroundColor: "#113B73",
        textTransform: "none",
        maxWidth: "608px",
        boxShadow: "none",
      }}
    >
      <Typography
        fontSize={"16px"}
        fontWeight={"600"}
        color={"#fff"}
        fontFamily={"Poppins"}
      >
        {text}
      </Typography>
    </Button>
  ) : (
    <Box
      sx={{
        position: "fixed",
        bottom: "0px",
        left: "-3px",
        padding: "16px",
        borderRadius: "8px 8px 0 0",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
        background: "white",
        width: "100%",
      }}
    >
      <Button
        type="submit"
        variant="contained"
        sx={{
          borderRadius: "8px",
          maxHeight: "48px",
          display: "block",
          margin: "auto",
          width: "100%",
          py: "10px",
          backgroundColor: "#113B73",
          textTransform: "none",
        }}
      >
        <Typography
          fontSize={"16px"}
          fontWeight={"600"}
          color={"#fff"}
          fontFamily={"Poppins"}
        >
          {text}
        </Typography>
      </Button>
    </Box>
  );
};

export const renderBackButton = (onBack, step) => {
  const router = useRouter();

  const handleClick = () => {
    console.log("check btn clicked", step);
    step > 0 ? onBack() : router.back();
  };

  return (
    <Button
      type="button"
      variant="outlined"
      sx={{
        width: { sm: "19%" }, // Applies width starting from the sm breakpoint
        textTransform: "none",
        display: {
          xs: "none", // Hides the button on extra small screens (below 600px)
          sm: "block", // Displays the button on screens 600px and wider
        },
        borderRadius: "8px",
        maxHeight: "48px",
        py: "10px",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#113B73",
      }}
      onClick={handleClick}
    >
      <Typography fontSize={"16px"} fontWeight={"600"} color={"#113B73"}>
        Back
      </Typography>
    </Button>
  );
};

export const createTimer = (duration, onUpdate) => {
  let seconds = duration;
  const intervalId = setInterval(() => {
    seconds -= 1;
    onUpdate(seconds); // Call the onUpdate function with the current time

    if (seconds <= 0) {
      clearInterval(intervalId);
      onUpdate(0); // Optionally notify that the timer has ended
    }
  }, 1000);

  return {
    getCurrentTime: () => seconds,
    stop: () => {
      clearInterval(intervalId);
      console.log("Timer stopped manually with", seconds, "seconds remaining.");
    },
  };
};

export const styles = {
  formContainers: {
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
  },
};

// export const CvVideoImg = require("../../../public/assets/cvVideo.png");
// export const CvFormImg = require("../../../public/assets/cvForm.png");

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

export function deepMerge(target, source) {
  let output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

// export const partTimeImg = require("@public/assets/partTime.png");

export const transformObject = (obj) => {
  const { profile, organization_auth_map } = obj;

  const org =
    organization_auth_map[organization_auth_map.length - 1]?.organization;
  const { organization_location_map, gst_pan, contact, suppliers } = org || {};
  const location =
    (organization_location_map && organization_location_map[0]?.location) || {};

  const profileData = Array.isArray(profile)
    ? profile[profile.length - 1]
    : profile;
  const { awards, education, experience, preference, references } = profileData;

  const prefillFormData = {
    email: obj.email ?? "",
    phone_number: obj.phone_number ?? "",
    profile: {
      data: {
        id: profileData?.id ?? null,
        vc_theme: profileData?.vc_theme ?? "",
        type: profileData?.type ?? "",
        current_city: profileData?.current_city ?? "",
        cv_theme: profileData?.cv_theme ?? "",
        dob: profileData?.dob ?? "",
        education: {
          data: {
            id: education[0]?.id,
            cgpa: education[0]?.cgpa ?? "",
            from_date: education[0]?.from_date ?? "",
            to_date: education[0]?.to_date ?? "",
            institution_city: education[0]?.institution_city ?? "",
            institution_name: education[0]?.institution_name ?? "",
            level: education[0]?.level ?? "",
            passout_year: education[0]?.passout_year ?? "",
            study_field: education[0]?.study_field ?? "",
          },
        },
        experience: {
          data: {
            id: experience[0]?.id,
            brand_name: experience[0]?.brand_name ?? "",
            department: experience[0]?.department ?? "",
            montly_salary: experience[0]?.montly_salary ?? "",
            position: experience[0]?.position ?? "",
            sub_category: experience[0]?.sub_category ?? "",
            type: experience[0]?.type ?? "",
            work_experience: experience[0]?.work_experience ?? "",
          },
        },
        first_name: profileData?.first_name ?? "",
        last_name: profileData?.last_name ?? "",
        gender: profileData?.gender ?? "",
        image_url: profileData?.image_url ?? "",
        preference: {
          data: {
            id: preference[0]?.id,
            aadhar: preference[0]?.aadhar ?? "",
            internship: preference[0]?.internship ?? "",
            one_day_job: preference[0]?.one_day_job ?? "",
            partime_job: preference[0]?.partime_job ?? "",
            passport: preference[0]?.passport ?? "",
            working_city: preference[0]?.working_city ?? "",
          },
        },
        sub_type: profileData?.sub_type ?? "",
        website: profileData?.website ?? "",
      },
    },
    organization_auth_map: {
      data: {
        organization: {
          data: {
            id: org?.id,
            vc_theme: org?.vc_theme ?? "",
            brand_name: org?.brand_name ?? "",
            nature_of_business: org?.nature_of_business ?? [],
            company_name: org?.company_name ?? "",
            gst_pan: {
              data: {
                id: (gst_pan && gst_pan[0]?.id),
                gst: (gst_pan && gst_pan[0]?.gst) || "",
                pan: (gst_pan && gst_pan[0]?.pan) || "",
                status: (gst_pan && gst_pan[0]?.status) || "",
              },
            },
            image_url: org?.image_url ?? "",
            no_of_employee: org?.no_of_employee ?? "",
            contact: {
              data: {
                id: (contact && contact[0]?.id),
                name: (contact && contact[0]?.name) || "",
                email: (contact && contact[0]?.email) || "",
                website: (contact && contact[0]?.website) || "",
                phone_number: (contact && contact[0]?.phone_number) || "",
              },
            },
            organization_location_map: {
              data: {
                location: {
                  data: {
                    id: location?.id ,
                    area: location?.area ?? "",
                    block_number: location?.block_number ?? "",
                    city: location?.city ?? "",
                    pincode: location?.pincode ?? "",
                    state: location?.state ?? "",
                  },
                },
              },
            },
            suppliers: {
              data: {
                id: (suppliers && suppliers[0]?.id),
                area: (suppliers && suppliers[0]?.area) || "",
                scale: (suppliers && suppliers[0]?.scale) || "",
                coverage_area_list:
                  (suppliers && suppliers[0]?.coverage_area_list) || [],
              },
            },
          },
        },
      },
    },
  };

  return prefillFormData;
};

const profileDataExtracter = (profileDetails) => {
  if (Array.isArray(profileDetails.data)) {
    return profileDetails.data[0].data;
  } else return profileDetails.data;
};

export const getUpdateFormValues = (user) => {
  console.log("Check object before update transform", user);
  const formValues = {
    ...(user?.id ? { id: user.id } : {}),
    phone_number: user?.phone_number ?? "",
    email: user?.email ?? "",
    is_active: user?.is_active ?? true,
    type: user?.type ?? profileDataExtracter(user.profile)?.type,
    profile: {
      data: [
        {
          id: profileDataExtracter(user.profile)?.id,
          first_name: profileDataExtracter(user.profile)?.first_name ?? "",
          last_name: profileDataExtracter(user.profile)?.last_name ?? "",
          gender: profileDataExtracter(user.profile)?.gender ?? "",
          dob: profileDataExtracter(user.profile)?.dob ?? "",
          image_url: profileDataExtracter(user.profile)?.image_url ?? "",
          website: profileDataExtracter(user.profile)?.website ?? "",
          vc_theme: profileDataExtracter(user.profile)?.vc_theme ?? "",
          cv_theme: profileDataExtracter(user.profile)?.cv_theme ?? "",
          sub_type: profileDataExtracter(user.profile)?.sub_type ?? "",
          type: profileDataExtracter(user.profile)?.type ?? "",
          current_city: profileDataExtracter(user.profile)?.current_city ?? "",
          education: {
            data:
              [
                {
                  id: profileDataExtracter(user.profile).education.data?.id,
                  cgpa:
                    profileDataExtracter(user.profile).education.data?.cgpa ??
                    "",
                  //from_date: profileDataExtracter(user.profile).education.data?.from_date ?? "",
                  //to_date: profileDataExtracter(user.profile).education.data?.to_date ?? "",
                  institution_city:
                    profileDataExtracter(user.profile).education.data
                      ?.institution_city ?? "",
                  institution_name:
                    profileDataExtracter(user.profile).education.data
                      ?.institution_name ?? "",
                  level:
                    profileDataExtracter(user.profile).education.data?.level ??
                    "",
                  passout_year:
                    profileDataExtracter(user.profile).education.data
                      ?.passout_year ?? "",
                  study_field:
                    profileDataExtracter(user.profile).education.data
                      ?.study_field ?? "",
                },
              ] ?? [],
            on_conflict: {
              constraint: "education_pkey",
              update_columns: [
                "cgpa",
                "from_date",
                "to_date",
                "institution_city",
                "institution_name",
                "level",
                "passout_year",
                "study_field",
              ],
            },
          },

          ...(profileDataExtracter(user.profile)?.sub_type == 'experienced'
            ? {
                experience: {
                  data:
                    [
                      {
                        id: profileDataExtracter(user.profile).experience.data
                          ?.id,
                        brand_name:
                          profileDataExtracter(user.profile).experience.data
                            ?.brand_name ?? "",
                        department:
                          profileDataExtracter(user.profile).experience.data
                            ?.department ?? "",
                        // from_date: profileDataExtracter(user.profile).experience.data?.from_date ?? "",
                        // to_date: profileDataExtracter(user.profile).experience.data?.to_date ?? "",
                        monthly_salary_text:
                          profileDataExtracter(user.profile).experience.data
                            ?.monthly_salary_text ?? "",
                        position:
                          profileDataExtracter(user.profile).experience.data
                            ?.position ?? "",
                        sub_category:
                          profileDataExtracter(user.profile).experience.data
                            ?.sub_category ?? "",
                        type:
                          profileDataExtracter(user.profile).experience.data
                            ?.type ?? "",
                        work_experience:
                          profileDataExtracter(user.profile).experience.data
                            ?.work_experience ?? "",
                      },
                    ] ?? [],
                  on_conflict: {
                    constraint: "experience_pkey",
                    update_columns: [
                      "brand_name",
                      "department",
                      "from_date",
                      "to_date",
                      "monthly_salary_text",
                      "position",
                      "sub_category",
                      "type",
                      "work_experience",
                    ],
                  },
                },
              }
            : {}),
          preference: {
            data:
              [
                {
                  id: profileDataExtracter(user.profile).preference.data?.id,
                  aadhar:
                    profileDataExtracter(user.profile).preference.data
                      ?.aadhar ?? "",
                  internship:
                    profileDataExtracter(user.profile).preference.data
                      ?.internship ?? false,
                  one_day_job:
                    profileDataExtracter(user.profile).preference.data
                      ?.one_day_job ?? false,
                  partime_job:
                    profileDataExtracter(user.profile).preference.data
                      ?.partime_job ?? false,
                  passport:
                    profileDataExtracter(user.profile).preference.data
                      ?.passport ?? "",
                  working_city:
                    profileDataExtracter(user.profile).preference.data
                      ?.working_city ?? "",
                },
              ] ?? [],
            on_conflict: {
              constraint: "preference_pkey",
              update_columns: [
                "aadhar",
                "internship",
                "one_day_job",
                "partime_job",
                "passport",
                "working_city",
              ],
            },
          },
        },
      ],
      on_conflict: {
        constraint: "profile_pkey",
        update_columns: [
          "first_name",
          "last_name",
          "gender",
          "dob",
          "image_url",
          "website",
          "vc_theme",
          "cv_theme",
          "sub_type",
          "type",
        ],
      },
    },
  };

  return formValues;
};

export const updateOrgFormValues = (user) => {
  console.log("check org beforre updatation", user);
  const org = user.organization_auth_map.data.organization.data;
  const formValues = {
    object: {
      brand_name: org.brand_name ?? "",
      nature_of_business: org.nature_of_business ?? "",
      company_name: org.company_name ?? "",
      contact: {
        data: [
          {
            id: org.contact.data.id,
            email: org.contact.data.email ?? "",
            name: org.contact.data.name ?? "",
            phone_number: org.contact.data.phone_number ?? "",
            website: org.contact.data.website ?? "",
          },
        ],
        on_conflict: {
          constraint: "contact_pkey",
          update_columns: [
            "created_at",
            "email",
            "id",
            "is_active",
            "name",
            "phone_number",
            "updated_at",
            "website",
          ],
        },
      },
      gst_pan: {
        data: [
          {
            id: org.gst_pan.data.id,
            gst: org.gst_pan.data.gst ?? "",
            pan: org.gst_pan.data.pan ?? "",
            status: org.gst_pan.data.status ?? "",
          },
        ],
        on_conflict: {
          constraint: "gst_pan_pkey",
          update_columns: [
            "created_at",
            "gst",
            "id",
            "is_active",
            "organization_id",
            "pan",
            "status",
            "updated_at",
          ],
        },
      },
      id: org.id,
      image_url: org.image_url ?? "",
      no_of_employee: org.no_of_employee.toString() ?? "",
      suppliers: {
        data:
          [
            {
              id: org.suppliers.data.id,
              area: org.suppliers.data.area ?? "",
              scale: org.suppliers.data.scale ?? "",
              coverage_area_list: org.suppliers.data.coverage_area_list ?? "" ?? "",
            },
          ] ?? [],
        on_conflict: {
          constraint: "supplier_pkey",
          update_columns: [
            "area",
            "created_at",
            "id",
            "is_active",
            "organization_id",
            "scale",
            "updated_at",
            "coverage_area_list",
          ],
        },
      },
      vc_theme: org.vc_theme ?? "",
    },
    update_columns: [
      "brand_name",
      "business_nature",
      "company_name",
      "created_at",
      "id",
      "image_url",
      "is_active",
      "no_of_employee",
      "updated_at",
      "vc_theme",
    ],
  };

  console.log("Cehcek formValues here", formValues)

  return formValues;
};

export const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const natureOfBusiness = [
  "Hotel",
  "Cafe",
  "Restaurant",
  "Microbreweries",
  "QSR-Quick Service Restaurant",
  "HR-HOReCa-Consultancy",
  "Security Guard-Consultancy",
  "Fast Food Restauant",
  "Bar Restaurant",
  "Lounge Bar",
  "Pub Bar",
  "Resorts",
  "Homestay",
  "Apartment- Homestay",
  "Spa",
  "GYM",
  "Housekeeping Agency",
  "Catering",
  "Industrial Catering",
  "Bakery",
  "Resto Bar",
  "Bar N Cafe",
  "Coffee Shop",
];

export const supplierNatureOfBusiness = [
"Packaging",
"Packaging for Bakery",
"Indian Grocery", 
"Imported Grocery", 
"Imported Bakery Grocery", 
"Housekeeping",
"Uniform",
"Laundry",
"Storage Equipment",
"Utensils Bar & Kitchen Tools",
"Furniture",
"Poultry", 
"Meat",
"Fish & Seafood",
"Billing POS Software",
"Hardware for Hotel",
"Dairy Product",
"Indian Fruit & Vegetable",
'English Fruit & Vegetable',
"Bar Equipment",
"Kitchen Equipment",
"Bakery Equipment",
"Crockery ,Cutlery & Glassware",
"Hotel Services",
"Non Kitchen Equipment",
"Beverage Supplier",
"Liquor Supplier for Hotel",
"Beer Supplier for Hotel",
]

export const levelOfEducation = [
  "Undergraduate",
  "Postgraduate",
  "Diploma",
  "Certification",
];

export const monthlySalaries = [
  "Less than 20k m",
  "20k - 50k m",
  "50k - 75k m",
  "75k - 100k m",
];

export const responsiveFontSize = {
  fontSize: {
    xs: "14px",
    sm: "16px",
  },
};

export const getInitialValue = (value) => {
  if (value && value[0]) {
    return Array.isArray(value) && value.length > 0 ? [...value] : [value];
  }
  return [];
};

export const jobThemeColors = [
  {background: 'linear-gradient(to left, #B34ECC -56%, #F5895C 50%, #F9F5E0 105%)'},

  {background: 'linear-gradient(to left, #CAEFD7 0%, #BFEBF5 50%, #ABC9E9 100%)'},

  {background: 'linear-gradient(to left, #D13F59 -77%, #D497F0 50%, #80E3F1 116%)'},

  {background: 'linear-gradient(to right, #F0BBF9 0%, #7CD5E9 124%)'} 
]

export const orgThemeColors = [
{background: 'linear-gradient(to left, #FF94D5 -32%, #D580C9 17%, #A66FB8 34%, #785EA4 59%, #494C8D 89%, #113B73 145%)'},
{background: 'linear-gradient(to bottom left, #113B73 -13%, #415D9A 10%, #6A82C3 35%, #92AAED 64%, #BCD3FF 85%)'},
{background: 'linear-gradient(to left, #215DAC -37%, #DDEBEA 51%, #3B8884 112%)'},
{background: 'linear-gradient(to left, #FFAF7B 0%, #D76D77 51%, #3A1C71 135%)'},
]


export const formDetails = {
  data: {
    user_auth: [
      {
        id: "8fa531e7-a81b-4073-a327-eea7d1f011de",
        email: "user@example.com",
        phone_number: "9999900000",
        is_active: true,
        created_at: "2024-05-26T12:36:15.382201+00:00",
        updated_at: "2024-05-26T12:36:15.382201+00:00",
        profile: [],
        organization_auth_map: [],
      },
      {
        id: "ae6da7d4-a02f-4ede-9e7b-be3d93c3c551",
        email: "user@example.com",
        phone_number: "9999900001",
        is_active: true,
        created_at: "2024-05-26T14:30:15.157117+00:00",
        updated_at: "2024-05-26T14:30:15.157117+00:00",
        profile: [
          {
            first_name: "Name 1",
            last_name: "Name 2",
            gender: "Brocolli",
            dob: "Today",
            image_url: "Url 1",
            website: "example.com",
            vc_theme: "Vc theme 1",
            cv_theme: "CV theme 1",
            sub_type: "Sub type 1",
            type: "Type 1",
            awards: [
              {
                brand_name: "Brand 1",
                department: "Department 1",
                name: "Some name",
                position: "Position 1",
              },
            ],
            education: [
              {
                cgpa: "5.5",
                from_date: "2023-05-01",
                to_date: "2024-03-01",
                institution_city: "City 1",
                institution_name: "Institution 1",
                level: "Level 1",
                passout_year: "2022",
                study_field: "Field 1",
              },
            ],
            experience: [
              {
                brand_name: "Brand 1",
                department: "Department 1",
                from_date: "2022-03-03",
                to_date: "2023-03-04",
                montly_salary: 100000,
                position: "Position 1",
                sub_category: "Sub category 1",
                type: "Type 1",
                work_experience: "Experience 1",
              },
            ],
            preference: [
              {
                aadhar: "Aadhar 1",
                internship: false,
                one_day_job: false,
                partime_job: false,
                passport: "Passport 1",
                working_city: "City 1",
              },
            ],
            references: [
              {
                brand_name: "Name 1",
                department: "Department 1",
                email: "user@example.com",
                name: "user",
                phone_number: "1231231231",
                position: "Position 1",
              },
            ],
          },
        ],
        organization_auth_map: [
          {
            organization: {
              vc_theme: "Vc Theme 2",
              brand_name: "Brand 1",
              business_nature: "Nature 1",
              company_name: "Company 1",
              image_url: "some_url",
              no_of_employee: 10,
              gst_pan: [
                {
                  gst: "Gst 1",
                  pan: "Pan 1",
                  status: "Pending",
                },
              ],
              contact: [
                {
                  name: "Name 1",
                  email: "user1@example.com",
                  website: "example.com",
                  phone_number: "9999900000",
                },
              ],
              organization_location_map: [
                {
                  location: {
                    area: "Area 1",
                    block_number: "1/02",
                    city: "City 1",
                    pincode: 123123,
                    state: "State 1",
                    geolocation: [
                      {
                        latitude: "12.21",
                        longitude: "21.12",
                        type: "Type 1",
                      },
                    ],
                  },
                },
              ],
              suppliers: [
                {
                  area: "Area 1",
                  scale: "large",
                },
              ],
            },
          },
        ],
      },
    ],
  },
};

export const blobToDataURL = (blob, callback) => {
  if (!(blob instanceof Blob)) {
    console.error('Provided parameter is not a Blob:', blob);
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    callback(e.target.result);
  };
  reader.onerror = function (error) {
    console.error('FileReader error:', error);
  };
  reader.readAsDataURL(blob);
}

