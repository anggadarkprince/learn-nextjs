'use server'

import {createUser, getUserByEmail} from "@/lib/user";
import {hashUserPassword, verifyPassword} from "@/lib/hash";
import {redirect} from "next/navigation";
import {createAuthSession, destroySession} from "@/lib/auth";

export async function signup(prevState: {errors: {[index: string]: any}}, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    let errors: {[index: string]: any} = {};

    if (!email.includes('@')) {
        errors.email = 'Please enter a valid email address';
    }

    if (password.trim().length < 8) {
        errors.password = 'Password must be at least 8 characters long';
    }

    if (Object.keys(errors).length > 0) {
        return {errors};
    }

    const hashedPassword = hashUserPassword(password);
    try {
        const id = createUser(email, hashedPassword);
        await createAuthSession(id.toString());
        redirect('/training');
    } catch (error: any) {
        if (error.code == 'SQLITE_CONSTRAINT_UNIQUE') {
            return {errors: {email: 'Email is already in use'}};
        }
        throw error;
    }
}

export async function login(prevState: {errors: {[index: string]: any}}, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const existingUser = getUserByEmail(email);
    if (!existingUser) {
        return {
            errors: {email: 'Could not authenticate user, user is not found'},
        }
    }

    const isValidPassword = verifyPassword(existingUser.password, password);
    if (!isValidPassword) {
        return {
            errors: {password: 'Could not authenticate user, please check your credentials'},
        }
    }

    await createAuthSession(existingUser.id.toString());
    redirect('/training');
}

export async function auth(mode: string, prevState: {errors: {[index: string]: any}}, formData: FormData) {
    if (mode === 'login') {
        return login(prevState, formData);
    } else {
        return signup(prevState, formData);
    }
}

export async function logout() {
    await destroySession();

    redirect('/');
}
