import { getCurrentUser } from '@/lib/session';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SignOut } from './signout';

export default async function Home() {
  const session = await getCurrentUser();
  console.log('get sess', session);

  if (!session) redirect('/signin');
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-2xl">{`hello, ${session.user?.email}`}</div>
      <SignOut />
      <Link href={'/signup'}>Sign Up</Link>
    </main>
  );
}
