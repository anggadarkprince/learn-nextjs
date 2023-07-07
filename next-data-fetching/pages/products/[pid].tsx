import {GetStaticProps} from "next";
import path from "path";
import fs from "fs/promises";

type Product = {
    id: string;
    title: string;
    description: string;
}

function ProductDetailPage({loadedProduct}: {loadedProduct: Product}) {
    if (!loadedProduct) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <h1>{loadedProduct.title}</h1>
            <h1>{loadedProduct.description}</h1>
        </>
    );
}

async function getData(): Promise<{ products: Array<Product> }> {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const products = await fs.readFile(filePath);
    return JSON.parse(products.toString());
}

export const getStaticProps: GetStaticProps = async (context) => {
    const {params} = context;
    const productId = params?.pid;
    const data = await getData();

    const product: Product | undefined = data.products.find((product: Product) => product.id === productId);

    console.log('product', product);

    if (!product) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            loadedProduct: product
        }
    }
}

export async function getStaticPaths() {
    const data = await getData();
    const ids = data.products.map(product => product.id);
    const pathWithParams = ids.map(id => ({params: {pid: id}}));

    console.log('products', pathWithParams);

    return {
        paths: pathWithParams,
        fallback: true,
    }
}

export default ProductDetailPage;