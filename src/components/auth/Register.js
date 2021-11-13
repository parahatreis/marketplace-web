import React, {useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from "react-toastify";
import bcrypt from 'bcryptjs';
// 
import { register } from '../../actions/usersAction';
import TermsModal from './TermsModal';


// Form Validation Schema
const SignupSchema = Yup.object().shape({
   user_name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
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
      })
   ,
   user_password: Yup.string()
      .min(6, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Required')
      .trim(),
   confirm_password: Yup.string()
      .required('Required')
      .oneOf([Yup.ref('user_password'), null], 'Passwords must match')
      .trim(),
   terms: Yup.boolean()
      .isTrue('This field must be checked')
      .required('Required')
});

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: '0px',
      transform: 'translate(-50%, -50%)'
   }
};

const Register = ({ register, history, users:  {loading} }) => {

   const [modalIsOpen, setIsOpen] = useState(false);
   const [termsModalIsOpen, setTermsIsOpen] = useState(false);
   const [userVerifCode, setUserVerifCode] = useState('');
   const [userData, setUserData] = useState(null);
   const [code, setCode] = useState(null);
   const [localLoading,setLocalLoading] = useState(false);
   const [verifyCodeLocalLoading,setVerifyCodeLocalLoading] = useState(false);

   // Open modal functions
   const openModal = () => setIsOpen(true);
   // const closeModal = () => setIsOpen(false);

   // Open modal functions
   const termsOpenModal = () => setTermsIsOpen(true);
   const termscCloseModal = () => setTermsIsOpen(false);


   const closeVerifyModal = () => {
      setCode(null);
      setUserVerifCode('');
      setIsOpen(false);
   }

   // Get Input value 
   const onChange = (e) => setUserVerifCode(e.target.value)


   const beforeSubmit = async (data) => {
      const user_phone = data.user_phone;
      const res = await checkUserWithPhoneNumber(user_phone);

      if (res === 200) {
         sendVerifyCode(user_phone);
         setUserData(data);
      }
   };

   // Check User IF user already exists
   const checkUserWithPhoneNumber = async (phone_number) => {
      setLocalLoading(true)
      const config = {
         headers: {
               'Content-Type': 'application/json'
         }
      };
      const body = JSON.stringify({
         user_phone : phone_number
      });
      try {
         await axios.post('/v1/users/check-user', body, config);
         return 200;
      }
      catch (err) {
         const error = err.response.data;
         if (error) {
               toast.error('Ulanyjy eyyam yazgyda!');
         }
         setLocalLoading(false)
         return 400
      }
   }

   // Send verify code to server then get the code
   const sendVerifyCode = async (user_phone) => {
      const config = {
         headers: {
               'Content-Type': 'application/json'
         }
      };
      const body = JSON.stringify({
         user_phone
      });
      try {
         // Get code
         const res = await axios.post('/v1/users/verify-code', body, config);
         setCode(res.data.code);
         openModal();
         return toast.success('SMS ustinlikli ugradyldy!');
      }
      catch (err) {
         if (err) {
               console.log(err)
               return toast.error('SMS ugradylyp bilinmedi!');
         }
      } finally {
         setLocalLoading(false);
      }
   }

   // Submit Verification Code
   const submitCode = async (e) => {
      e.preventDefault();
      // Check Verification code
      const comparedCode = bcrypt.compareSync(userVerifCode, code);
      if (comparedCode) {
         setVerifyCodeLocalLoading(true);
         register(userData).then((status) => {
               if(status === 200){
                  toast.success('Registrasiya bolanynyz ucin sagbolun');
                  history.push('/')
               }
               else{
                  toast.error('Registrasiyada ýalňyşlyk ýüze çykdy!');
               }
               setVerifyCodeLocalLoading(false);
         });
      }
      else{
         toast.error('Dogrulama kody ýalňyş!');
      }
   }

   return (
      <section className="auth-wrapper">
         <div className="auth-block">
            <div className="page-title">
               <h2>Agza bolmak</h2>
            </div>
         <div className="auth-box">
         <Formik
               initialValues={{
                  user_name: '',
                  user_phone: '',
                  user_password: '',
                  confirm_password: '',
                  terms : false
               }}
               validationSchema={SignupSchema}
                  onSubmit={(values) => {
                     const trimedValues = {};
                     for (const property in values) {
                        if (typeof values[property] === 'string') {
                           trimedValues[property] = values[property].trim()
                        }
                        else {
                           trimedValues[property] = values[property]
                        }
                     }
                     beforeSubmit(trimedValues)
               }}
               >
               <Form
                     autoComplete="off"
               >
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
                     <div className="input-block checkbox">
                     <Field
                           type="checkbox"
                           className="checkbox-input" 
                           name="terms"
                     />
                     <span><button onClick={termsOpenModal}>I accept all terms and conditions</button></span>
                     <div className="error-text">
                           <ErrorMessage name="terms" />
                     </div>
                     </div>
                     {/* Recaptcha */}
                     <div id="recaptcha-container"></div>
                     {/* <!-- input-block --> */}
                     <div className="input-block btn-block">
                     <Field
                           type="submit"
                           value={localLoading ? "Yuklenyar" : "Agza bol"} 
                           name="submit"
                           disabled={localLoading}
                           style={{opacity : `${localLoading ? 0.5 : 1}`}}
                     />
                     </div>
                  </Form>
               </Formik>
         </div>
         </div>

         {/* Modal */}
         <Modal
               isOpen={modalIsOpen}
               // onAfterOpen={afterOpenModal}
               // onRequestClose={closeModal}
               style={customStyles}
               ariaHideApp={false}
               contentLabel="Example Modal"
               >
               <div className="modal-wrapper">
                  {/* <div className="close-btn">
                     <button onClick={closeModal}>
                           <i className="far fa-times-circle"></i>
                     </button>
                  </div> */}
                  <h3>Tassyklamak</h3>
                  <p>Size SMS kod ugradyldy, telefon belgiňize gelen kody ýazyň</p>
                  
                  <div className="form-block">
                     <form
                           onSubmit={(e) => submitCode(e) }
                           >
                           <div className="modal-input code-input">
                           <input
                              type="number"
                              value={userVerifCode}
                              placeholder="Kod"
                              onChange = {(e) => onChange(e)}
                           /> 
                           </div>
                           <div className="modal-input">
                           <input 
                              type="submit"
                              className={`submit-btn ${verifyCodeLocalLoading ? 'opacity-active' : ''}`}
                              value={verifyCodeLocalLoading ? 'Yuklenyar' : 'Kody giriz'}
                              disabled={verifyCodeLocalLoading}
                           />
                           <button 
                              type="button"
                              className="cancel-btn"
                              onClick={closeVerifyModal}
                           >Cancel</button>
                           </div>
                     </form>
                  </div>
               </div>
         </Modal>
         <TermsModal termsModalIsOpen={termsModalIsOpen} termscCloseModal={termscCloseModal} />
      </section>
   )
}

Register.propTypes = {
register: PropTypes.func.isRequired,
users: PropTypes.object,
}

const mapStateToProps = state => ({
users: state.users
})

export default connect(mapStateToProps, {
   register
})(Register);
