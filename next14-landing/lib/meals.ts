import sql from 'better-sqlite3';
import {Meal} from "@/types";

const db = sql('meals.db');

export async function getMeals() {
    await new Promise(resolve => setTimeout(resolve, 2000));
    return db.prepare<unknown[], Meal>('SELECT * FROM meals').all();
}
