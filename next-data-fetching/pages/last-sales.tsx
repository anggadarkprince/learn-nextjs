import {useEffect, useState} from "react";
import useSWR from 'swr';

interface Product {
    id: number,
    title: string,
    price: number,
    quantity: number,
}

function LastSalesPage(props: {products: Product[]}) {
    //const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState<Product[]>(props.products);

    const {data, error, isLoading} = useSWR('https://dummyjson.com/carts/1', (url) => fetch(url).then(res => res.json()));

    useEffect(() => {
        if (data) {
            const sales = data.products.reduce((total: number, item: {price: number}) => total + item.price, 0);
            setProducts(data.products);
        }
    }, [data]);

    /*useEffect(() => {
        setIsLoading(true);
        fetch('https://dummyjson.com/carts/1')
            .then(response => response.json())
            .then(cart => {
                const sales = cart.products.reduce((total: number, item: {price: number}) => total + item.price, 0);
                setProducts(cart.products);
                setIsLoading(false);
            })
    }, []);*/

    if (error) {
        return <p>Failed to load.</p>
    }

    if (isLoading && !products) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {products && products.map((item: Product) => (
                <li key={item.id}>
                    {item.title}: ${item.price}
                </li>
            ))}
        </ul>
    );
}

export async function getStaticProps() {
    const response = await fetch('https://dummyjson.com/carts/1');
    const cart = await response.json();
    return {
        props: {products: cart.products},
    };
}

export default LastSalesPage;