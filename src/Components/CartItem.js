import React, { useState } from 'react'; 
import "./cart.css"
import { useSelector } from 'react-redux';
import imageUrl from "../utils/images";

const CartItem = () => {
    const [paymentError, setPaymentError] = useState(null);
    const cart = useSelector((state) => state.cart);

    const totalPrice = cart.item.reduce((total, item) => item.card.info.price ? total + item.card.info.price : total + item.card.info.defaultPrice, 0);

    const handleOrder = async () => {
        try {
            const response = await fetch("http://localhost:1234/order", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalPrice,
                    currency: 'INR',
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to place order. Please try again.');
            }
            const data = await response.json();
            const { amount, currency, order_id } = data;
            const options = {
                "key": "rzp_test_aLxkSXK4RERlG2",
                amount,
                currency,
                "name": "Jeevan Test",
                "callback_url":"http://10.0.3.126:3000/",
                "redirect":false,
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                order_id,
                "handler": function (response) {

                   
                },
                
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.on('payment.failed', function (response) {
                setPaymentError(response.error);
            });
            rzp1.open();
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
            setPaymentError(error.message);
        }
    };
    
    return (
        <div>
            <div className='cart'>
                {cart.item.length > 0 ? (
                    <>
                        {cart.item.map((item, index) => (
                            <div key={index}>
                                <img
                                    src={imageUrl + item.card.info.imageId}
                                    width={250}
                                    height={180}
                                    alt={"kwkk"}
                                />
                                <h4>{item.card.info.name}</h4>
                                <b><p>{item.card.info.price/100 || item.card.info.defaultPrice /100}</p></b> 
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </>
                ) : (
                    <div className='empty-cart'>
                        <h3>Your cart is empty</h3>
                        <p>Add some items to continue shopping</p>
                    </div>
                )}
            </div>
            {cart.item.length > 0 && (
                <div>
                    <h2> Total Price: {totalPrice/100} </h2>
                    <button onClick={handleOrder}>Order Now</button>
                    {paymentError && <p style={{ color: 'red' }}>{paymentError}</p>}
                </div>
            )}
        </div>
    );
}

export default CartItem;
