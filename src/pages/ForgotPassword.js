import React, { useState} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import bcrypt from 'bcryptjs'
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from "react-toastify";
// 
import BeforVerifyForm from '../forgot-password/BeforVerifyForm';
import AfterVerifyForm from '../forgot-password/AfterVerifyForm';
import { changeUserPassword } from '../actions/usersAction';




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


const ForgotPassword = ({users: { isAuthenticated }, history,changeUserPassword}) => {

   const [modalIsOpen, setIsOpen] = useState(false);
   const [userVerifCode, setUserVerifCode] = useState('');
   const [userData, setUserData] = useState(null);
   const [code, setCode] = useState(null);
   const [localLoading, setLocalLoading] = useState(false);
   const [verifyCodeLocalLoading, setVerifyCodeLocalLoading] = useState(false);
   const [isValidUser,setUserValid] = useState(false)

   // Get Input value 
   const onChange = (e) => setUserVerifCode(e.target.value);

   // Open modal functions
   const openModal = () => setIsOpen(true);
   const closeModal = () => setIsOpen(false);

   const beforeSubmit = async (data) => {
      const user_phone = data.user_phone;
      const res = await checkUserWithPhoneNumber(user_phone);

      if (res === 200) {
         sendVerifyCode(user_phone);
         setUserData(data)
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
         user_phone: phone_number
      });
      try {
         await axios.post('/v1/users/forgot-password/check-user', body, config);
         return 200;
      } catch (err) {
         const error = err.response.data;
         if (error) {
            toast.error('Ulanyjy tapylmady!');
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
      } catch (err) {
         if (err) {
            console.log(err)
            return toast.error('SMS ugradylyp bilinmedi!');
         }
      }
   }

   // Submit Verification Code
   const submitCode = async (e) => {
      e.preventDefault();
      // Check Verification code
      const isMatch = await bcrypt.compareSync(userVerifCode, code);
      if (isMatch) {
         setUserValid(true)
         closeModal();
      } else {
         toast.error('Dogrulama kody ýalňyş!');
      }
      setLocalLoading(false)
   }

   const changePassword = async (data) => {
      setVerifyCodeLocalLoading(true);
      changeUserPassword(data)
         .then((status) => {
            if (status === 200) {
               toast.success('Acar sozi uytgedildi');
               history.push('/')
            } else {
               toast.error('Ulgamda ýalňyşlyk ýüze çykdy!');
            }
            setVerifyCodeLocalLoading(false);
         })
   }


   if (isAuthenticated) {
      return <Redirect to = "/" />
   }
   return (
      <>
         <section className="auth-wrapper">
            <div className="auth-block">
               <h1>Telefon belginizi girizin</h1>
               <div className="auth-box">
                  {
                     isValidUser ?
                        <AfterVerifyForm localLoading={localLoading} changePassword={changePassword} user_phone={userData.user_phone} />
                        :
                        <BeforVerifyForm localLoading={localLoading} beforeSubmit={beforeSubmit} /> 
                  }
               </div>
            </div>
         </section>
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
                              className="submit-btn"
                              value={verifyCodeLocalLoading ? 'Yuklenyar' : 'Kody giriz'}
                              disabled={verifyCodeLocalLoading}
                              style={{opacity : `${verifyCodeLocalLoading ? 0.5 : 1}`}}
                           />
                           </div>
                     </form>
                  </div>
               </div>
         </Modal>
      </>
   )
}

ForgotPassword.propTypes = {
   users: PropTypes.object.isRequired,
   changeUserPassword : PropTypes.func,
}

const mapStateToProps = state => ({
   users: state.users
});

export default connect(mapStateToProps, {
   changeUserPassword
})(ForgotPassword)