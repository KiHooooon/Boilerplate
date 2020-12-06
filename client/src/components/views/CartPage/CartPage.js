import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux';
import {getCartItems} from '../../../_actions/user_actions';
import UserCardBlock from './Sections/UserCardBlock';

function CartPage(props) {
    const [Total, setTotal] = useState(0);
    const dispatch = useDispatch();
    
    useEffect(() => {
        let cartItems = []
        // 리덕스 User State안에 cart안에 상품이 들어있는지 확인
        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id);
                });
                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(response => {
                        calculatorTotal(response.payload)
                    })
            }
        }
    }, [props.user.userData])

    const calculatorTotal = (cartDetail) => {
        let total = 0;
        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity;
        })
        setTotal(total)
    }
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            CartPage
            <UserCardBlock products={props.user.cartDetail}/>
            <div style={{ marginTop: '3rem' }}>
                <h2>Total Amount: ${Total}</h2>
            </div>
        </div>
        
    )
}

export default CartPage
