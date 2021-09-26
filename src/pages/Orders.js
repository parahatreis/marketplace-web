import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'
// 
import OrderList from '../components/orders/OrderList'
import Spinner from '../components/layouts/Spinner';

const Orders = () => {
   
   const [localLoading,setLocalLoading] = useState(false);
   const [orders,setOrders] = useState(null);


   useEffect(() => {
      getUserOrders();
      window.scrollTo(0, 0);
   }, [])

   const getUserOrders = async () => {
      setLocalLoading(true)

      try {
         const res = await axios.get('/v1/orders/user');
   
         setOrders(res.data);
         setLocalLoading(false)
   
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <section className="profile-section">
         <div className="page-title">
            <h2>Sargytlarym</h2>
         </div>
         <div className="tabs">
            <div>
               <Link to="/profile">Hasabym</Link>
            </div>
            <div>
               <Link className="active" to="/orders">Sargytlarym</Link>
            </div>
         </div>
         {
            
            localLoading ? <Spinner /> : 
            <div className="orders-section">
               {
                  orders &&
                  orders.length > 0 ? 
                  <OrderList orders={orders} /> : 
                  <p style={{textAlign : 'center'}}>Sargyt yok</p>
               }
            </div>
         }
      </section>
   )
}

export default Orders
