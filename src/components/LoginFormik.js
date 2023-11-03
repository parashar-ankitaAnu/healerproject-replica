// import React from 'react';
// import { Form, Button, Container } from 'react-bootstrap';
// import { Formik, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const validationSchema = Yup.object().shape({
//     Email: Yup.string().required("field is required"),
//     Password: Yup.string().required("field is required")
// })

// const test = {
//     Email: '',
//     Password: ''
// }

// const LoginFormik = () => {
//     const handleSubmit = (values) => {
//         console.log(values);
//     }


//     return (
//         <div>
//             <Container>
//                 <Formik
//                     initialValues={test}
//                     validationSchema={validationSchema}
//                     onSubmit={handleSubmit}>
//                     {({ touched, errors }) => (
//                         <Form>
//                             <Form.Group className="mb-3">
//                                 <Form.Label htmlFor="Email">Email</Form.Label>
//                                 <Field name="Email " type="email" className="form-control" placeholder="Enter email address" />
//                                 <ErrorMessage name="Email" component="div" className="text-danger" />
//                             </Form.Group>


//                             <Form.Group className="mb-3">
//                                 <Form.Label htmlFor="Pasword">Password</Form.Label>
//                                 <Field name="Password" type="text" className="form-control" placeholder="Enter password" />
//                                 <ErrorMessage name="Age" component="div" className="text-danger" />
//                             </Form.Group>
//                             <Button type="submit">Submit</Button>
//                         </Form>
//                     )}
//                 </Formik>
//             </Container>
//         </div>
//     )
// }
// export default LoginFormik;