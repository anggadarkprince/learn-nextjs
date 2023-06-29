import Link from "next/link";
import {useRouter} from "next/router";

export default function ClientProjectsPage() {
  const router = useRouter();

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        <li><Link href="/blog/2021">2021</Link>
          <ul>
            <li><Link href="/blog/2021/01">January</Link>
              <ul>
                <li><Link href="/blog/2021/01/create-react-app">Create react app</Link></li>
                <li><Link href="/blog/2021/01/optimize-database">Optimize your database</Link></li>
              </ul>
            </li>
            <li><Link href="/blog/2021/02">February</Link></li>
          </ul>
        </li>
        <li><Link href="/blog/2022">2022</Link></li>
        <li><Link href="/blog/2023">2023</Link></li>
      </ul>
    </div>
  )
}
