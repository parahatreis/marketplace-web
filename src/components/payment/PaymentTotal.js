import React, {Fragment, useEffect, useState} from 'react'
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from "react-toastify";
// 
import {updateUser} from '../../actions/usersAction'
import {clearCart} from '../../actions/cartAction'


// Form Validation Schema
const SignupSchema = Yup.object().shape({
    user_name: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    user_address: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Required'),
    user_phone: Yup.string()
        .min(8, 'Invalid Number!')
        .required('Required'),
});

const PaymentTotal = ({ cart, users: {user} ,clearCart}) => {
   
    const [total, setTotal] = useState(null);
    const [subTotal, setSubTotal] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [checkUserAuth, setCheckUserAuth] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);
    let history = useHistory();

    useEffect(() => {
        if (cart) {
            let t = 0;
            cart.forEach(((product) => {
            const productTotal = Number(product.price) * Number(product.quantity);
            t = t + productTotal
            }));
            setTotal(t);
            setSubTotal(t);
        }
    }, [cart]);

    useEffect(() => {
        if(user){
            setCurrentUser(user);
        }
        setCheckUserAuth(true)
    }, [user])

    const onSubmit = async (values) => {

        setLocalLoading(true)

        const config = {
            headers: {
            'Content-Type': 'application/json'
            }
        };

        const productOrderObj = cart.map((product) => {
            let stockId = null;
            if (product.sizeNameId) {
            product.stocks.forEach((stock) => {
                if (stock.sizeName.size_name_id === product.sizeNameId) {
                    stockId = stock.stock_id
                }
            })
            return {
                product_id : product.product_id,
                quantity: product.quantity,
                stock_id: stockId,
            }
            }
            return {
                product_id : product.product_id,
                quantity: product.quantity,
                stock_id: product.stocks[0].stock_id,
            }
        })

        const body = JSON.stringify({
            user_id: currentUser ? currentUser.user_id : null,
            user_name: currentUser ? currentUser.user_name : values.user_name,
            user_phone: currentUser ? currentUser.user_phone : values.user_phone,
            user_address: currentUser && currentUser.user_address ? currentUser.user_address : values.user_address,
            user_note: values.user_note,
            products: productOrderObj
        });

        try {
            const res = await axios.post('/v1/orders', body, config);

            setLocalLoading(false);
            if(res.status === 200){
                toast.success('Sargydynyz ustinlinkli amala asyryldy!');
                clearCart();
                if(currentUser) history.push("/orders");
                else history.push("/"); 
            }

        } catch (err) {
            const errStatus = err.response.status;
            if(errStatus === 400) {
                toast.error('Ýeterlikli haryt mukdary ýok!');
                return history.push("/cart")
            }
            setLocalLoading(false)
        }
    }

    return (
        <Fragment>
            <section className="cart-wrapper">
            {
                cart && cart.length > 0 ?
                <>
                    <div className="page-title">
                        <h2>Sargyt etmek</h2>
                    </div>
                    {
                        checkUserAuth === true &&
                        <Formik
                            initialValues={
                                {
                                    user_name :  currentUser ? currentUser.user_name : '',
                                    user_phone :  currentUser ? currentUser.user_phone : '',
                                    user_address: currentUser && currentUser.user_address ? currentUser.user_address  : '' ,
                                    user_note : ''
                                }
                            }
                            validationSchema={SignupSchema}
                            onSubmit={(values) => onSubmit(values)}
                        >
                        <Form autoComplete="off" >
                        <div className="flex-wrapper">
                            <div className="columns">
                                <div className="input-form-block">
                                    <div className="auth-box">
                                        <div className="form-block">
                                                {/* <!-- input-block --> */}
                                                <div className="input-block">
                                                    <label htmlFor="user_name">Doly Adynyz *</label> <br />
                                                    <Field
                                                        type="text"
                                                        name="user_name" 
                                                        autoComplete="off"
                                                        disabled={currentUser ? true : false}
                                                    />
                                                    <div className="error-text">
                                                    <ErrorMessage name="user_name" />
                                                    </div>
                                                </div>
                                                {/* <!-- input-block --> */}
                                                <div className="input-block">
                                                    <label htmlFor="user_phone">Telefon Belginiz *</label> <br />
                                                    <div className="phone-input">
                                                        <div style={{background : '#fff'}}>
                                                            +993
                                                        </div>
                                                        <Field
                                                            type="number"
                                                            name="user_phone" 
                                                            autoComplete = "off"
                                                            disabled={currentUser ? true : false}
                                                        />
                                                    </div>
                                                    <div className="error-text">
                                                        <ErrorMessage name="user_phone" />
                                                    </div>
                                                </div>
                                                {/* <!-- input-block --> */}
                                                <div className="input-block">
                                                    <label htmlFor="user_address">Salgynyz *</label> <br />
                                                    <Field
                                                        type="text"
                                                        name="user_address" 
                                                        autoComplete="off"
                                                    />
                                                    <div className="error-text">
                                                    <ErrorMessage name="user_address" />
                                                    </div>
                                                </div>
                                                {/* <!-- input-block --> */}
                                                <div className="input-block">
                                                    <label htmlFor="user_note">Bellik</label> <br />
                                                    <Field
                                                        type="text"
                                                        name="user_note" 
                                                        autoComplete="off"
                                                    />
                                                    <div className="error-text">
                                                    <ErrorMessage name="user_note" />
                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="description-block">
                                    <h3>
                                        Yatlatmak
                                    </h3>
                                    <article>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa est neque, pulvinar libero cras iaculis eu tristique vitae. In nibh etiam vulputate scelerisque. Malesuada dapibus cras et vitae auctor lectus. Eros blandit elit at egestas ac ac. Netus viverra duis proin tortor interdum nibh ullamcorper et amet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa est neque, pulvinar libero cras iaculis eu tristique vitae. In nibh etiam vulputate scelerisque. Malesuada dapibus cras et vitae auctor lectus. Eros blandit elit at egestas ac ac. Netus viverra duis proin tortor interdum nibh ullamcorper et amet.
                                    </article>
                                </div>
                            </div>
                            {/* PRICE BLOCK */}
                            <div className="price-block">
                                <div className="total">
                                    <span className="label">Harytlaryn jemi</span>
                                    <span className="price">{ total && total } TMT</span>
                                </div>
                                <div className="total">
                                    <span className="label">Eltip berme hyzmaty</span>
                                    <span className="price">10 TMT</span>
                                </div>
                                <div className="total">
                                    <span className="label">Jemi</span>
                                    <span className="net">{ subTotal + 10 } TMT</span>
                                </div>
                            </div>
                            <div className="input-block btn-block">
                                    <Field
                                    type="submit"
                                    value="Sargyt et" 
                                    name="submit"
                                    disabled={localLoading}
                                    style={{opacity : `${localLoading ? 0.5 : 1}`}}
                                    />
                                </div>
                                </div>
                            </Form>
                        </Formik>
                    }
                    </> :
                    <>
                        <div className="page-title">
                        <h2>Sebedim</h2>
                        </div>
                        <div className="page-title">
                        <p>Haryt yok</p>
                        </div>
                    </>
            }
            </section>
        </Fragment>
    )
}

PaymentTotal.propTypes = {
   cart: PropTypes.array.isRequired,
   updateUser : PropTypes.func,
   clearCart : PropTypes.func,
   users: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
   users: state.users,
})

export default connect(mapStateToProps, {updateUser,clearCart})(PaymentTotal)
