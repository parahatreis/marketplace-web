import React from 'react';
import OrderItem from './OrderItem';
import PropTypes from 'prop-types'


const OrderList = ({orders}) => {
    return (
        <div className="order-list">
            {
                orders &&
                orders.map((order,index) => <OrderItem key={index} order={order} />)
            }
        </div>
    )
}

OrderList.propTypes = {
    orders : PropTypes.array.isRequired,
}

export default OrderList
