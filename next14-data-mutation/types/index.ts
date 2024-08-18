export interface Post {
    id?: number;
    title: string;
    content: string;
    image: string;
    userId: number;
    userFirstName?: string;
    createdAt?: string;
    isLiked?: boolean;
    likes?: number;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
}
