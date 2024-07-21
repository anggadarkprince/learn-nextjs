import classes from './meals-grid.module.css';
import {Meal} from "@/types";
import MealItem from "@/components/meals/meal-item";

type Props = {
    meals: Meal[]
}
export default function MealsGrid({meals}: Props) {
    return (
        <ul className={classes.meals}>
            {meals.map(meal => (
                <li key={meal.id}>
                    <MealItem {...meal}/>
                </li>
            ))}
        </ul>
    )
}
