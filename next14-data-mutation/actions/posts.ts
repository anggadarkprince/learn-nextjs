"use server"

import {storePost} from "@/lib/posts";
import {redirect} from "next/navigation";
import {uploadImage} from "@/lib/cloudinary";
import {revalidatePath} from "next/cache";

export async function createPost(prevState: {errors?: string[]}, formData: FormData) {
    const title = formData.get('title') as string;
    const image = formData.get('image') as File | undefined;
    const content = formData.get('content') as string;

    let errors = [];
    if (!title || title.trim().length === 0) {
        errors.push('Title is required');
    }
    if (!content || content.trim().length === 0) {
        errors.push('Content is required');
    }
    if (!image || image.size === 0) {
        errors.push('Image is required');
    }

    if (errors.length > 0) {
        return {
            errors: errors,
        }
    }

    let imageUrl;
    try {
        imageUrl = await uploadImage(image!!);
    } catch (error) {
        throw new Error('Image upload failed, post was not created, Please try again later.');
    }

    await storePost({
        image: imageUrl,
        title,
        content,
        userId: 1
    })

    revalidatePath('/', 'layout');
    redirect('/feed');
}
