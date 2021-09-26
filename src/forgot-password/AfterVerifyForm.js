import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";

// Form Validation Schema
const SignupSchema = Yup.object().shape({
   user_phone: Yup.string()
      .min(8, 'Invalid Number!')
      .max(8, 'Too Long!')
      .required('Required')
      .test(
         'Check Starts With', 'Invalid Number',
         function () {
            let pass = this.parent["user_phone"];
            if (pass) {
               return pass.startsWith('6') ? true : false;
            }
         })
});

const BeforVerifyForm = ({ localLoading, changePassword, user_phone }) => {
   return (
      <>
         {
         user_phone &&
         <Formik
            initialValues={{
               user_phone: user_phone,
               user_password: '',
               confirm_password: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
               changePassword(values)
            }}
         >
            <Form
               autoComplete="off"
            >
               {/* <!-- input-block --> */}
               <div className="input-block">
                  <label htmlFor="user_phone">Telefon Belginiz</label> <br />
                  <div className="phone-input">
                     <div>
                        +993
                     </div>
                     <Field
                        type="number"
                        name="user_phone" 
                           autoComplete="off"
                           disabled
                     />
                  </div>
                  <div className="error-text">
                     <ErrorMessage name="user_phone" />
                  </div>
               </div>
               {/* <!-- input-block --> */}
               <div className="input-block">
                  <label htmlFor="user_password">Açar Söz</label> <br />
                  <Field
                        type="password"
                        name="user_password" 
                        autoComplete="off"
                  />
                  <div className="error-text">
                        <ErrorMessage name="user_password" />
                  </div>
               </div>
               {/* <!-- input-block --> */}
               <div className="input-block">
                  <label htmlFor="confirm_password">Açar Söz Tassykla</label> <br />
                        <Field
                        type="password"
                        name="confirm_password" 
                        autoComplete="off"
                        />
                  <div className="error-text">
                        <ErrorMessage name="confirm_password" />
                  </div>
               </div>
               {/* <!-- input-block --> */}
               <div className="input-block btn-block">
                  <Field type="submit" disabled={localLoading} style={{opacity : `${localLoading ? 0.5 : 1}`}} value="Acar sozi uytget" name="submit" />
               </div>
            </Form>
         </Formik>
      }
      </>
   )
}

export default BeforVerifyForm
