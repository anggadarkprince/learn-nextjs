export default function MealPage({params}: { params: { slug: string }}) {
    return (
        <main>
            <h1>Meal Post</h1>
            <p>{params.slug}</p>
        </main>
    )
}
