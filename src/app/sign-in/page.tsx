import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";


export default async function SignIn() {
  const session = await getServerSession(authOptions)
  const storeCookies = cookies();

  if (session) {
    redirect('/')
  }

  const csrfTokenCookie = `${process.env.NODE_ENV === 'production' ? '__Host-' : ''}next-auth.csrf-token`;

  const csrfToken = storeCookies.get(csrfTokenCookie)?.value.split('|')[0]
  return (
    <>
      <form method="post" action="/api/auth/callback/credentials">
        <input name="csrfToken" type='hidden' defaultValue={csrfToken} />
        <label htmlFor="">password

        </label>
        <input type="password" name='password'></input>
        <button type='submit'>sign in</button>

      </form >
    </>
  )
}