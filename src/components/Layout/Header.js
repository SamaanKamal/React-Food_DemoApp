import React from "react";
import classes from "./Header.module.css";
import meals from "../../assests/meals.jpg"
import HeaderCartButton from "./HeaderCartButton";
const Header= (props)=>{
    return(
        <React.Fragment>
            <header className={classes.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick ={props.onShowCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={meals} alt="a table full of delicious food !"></img>
            </div>
        </React.Fragment>
    );
};

export default Header