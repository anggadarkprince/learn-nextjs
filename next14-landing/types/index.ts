export interface Meal {
    id: string,
    title: string,
    slug: string,
    image: string,
    summary: string,
    creator: string
    creator_email: string
    instructions: string
}

export interface MealFormData {
    title: string,
    slug?: string,
    image: File|string,
    summary: string,
    creator: string
    creator_email: string
    instructions: string
}
