'use server';

import {MealFormData} from "@/types";
import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

function isInvalidText(text: string | null) {
    return !text || text.trim() === '';
}

export async function shareMeal(prevState: {message?: string|null}, formData: FormData) {
    const meal: MealFormData = {
        title: formData.get('title') as string,
        summary: formData.get('summary') as string,
        instructions: formData.get('instructions') as string,
        image: formData.get('image') as File,
        creator: formData.get('name') as string,
        creator_email: formData.get('email') as string,
    }

    if (isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        !meal.image ||
        (meal.image instanceof File && meal.image.size === 0)) {
        //throw new Error('Invalid inputs');
        return {
            message: 'Invalid inputs.'
        }
    }
    await saveMeal(meal);

    revalidatePath('/meals', 'layout'); // default is page. layout is revalidate nested page

    redirect('/meals');
}
