import {useRouter} from "next/router";

export default function NotFoundPage() {
  const router = useRouter()
  return (
    <div>
      <h1>404 Not Found</h1>
      <button type="button" onClick={() => router.back()}>
        Click here to go back
      </button>
    </div>
  )
}
