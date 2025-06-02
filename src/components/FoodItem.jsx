import { useContext } from "react";
import {MealsDataContext} from "../store/MealsContext";
import Button from "../UI/Button";
export default function FoodItem({meal}){
    const context=useContext(MealsDataContext);
    function handleaddMealToCart(){
        console.log("add meal to cart");
        context.addItem(meal);
        console.log(meal);
    }
    return(
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={`${meal.name} image`}/>
            <h3>{meal.name}</h3>
            <p className="meal-item-price">${meal.price}</p>
            <p className="meal-item-description">{meal.description}</p>
            <div className="meal-item-actions">
            <Button onClick={handleaddMealToCart}>Add to Cart</Button>
            </div>
        </article>
    );
}