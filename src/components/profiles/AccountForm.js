import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from "yup";
import { connect } from 'react-redux';
// 
import {updateUser} from '../../actions/usersAction'



// Form Validation Schema
const SignupSchema = Yup.object().shape({
    user_name: Yup.string()
       .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
    user_phone: Yup.string()
        .min(8, 'Invalid Number!')
        .required('Required'),
  });


const AccountForm = ({user, updateUser, loading}) => {

    const onSubmit = (values) => {
        updateUser(values)
    }
   
   return (
      <section className="auth-wrapper">
         <div className="auth-block">
            <div className="auth-box">
                <Formik
                    initialValues={{
                        user_name : user.user_name,
                        user_phone : user.user_phone,
                        user_address : user.user_address ? user.user_address : '' 
                    }}
                    validationSchema={SignupSchema}
                    onSubmit={(values) => onSubmit(values)}
                >
                <Form autoComplete="off" >
                        {/* <!-- input-block --> */}
                        <div className="input-block">
                            <label htmlFor="user_name">Doly Adynyz</label> <br />
                            <Field
                                type="text"
                                name="user_name" 
                                autoComplete="off"
                            />
                            <div className="error-text">
                            <ErrorMessage name="user_name" />
                            </div>
                        </div>
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
                            <label htmlFor="user_address">Salgynyz</label> <br />
                            <Field
                                type="text"
                                name="user_address" 
                                autoComplete="off"
                            />
                        </div>
                        {/* <!-- input-block --> */}
                        <div className="input-block btn-block">
                            <Field
                                style={{opacity : `${loading ? 0.5 : 1}`}}
                                type="submit"
                                value="Ýatda sakla" 
                                name="submit"
                                disabled={loading}
                            />
                        </div>
                        <div className="forgot-password">
                           <Link to="/change-password">Acar sozuni uytget</Link>
                        </div>
                    </Form>
                </Formik>
            </div>
         </div>
      </section>
   )
}

AccountForm.propTypes = {
    updateUser : PropTypes.func,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool,
 }
 
 const mapStateToProps = state => ({
    loading: state.users.loading
 })
 
 export default connect(mapStateToProps, {updateUser})(AccountForm)
 