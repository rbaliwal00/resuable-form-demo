import React from 'react';
import { Formik, Form } from 'formik';
import { Box, Button, FormHelperText } from '@mui/material';
import MaterialUIFieldAdapter from './form/MaterialUIFieldAdapter';
import * as Yup from "yup";

function App() {
  const validationSchema = Yup.object({
  name: Yup.string()
    .required("name is required"),
  phone_number: Yup.number()
    .required("phone number is required"),
  animal: Yup.string().required("please select animal")
});


  return (

    <Formik
      initialValues={{
                    name: '',
                    phone_number: '',
                    email: '',
                    animal: '',
                  }
      }
      validationSchema={validationSchema}
         onSubmit={(values, { setSubmitting }) => {
          console.log(values)
        }}
    >

         {({ setFieldValue, isSubmitting, errors, touched }) => (
        <Form >
          <Box
            sx={{
              maxWidth: {
                xs: '100%',
                sm: '608px',
              },
              m: 'auto',
              mt: {
                xs: '8px',
                sm: '32px',
              },
              px: {
                xs: '16px',
                sm: '35px',
              },
              py: {
                xs: '16px',
                sm: '30px',
              },
              boxShadow: {
                xs: 'none',
                sm: '0px 4px 25px 0px rgba(0, 0, 0, 0.05)',
              },
              borderRadius: {
                xs: '0px',
                sm: '12px',
              },
              bgcolor: 'background.paper',
            }}
          >
            <MaterialUIFieldAdapter
              name="name"
              type="text"
              label="Contact Person Name"
              placeholder="Type"
              style={{width: {lg: "600px", xl: "800px"} }}
            />
            <MaterialUIFieldAdapter
              name="phone_number"
              type="text"
              label="Contact Number"
              placeholder="Type"
            />
            <MaterialUIFieldAdapter
              name="email"
              type="email"
              label="Email"
              placeholder="Type"
            />
            <MaterialUIFieldAdapter
              name="animal"
              type="select"
              label="Select Animal"
              placeholder="Select Animal"
              options={[{
                value: "dog",
                label: "Dog"
              },
              {
                value: "cat",
                label: "Cat"
              }
            ]}
            />
             <Button variant='contained' type='submit' sx={{display: "flex", justifyContent: "center", margin: "auto"}}>Submit</Button>
          </Box>
        
         
        </Form>
      )}
    </Formik>

  );
}

export default App;
