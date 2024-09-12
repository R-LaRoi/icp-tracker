import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { Nav } from "../Components/Nav";
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
    <section className="">
      <Nav />
      <div className='header-txt'>
        <div className="text-7xl font-bold m-4 p-5">
          <span className='text-pink-600'>Define </span>your path and  <span className='text-orange-400 mx-2'>take action </span>
          <span className=''>today.</span>

        </div>
        <Image src={objImg} alt="colored logo squares" />

      </div>

    </section>
  )
}