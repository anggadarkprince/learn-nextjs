import {Inter} from 'next/font/google'
import fs from 'fs/promises';
import path from "path";
import Link from "next/link";

const inter = Inter({subsets: ['latin']})

type Product = {
  id: string;
  title: string;
}

export default function Home({products}: { products: Array<Product> }) {
  return (
    <main className={inter.className}>
      <ul>
        {products.map((product: Product) => (
            <li key={product.id}>
              <Link href={`/${product.id}`}>
                {product.title}
              </Link>
            </li>
        ))}
      </ul>
    </main>
  )
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const products = await fs.readFile(filePath);
  const data: any = JSON.parse(products.toString());

  if (!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }
  if (data.length === 0) {
    return {notFound: true};
  }

  return {
    props: {
      products: data.products
    },
    revalidate: 15,
  }
}
