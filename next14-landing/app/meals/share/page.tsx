'use client'

import classes from './page.module.css';
import ImagePicker from "@/components/meals/image-picker";
import {shareMeal} from "@/lib/action";
import MealsFormSubmit from "@/components/meals/meals-form-submit";
import {useActionState} from 'react';

export default function MealShare() {
    const [state, formAction] = useActionState(shareMeal, {message: ''});

    /*async function shareMeal(formData: FormData) {
        'use server';

        const meal = {
            title: formData.get('title'),
            summary: formData.get('summary'),
            instructions: formData.get('instructions'),
            image: formData.get('image'),
            creator: formData.get('name'),
            creator_email: formData.get('email'),
        }
        console.log(meal);
    }*/

    return (
        <>
            <header className={classes.header}>
                <h1>
                    Share your <span className={classes.highlight}>favorite meal</span>
                </h1>
                <p>Or any other meal you feel needs sharing!</p>
            </header>
            <main className={classes.main}>
                <form className={classes.form} action={formAction}>
                    <div className={classes.row}>
                        <p>
                            <label htmlFor="name">Your name</label>
                            <input type="text" id="name" name="name" placeholder="Input your name" required />
                        </p>
                        <p>
                            <label htmlFor="email">Your email</label>
                            <input type="email" id="email" name="email" placeholder="Your email address" required />
                        </p>
                    </div>
                    <p>
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" name="title" placeholder="Receipe title" required />
                    </p>
                    <p>
                        <label htmlFor="summary">Short Summary</label>
                        <input type="text" id="summary" name="summary" placeholder="Summary about the receipe" required />
                    </p>
                    <p>
                        <label htmlFor="instructions">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            placeholder="Set of instructions"
                            rows={10}
                            required
                        ></textarea>
                    </p>
                    <ImagePicker label="Image" name="image"/>

                    {state.message && <p>{state.message}</p>}

                    <p className={classes.actions}>
                        <MealsFormSubmit/>
                    </p>
                </form>
            </main>
        </>
    )
}
