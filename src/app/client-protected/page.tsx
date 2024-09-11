'use client'

import { useSession } from 'next-auth/react'

export default function Protected() {

  const { status } = useSession({ required: true })
  if (status === 'loading') {
    return 'this page is loading'
  }

  return (

    <section>
      <h1>
        page requires password
      </h1>
    </section>

  )
}