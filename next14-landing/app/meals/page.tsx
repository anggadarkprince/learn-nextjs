import classes from './page.module.css';
import Link from "next/link";
import MealsGrid from "@/components/meals/meals-grid";
import {getMeals} from "@/lib/meals";
import {Suspense} from "react";
import Loading from "@/app/meals/loading-out";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "All Meals",
    description: "Delicious meal by our community.",
};

async function Meals() {
    const meals = await getMeals();

    return <MealsGrid meals={meals}/>
}

export default function MealsPage() {
    return (
        <>
            <header className={classes.header}>
                <h1>Delicious meals, created{' '} <span className={classes.highlight}>by you</span></h1>
                <p>
                    Choose your favorite recipe nd cook it yourself. It is easy and fun!
                </p>
                <p className={classes.cta}>
                    <Link href={'/meals/share'}>
                        Share Your Favorite Recipe
                    </Link>
                </p>
            </header>
            <main className={classes.main}>
                <Suspense fallback={<Loading/>}>
                    <Meals/>
                </Suspense>
            </main>
        </>
    )
}
