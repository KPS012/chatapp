import { useSession } from 'next-auth/react';

export default function Header() {
  const session = useSession();
  const username = session?.data?.user?.name;

  return (
    <header>
      <h1>Chat Application</h1>
      {username && <p>Welcome, {username}!</p>}
    </header>
  );
}
