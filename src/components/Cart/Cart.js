import React,{useContext, useState} from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart =(props) =>{
    const [showForm,setShowForm] = useState(false);
    const [isSubmitting,setIsSubmitting] = useState(false);
    const [didSubmit,setDidSubmit] = useState(false);
    const cartContext = useContext(CartContext);

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length >0;

    const cartItemAddHandler =(item) =>{
        cartContext.addItem({...item, amount:1});
    };

    const cartItemRemoveHandler =(id) =>{
        cartContext.removeItem(id);
    };
    const orderHandler =() =>{
        setShowForm(true);
    };
    const onSubmitOrder =async (userData)=>{
        setIsSubmitting(true);
        await fetch('https://react-foodapp-daa45-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body: JSON.stringify({
                user:userData,
                orderdItems:cartContext.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartContext.clearCart();
    };
    // const onCancelHandler =()=>{
    //     setShowForm(false);
    // };

    const cartItems = (
    <ul className={classes['cart-items']}>
        {cartContext.items.map((item) =>(
        <CartItem
            key ={item.id}
            name ={item.name}
            amount = {item.amount} 
            price = {item.price}
            onRemove={cartItemRemoveHandler.bind(null,item.id)}
            onAdd ={cartItemAddHandler.bind(null,item)}
        />
        ))}
    </ul>
    );

    const modalActions =(
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
        {hasItems &&<button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    );

    const cartModalContent = (
    <React.Fragment>
        {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {showForm&&<Checkout  onConfirm={onSubmitOrder} onCancel={props.onHideCart}/>}
        {!showForm&& modalActions}
    </React.Fragment>
    );

    const isSubmittingModalContent = (
        <p>Sending Order Data....</p>
    );

    const didSubmitgModalContent = (
        <React.Fragment>
            <p>Successfully sent the Order Data!</p>
            <div className={classes.actions}>
            <button className={classes.button} onClick={props.onHideCart}>Close</button>
            </div>
        </React.Fragment>
    );
    return(
        <Modal onClose={props.onHideCart}>
           {!isSubmitting && !didSubmit && cartModalContent}
           {isSubmitting  && isSubmittingModalContent}
           { !isSubmitting && didSubmit && didSubmitgModalContent}
        </Modal>
    );
};

export default Cart;