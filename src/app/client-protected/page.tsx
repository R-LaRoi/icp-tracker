import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Protected() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/protected');
  }

  return (
    <section>
      <p>This page is password protected!</p>
    </section>
  );
}