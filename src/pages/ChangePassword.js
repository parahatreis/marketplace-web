import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { toast } from "react-toastify";
import Spinner from '../components/layouts/Spinner';

// Form Validation Schema
const SignupSchema = Yup.object().shape({
   user_phone: Yup.string()
      .min(8, 'Invalid Number!')
      .max(8, 'Too Long!')
      .required('Required')
      .test(
         'Check Starts With','Invalid Number', function () {
         let pass = this.parent["user_phone"];
         if (pass) {
            return pass.startsWith('6') ? true : false;
         }
      }),
   user_password: Yup.string()
      .min(6, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required')
      .trim(),
   confirm_password: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('user_password'), null], 'Passwords must match')
      .trim(),
});


const ChangePassword = ({users : {user}, history}) => {
   const [btnActive, setBtnActive] = useState(false);
   const [userData, setUserData] = useState(null);

   useEffect(() => {
      if (user) {
         setUserData(user)
      }
   }, [user])

   const changePassword = async (data) => {
      setBtnActive(true)
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      };
      const body = JSON.stringify(data);
      try {
         // Get code
         await axios.patch('/v1/users/change-password', body, config);
         setBtnActive(false);
         toast.success('Acar sozi uytgedildi!');
         return history.push('/profile');
      } catch (err) {
         if (err) {
            console.log(err)
            setBtnActive(false)
            return toast.error('Acar sozi uytgedilip bilinmedi!');
         }
      }
   }

   return (
      <>
         {
         userData ?
         <section className="auth-wrapper">
            <div className="auth-block">
               <h1>Acar sozuni uytgetmek</h1>
               <div className="auth-box">
                  <Formik
                     initialValues={{
                        user_phone: userData.user_phone,
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
                                 autoComplete = "off"
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
                           <Field type="submit" disabled={btnActive} style={{opacity : `${btnActive ? 0.5 : 1}`}} value="Acar sozi uytget" name="submit" />
                        </div>
                     </Form>
                  </Formik>
               </div>
            </div>
            </section> :
            <Spinner />
      }
      </>
   )
}

ChangePassword.propTypes = {
   users: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   users: state.users
});

export default connect(mapStateToProps)(ChangePassword)