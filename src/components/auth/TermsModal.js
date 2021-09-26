import React from 'react';
import Modal from 'react-modal';


const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      padding: '0px',
      transform: 'translate(-50%, -50%)'
   },
   paragraph: {
      textAlign: 'left'
   },
   btn: {
      background: 'none',
      color : 'red'
   }
};

const TermsModal = ({termsModalIsOpen,termscCloseModal}) => {
   
   return (
      <Modal
         isOpen={termsModalIsOpen}
         // onAfterOpen={afterOpenModal}
         onRequestClose={termscCloseModal}
         style={customStyles}
         ariaHideApp={false}
         contentLabel="Example Modal"
         >
         <div className="modal-wrapper">
            <div className="close-btn">
               <button onClick={termscCloseModal}>
                  <i className="far fa-times-circle"></i>
                  Close
               </button>
            </div>
            <h3>Terms</h3>
            <p style={customStyles.paragraph}>- Lorem ipsum dolor sit amet, consectetur adipiscing elit. In pellentesque cras viverra est mauris et nibh. Posuere molestie mauris ut semper malesuada laoreet mauris. Nibh eget at dui augue convallis arcu nunc est, in. Amet, eleifend quisque viverra amet facilisis senectus nisi quis. Vitae consectetur sit vestibulum quam. Tincidunt vulputate lacinia ullamcorper ac, imperdiet facilisi proin.</p>
         </div>
      </Modal>
   )
}

export default TermsModal
