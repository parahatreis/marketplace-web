import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// 
import AccountForm from '../components/profiles/AccountForm';
import {loadUser} from '../actions/usersAction';
import Spinner from '../components/layouts/Spinner'


const Profile = ({users : {user, isAuthenticated}, loadUser}) => {


   const [userData, setUserData] = useState(null);

   useEffect(() => {
      loadUser();
      window.scrollTo(0, 0);
   }, [loadUser]);

   useEffect(() => {
      setUserData(user)
   }, [user])


   return (
      <>
      {
         isAuthenticated ?
         <section className="profile-section">
            <div className="page-title">
               <h2>Hasabym</h2>
            </div>
            <div className="tabs">
               <div >
                  <Link className="active" to="/profile">Hasabym</Link>
               </div>
               <div>
                  <Link to="/orders">Sargytlarym</Link>
               </div>
            </div>
            {
               userData &&
               <AccountForm user={user} />
            }
         </section> 
         : <Spinner />
      }
      </>
   )
}

Profile.propTypes = {
   loadUser: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
   users: state.users
})

export default connect(mapStateToProps, {loadUser})(Profile)
