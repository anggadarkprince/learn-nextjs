import AuthForm from "@/components/auth-form";

export default function Home({searchParams}: {searchParams: {mode: string}}) {
  const formMode = searchParams.mode || 'login';

  return <AuthForm mode={formMode} />;
}