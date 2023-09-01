import React,{ useContext, useEffect,useState } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css"
import CartContext from "../../store/cart-context";


const HeaderCartButton = (props) =>{
    const[buttonBump, setButtonBump] =useState(false);
    const cartCtx =useContext(CartContext);
    const { items } = cartCtx;

    const numberOfItems = items.reduce((currentNumber,item)=>{
        return currentNumber + item.amount;
    } , 0);


    const buttonClasses = `${classes.button} ${buttonBump ? classes.bump: ''} `;

    useEffect(() => {
        if(items.length===0)
        {
            return;
        }

        setButtonBump(true);

        const timer =setTimeout(()=>{
            setButtonBump(false);
        },300);

        return () => {
            clearTimeout(timer)
        };
    },[items]);
    return (
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    );
};

export default HeaderCartButton;