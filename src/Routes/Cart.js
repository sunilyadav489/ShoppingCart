import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../store/cartSlice';


const Cart = () => {
    let total = 0;
    const products = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const handleRemove = (id) => {
        dispatch(remove(id));
    }

    return (
        <div>
            <h3>Cart</h3>
            <div className="cartWrapper">
                {
                    products?.map(product => {
                        total += product.price;
                        return <div key={product.id} className='cartCard'>
                                <img src={product.image} alt="Product image" />
                                <h5>{product.title}</h5>
                                <h5>{product.price}</h5>
                                <button className='btn' onClick={()=>handleRemove(product.id)}>Remove</button>
                            </div>
                        })
                }
                {
                    products && products.length ?
                        <div className='cartCard'>                            
                            <h5>Total : {products.length}</h5>
                            <h5>{`$ ${total}`}</h5>                            
                        </div>
                        : ''                    
                }
            </div>
        </div>
    )
}

export default Cart