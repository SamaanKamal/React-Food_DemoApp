import React,{ useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart ={
    items: [],
    totalAmount: 0
};

const cartReducer = (state,action) =>{
    if(action.type === "ADD")
    {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
        const existingItemIndex = state.items.findIndex((item)=>{
            return item.id === action.item.id;
        });
        const existingItem = state.items[existingItemIndex];
        let updatedItems;
        if(existingItem)
        {
            const updatedItem = {
                ...existingItem,
                amount:existingItem.amount +action.item.amount
            };
            updatedItems =[...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        }
        else
        {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,    
            totalAmount: updatedTotalAmount
        };
    }
    if(action.type ==="REMOVE")
    {
        const existingItemIndex = state.items.findIndex((item)=>{
            return item.id === action.id;
        });
        const existingItem = state.items[existingItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if(existingItem.amount ===1)
        {
            updatedItems = state.items.filter((item) =>{
                return item.id !== action.id;
            });
        }
        else 
        {
            const updatedItem = {...existingItem, amount: existingItem.amount-1};
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] =updatedItem;
        }
        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }; 
    }

    if(action.type ==='CLEAR')
    {
        return defaultCart;
    }

    return defaultCart;
};

const CartProvider =(props) =>{

    const [cartState,dispatchCartState] =useReducer(cartReducer,defaultCart);

    const addItemToCartHandler =(item) =>{
        dispatchCartState({type: "ADD", item:item});
    };

    const removeItemFromCartHandler =(id) =>{
        dispatchCartState({type: "REMOVE", id:id});
    };

     const clearCartHandler = () => {
        dispatchCartState({type:"CLEAR"});
     };
    
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    };
    return(
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;