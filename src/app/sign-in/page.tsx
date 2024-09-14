
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

import objImg from '../../../public/obj.webp'
import Image from 'next/image';



export default async function SignIn() {

  const session = await getServerSession(authOptions)
  const storeCookies = cookies();

  if (session) {
    redirect('/')
  }

  const csrfTokenCookie = `${process.env.NODE_ENV === 'production' ? '__Host-' : ''}next-auth.csrf-token`;

  const csrfToken = storeCookies.get(csrfTokenCookie)?.value.split('|')[0]



  return (
    <section className="mt-10 pt-10">
      <div className=" header flex flex-col md:flex-row items-center justify-between min-h-screen p-4">
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-pink-600">Define </span>your path and{' '}
            <span className="text-orange-400">take action </span>
            <span>today.</span>
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Embark on your journey to success with our guide.
          </p>

          <form className='' method="post" action="/api/auth/callback/credentials">
            <input name="csrfToken" type='hidden' defaultValue={csrfToken} />

            <input
              className="bg-transparent border border-white rounded-md mr-3 px-4 py-2 text-white placeholder-white::placeholder focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              placeholder="username " type="password" name='password'></input>
            <button className="bg-gradient-to-r from-pink-500 to-violet-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300" type='submit'>sign in </button>
          </form >
        </div>

        <div className="w-full md:w-1/2 ml-8">
          <Image
            src={objImg}
            alt="colored logo squares"
            className="icpsq"
          />
        </div>
      </div>


    </section>
  )
}