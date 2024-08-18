"use client"

import {useActionState} from "react";
import FormSubmit from "@/components/form-submit";

interface PostFormProps<State, Payload> {
    action: (state: Awaited<State>, payload: Payload) => State | Promise<State>
}
export default function PostForm({action}: PostFormProps<{errors?: string[]}, FormData>) {
    const [state, formAction] = useActionState(action, {errors: undefined});

    return (
        <>
            <h1>Create a new post</h1>
            <form action={formAction}>
                <p className="form-control">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" name="title" />
                </p>
                <p className="form-control">
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        id="image"
                        name="image"
                    />
                </p>
                <p className="form-control">
                    <label htmlFor="content">Content</label>
                    <textarea id="content" name="content" rows={5} />
                </p>
                <div className="form-actions">
                    <FormSubmit/>
                </div>
                {state.errors && (
                    <ul className="form-errors">
                        {state.errors.map((error: string) => <li key={error}>{error}</li>)}
                    </ul>
                )}
            </form>
        </>
    );
}