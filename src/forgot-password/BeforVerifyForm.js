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

const BeforVerifyForm = ({localLoading, beforeSubmit}) => {
   return (
      <Formik
         initialValues={{
            user_phone: '',
         }}
         validationSchema={SignupSchema}
         onSubmit={(values) => {
            beforeSubmit(values)
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
                     autoComplete = "off"
                  />
               </div>
               <div className="error-text">
                  <ErrorMessage name="user_phone" />
               </div>
            </div>
            {/* <!-- input-block --> */}
            <div className="input-block btn-block">
               <Field type="submit" disabled={localLoading} style={{opacity : `${localLoading ? 0.5 : 1}`}} value="Tassyklama kody ugrat" name="submit" />
            </div>
         </Form>
      </Formik>
   )
}

export default BeforVerifyForm
