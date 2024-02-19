import React from 'react'; 
import "./cart.css"
import { useSelector } from 'react-redux';
import imageUrl from "../utils/images";

const CartItem = () => {
    const cart = useSelector((state) => state.cart);

   
    const totalPrice = cart.item.reduce((total, item) => total + item.card.info.price, 0);

    return (
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
                            <b><p>{item.card.info.price}</p></b> 
                            <p>{item.description}</p>
                        </div>
                    ))}
                   <h2> Total Price: {totalPrice} </h2>
                 
                    <button>Pay Now</button>

                </>
            ) : (
                <div className='empty-cart'>
    <h3>Your cart is empty</h3>
    <p>Add some items to continue shopping</p>
</div>
            )}
        </div>
    );
};

export default CartItem;
