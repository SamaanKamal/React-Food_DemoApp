import React,{useEffect,useState} from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },

//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },

//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },

//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },

// ];


const AvailableMeals = () => {
  const [meals,setMeals] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(()=>{
    const fetchingMeals = async () =>{
      const response = await fetch('https://react-foodapp-daa45-default-rtdb.firebaseio.com/meals.json');
      if(!response.ok)
      {
        throw new Error('Something Went Wrong!');
      }
      const data = await response.json();
      const loadedMeals =[];
      for(const key in data)
      {
        loadedMeals.push({id:key,name:data[key].name,description:data[key].description,price:data[key].price}); 
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
      fetchingMeals().catch((error) =>{
        setIsLoading(false);
        setHttpError(error.message);     
      });
  },[]);

  if(isLoading)
  {
    return <section className={classes.MealsLoading}>
      <p>is Loading...</p>
    </section>
  }
  if(httpError)
  {
    return <section className={classes.MealsError}>
    <p>{httpError}</p>
  </section>
  }
  const mealsList = meals.map((meal) =>(<MealItem key={meal.id} id={meal.id} name ={meal.name} description ={meal.description} price = {meal.price}/>));
  return (
      <section className={classes.meals}>
          <Card>
              <ul>
                  {mealsList}
              </ul>
          </Card>
      </section>
  );
};

export default AvailableMeals;