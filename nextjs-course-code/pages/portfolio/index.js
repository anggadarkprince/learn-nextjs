import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div>
      <h1>Portfolio Page</h1>
      <ul>
        <li><Link href="/portfolio/1">Portfolio A</Link></li>
        <li><Link href="/portfolio/2">Portfolio B</Link></li>
        <li><Link href="/portfolio/list">Old List Portfolio</Link></li>
      </ul>
    </div>
  )
}
