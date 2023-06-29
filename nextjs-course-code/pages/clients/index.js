import Link from "next/link";

export default function ClientPage() {
  const clients = [
    {id: 'angga-ari', name: 'Angga Ari Wijaya'},
    {id: 'keenan-evander', name: 'Keenan Evander Alastair'},
  ]
  return (
    <div>
      <h1>Client Page</h1>
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            <Link href={`/clients/${client.id}`}>{client.name}</Link>{' '}
            (<Link href={{pathname: '/clients/[id]', query: {id: client.id}}}>
              Open Page
            </Link>)
          </li>
        ))}
      </ul>
    </div>
  )
}
