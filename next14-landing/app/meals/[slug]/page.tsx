import classes from "./page.module.css";
import Image from "next/image";
import {getImageUrl, getMeal, getMeals} from "@/lib/meals";
import {notFound} from "next/navigation";

export async function generateMetadata({params}: {params: {slug: string}}) {
    const meal = await getMeal(params.slug);
    return {
        title: meal?.title || 'Meal',
        description: meal?.summary || 'Detail of meal',
    }
}

export default async function MealPage({params}: { params: { slug: string }}) {
    const meal = await getMeal(params.slug);

    if (meal) {
        meal.instructions = meal?.instructions.replace(/\n/g, '<br>');
    } else {
        notFound();
    }

    return (
        <>
            <header className={classes.header}>
                <div className={classes.image}>
                    <Image src={await getImageUrl(meal?.image!)} alt={'Image'} fill />
                </div>
                <div className={classes.headerText}>
                    <h1>{meal?.title}</h1>
                    <p className={classes.creator}>
                        by <a href={`mailto:${meal?.creator_email}`}>{meal?.creator}</a>
                    </p>
                    <p className={classes.summary}>{meal?.summary}</p>
                </div>
            </header>
            <main>
                <p className={classes.instructions} dangerouslySetInnerHTML={{
                    __html: meal?.instructions!
                }}></p>
            </main>
        </>
    )
}
