import useHttp from "../hooks/useHttp";
import Error from "./Error";
import FoodItem from "./FoodItem";
const initialconfig={};
export default function Meals(){
   
   const {data:Mealsarray,isLoading,error}=useHttp('http://localhost:3000/meals',initialconfig,[]);


if(isLoading)
{
   return <p className="center">Fetching Meals...</p>
}
if(error)
{
    return <Error title="Failed To Fetch data" message={error}/>
}
return <div>
   {Mealsarray && <ul id="meals">
        {Mealsarray.map((meal)=>(<li key={meal.id} className="meal-item">
            <FoodItem  key={meal.id} meal={meal}/>
        </li>))}
    </ul>} 
</div>
}