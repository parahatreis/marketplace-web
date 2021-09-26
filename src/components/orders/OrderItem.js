import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const OrderItem = ({order}) => {

    const {
        id,
        order_status,
        subtotal,
        createdAt,
        order_products
    } = order;
    
    const [date, setDate] = useState(null)

    let statusColor = null;
    let statusName = null;

    
    if(order_status === 0) {
        statusColor = 'error';
        statusName = 'Yatyryldy';
    }
    if(order_status === 1) {
        statusColor = 'warning';
        statusName = 'Garasylyar'
    };
    if(order_status === 2) {
        statusColor = 'primary';
        statusName = 'Tayyarlanylyar';
    }
    if(order_status === 3) {
        statusColor = 'success';
        statusName = 'Gowsuryldy';
    }


    useEffect(() => {
        const c_Date = moment(createdAt).format("DD.MM.YYYY");
        setDate(c_Date)
    }, [createdAt])

    

    return (
        <div className="order-item">
            <div className="p-1 part">
                {/* ID */}
                <div className="info">
                    <div className="info-title">
                        ID:
                    </div>
                    <div className="info-value">
                        {id}
                    </div>
                </div>
                {/* Date */}
                <div className="info">
                    <div className="info-title">
                        Sargyt taryhy:
                    </div>
                    <div className="info-value">
                        {date && date}
                    </div>
                </div>
                {/* Quantity */}
                <div className="info">
                    <div className="info-title">
                        Haryt sany:
                    </div>
                    <div className="info-value">
                        {order_products &&  order_products.length}
                    </div>
                </div>
            </div>
            <div className='p-2 part'>
                {/* Total */}
                <div className="info">
                    <div className="info-title">
                        Jemi:
                    </div>
                    <div className="info-value total">
                        {subtotal} TMT
                    </div>
                </div>
                {/* Statuts */}
                <div className="info">
                    <div className="info-title">
                        Sargyt yagdayy:
                    </div>
                    <div className={`info-value ${statusColor ? statusColor : ''}`}>
                        {statusName && statusName}
                    </div>
                </div>
                {/* see all */}
                {/* <div className="info">
                    <div className="info-value">
                        <Link to="/orders">Harytlar</Link>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

OrderItem.propTypes = {
    order : PropTypes.object.isRequired,
}

export default OrderItem
