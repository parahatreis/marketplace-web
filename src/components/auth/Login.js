import React, {useEffect, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { connect } from 'react-redux';
// 
import { login } from '../../actions/usersAction';


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
         }),
   user_password: Yup.string()
      .min(6, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
});   


const Login = ({ login, users : {isAuthenticated, loading} }) => {
   

   const [btnActive,setBtnActive] = useState(false);

    useEffect(() => {
        setBtnActive(loading);
    }, [loading]);


   if (isAuthenticated) {
      // TODO redirect previous page
      return <Redirect to = "/profile" />
   }
   return (
      <section className="auth-wrapper">
         <div className="auth-block">
            <div className="page-title">
               <h2>Iceri girmek</h2>
            </div>
            <div className="auth-box">
               <Formik
                  initialValues={{
                     user_phone: '',
                     user_password: '',
                  }}
                  validationSchema={SignupSchema}
                  onSubmit={(values) => {
                     // Set login function
                     login(values);
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
                     <div className="input-block btn-block">
                        <Field type="submit" disabled={btnActive} style={{opacity : `${btnActive ? 0.5 : 1}`}} value="Içeri gir" name="submit" />
                     </div>
                     <div className="forgot-password">
                        <Link to="/forgot-password">Acar sozuni unuttym</Link>
                     </div>
                  </Form>
               </Formik>
            </div>
         </div>
      </section>
   )
}

Login.propTypes = {
   login: PropTypes.func.isRequired,
   users: PropTypes.object,
}

const mapStateToProps = state => ({
   users: state.users
})

export default connect(mapStateToProps, {login})(Login)
