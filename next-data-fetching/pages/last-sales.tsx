import {useEffect, useState} from "react";

interface Product {
    id: number,
    title: string,
    price: number,
    quantity: number,
}
function LastSalesPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://dummyjson.com/carts/1')
            .then(response => response.json())
            .then(cart => {
                const sales = cart.products.reduce((total: number, item: {price: number}) => total + item.price, 0);
                setProducts(cart.products);
                setIsLoading(false);
            })
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {products.map((item: Product) => (
                <li key={item.id}>
                    {item.title}: ${item.price}
                </li>
            ))}
        </ul>
    );
}

export default LastSalesPage;